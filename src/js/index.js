import { useState, useEffect, useRef } from 'react';

const useVideoPlayer = (videoSrc) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    console.log(videoRef);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;

    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setPlaybackProgress(progress);
      }
    };

    video.addEventListener('timeupdate', updateProgress);

    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const skipTime = (time) => {
    videoRef.current.currentTime += time;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return {
    videoRef,
    isPlaying,
    isMuted,
    volume,
    playbackProgress,
    isFullScreen,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    skipTime,
    toggleFullScreen,
  };
};

export default useVideoPlayer;
