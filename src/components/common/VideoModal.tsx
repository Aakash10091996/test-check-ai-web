import React from "react";

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <>
      <video src={videoUrl} autoPlay muted playsInline controls className="w-screen rounded-xl" />
    </>
  );
};

export default VideoModal;
