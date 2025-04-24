import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

const VideoCall = ({ roomId }) => {
    console.log("VideoCall component rendered with roomId:", roomId);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const socketRef = useRef();
  const peerConnectionRef = useRef();
  const localStreamRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:8080");

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        localStreamRef.current = stream;

        // Join room
        socketRef.current.emit("join", roomId);

        // Listen for offer
        socketRef.current.on("offer", handleReceiveOffer);

        // Listen for answer
        socketRef.current.on("answer", handleReceiveAnswer);

        // Listen for ICE candidates
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handleReceiveOffer = async (data) => {
    peerConnectionRef.current = createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit("answer", { sdp: answer, roomId });
  };

  const handleReceiveAnswer = async (data) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
  };

  const handleNewICECandidateMsg = (data) => {
    const candidate = new RTCIceCandidate(data.candidate);
    peerConnectionRef.current.addIceCandidate(candidate);
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { candidate: event.candidate, roomId });
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current));

    return pc;
  };

  const startCall = async () => {
    peerConnectionRef.current = createPeerConnection();
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socketRef.current.emit("offer", { sdp: offer, roomId });
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
