import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VideoCallRoom = () => {
  const { roomId } = useParams();
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
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
          },
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);

        return () => {
          api.dispose();
        };
      } else {
        console.error("JitsiMeetExternalAPI not loaded.");
      }
    };

    // Wait a little if Jitsi is not ready
    if (!window.JitsiMeetExternalAPI) {
      const interval = setInterval(() => {
        if (window.JitsiMeetExternalAPI) {
          clearInterval(interval);
          loadJitsi();
        }
      }, 100);
      // Cleanup
      return () => clearInterval(interval);
    } else {
      loadJitsi();
    }
  }, [roomId]);

  return (
    <div className="w-screen h-screen">
      <div ref={jitsiContainerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default VideoCallRoom;
