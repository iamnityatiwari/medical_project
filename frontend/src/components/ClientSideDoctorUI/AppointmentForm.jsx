import { useState } from "react";
// not use the page 
const AppointmentForm = ({ doctor, queueNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    const estimatedTime = queueNumber * doctor.timePerPatient;
    return (
      <div className="mt-6 bg-green-50 border border-green-400 p-4 rounded">
        <h4 className="text-green-700 font-bold mb-2">Appointment Confirmed!</h4>
        <p><strong>Your Queue Number:</strong> {queueNumber}</p>
        <p><strong>Estimated Time:</strong> {estimatedTime} mins from now</p>
        <p><strong>Fee Paid:</strong> ₹{doctor.fee}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
        Pay ₹{doctor.fee} & Confirm
      </button>
    </form>
  );
};

export default AppointmentForm;
