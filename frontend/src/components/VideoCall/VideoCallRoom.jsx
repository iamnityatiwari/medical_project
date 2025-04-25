import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VideoCallRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    let jitsiApi = null;
    let interval = null;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI) {
        const domain = "meet.jit.si";
        const options = {
          roomName: roomId,
          parentNode: jitsiContainerRef.current,
          width: "100%",
          height: "100%",
          configOverwrite: {
            disableInviteFunctions: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            HIDE_INVITE_MORE_HEADER: true,
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'hangup',
              'chat',
              'tileview',
              'fullscreen',
            ],
          },
        };
        jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
      } else {
        console.error("JitsiMeetExternalAPI not loaded.");
      }
    };

    if (window.JitsiMeetExternalAPI) {
      loadJitsi();
    } else {
      interval = setInterval(() => {
        if (window.JitsiMeetExternalAPI) {
          clearInterval(interval);
          loadJitsi();
        }
      }, 100);
    }

    return () => {
      if (jitsiApi) jitsiApi.dispose();
      if (interval) clearInterval(interval);
    };
  }, [roomId]);

  const handleBack = () => {
    const role = localStorage.getItem("role");
    if (role === "doctor") {
      navigate("/doctor");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b shadow-sm bg-red-600 text-white">
        <button
          onClick={handleBack}
          className="text-sm px-3 py-1 bg-white text-red-600 rounded hover:bg-red-100 transition"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Consultation Room</h1>
        <div className="w-[80px]" />
      </div>

      <div className="flex-1 p-2">
        <div
          ref={jitsiContainerRef}
          className="w-full h-full border border-red-200 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default VideoCallRoom;
