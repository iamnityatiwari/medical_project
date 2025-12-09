from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class QueryRequest(BaseModel):
    doctor_id: str
    user_query: str

@app.post("/query/")
async def query_chatbot(query: QueryRequest):
    doctor_id = query.doctor_id
    user_query = query.user_query
    print(f"🟡 Received query for doctor: {doctor_id}")

    # Validate vectorstore path
    db_path = f"vectorstore/{doctor_id}"
    if not os.path.exists(db_path):
        raise HTTPException(status_code=404, detail="Vector store not found for this doctor ID.")

    try:
        # Embeddings
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        # Load FAISS
        db = FAISS.load_local(db_path, embedding_model, allow_dangerous_deserialization=True)

        # Prompt
        CUSTOM_PROMPT_TEMPLATE = """
        Use the provided context to answer the user's question.
        Only use information from the context. If the answer is not in the context, say you don't know.

        Context:
        {context}

        Question:
        {question}

        Answer:
        """
        prompt = PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE, input_variables=["context", "question"])

        # 🔐 Secure Token (loaded from environment)
        hf_token = os.getenv("HF_TOKEN")
        if not hf_token:
            raise HTTPException(status_code=500, detail="HuggingFace token not set in environment variables.")

        # HuggingFace LLM
        llm = HuggingFaceEndpoint(
            repo_id="mistralai/Mistral-7B-Instruct-v0.3",
            task="text-generation",
            temperature=0.5,
            model_kwargs={"max_length": 512},
            huggingfacehub_api_token=hf_token
        )

        # QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=db.as_retriever(search_kwargs={"k": 3}),
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True
        )

        # Response
        response = qa_chain.invoke({"query": user_query})
        return {
            "result": response["result"],
            "source_documents": [doc.page_content for doc in response.get("source_documents", [])]
        }

    except Exception as e:
        print(f"❌ Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error during query: {str(e)}")
