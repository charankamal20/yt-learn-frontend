"use client";
import { Pause, Play, SkipBack, SkipForward, Youtube } from "lucide-react";
// pages/index.js
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const YouTubePlayer = ({ playlist_url }: { playlist_url: string }) => {
  const playerRef = useRef<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [percentLoaded, setPercentLoaded] = useState(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize YouTube Player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 0,
          listType: "playlist",
          list: playlist_url,
        },

        events: {
          onReady: onPlayerReady,
          onpause: () => {
            console.log("PAUSE");
          },
          onStateChange: onPlayerStateChange,
        },
      });
    };
    return () => {
      // Cleanup API script and player
      delete window.onYouTubeIframeAPIReady;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playlist_url]);

  const clearTrackingInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onPlayerReady = (event: any) => {
    console.log("Player is ready");
    console.log(playerRef.current.getPlaylist());
  };

  useEffect(() => {
    if (playerRef.current && percentLoaded !== 1) {
      const progress = playerRef.current.getVideoLoadedFraction();
      console.log(progress);
      setPercentLoaded(progress * 100);
    }
  }, [percentLoaded]);

  const stopTrackingProgress = () => {
    setProgress(0);
  };

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log("Video has ended");
      clearTrackingInterval();
      stopVideo();
      // Handle video end event (e.g., mark as watched)
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      if (playerRef.current.getVideoUrl() !== videoUrl) {
        setVideoUrl(playerRef.current.getVideoUrl());
      }
      startTrackingProgress();
    } else {
      clearTrackingInterval();
    }
  };

  const startTrackingProgress = () => {
    if (playerRef.current) {
      clearTrackingInterval();
      const duration = playerRef.current!.getDuration();
      intervalRef.current = window.setInterval(() => {
        const currentTime = playerRef.current!.getCurrentTime();
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
        if (progressPercentage >= 95.0) {
          stopVideo();
          clearTrackingInterval();
          return;
        }
      }, 2000);
    }
  };

  const stopVideo = () => {
    playerRef.current?.stopVideo();
  };

  const playVideo = () => {
    if (playerRef.current) {
      console.log(typeof playerRef);
      playerRef.current.playVideo();
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const nextVideo = () => {
    if (playerRef.current) {
      playerRef.current.nextVideo();
    }
  };

  const previousVideo = () => {
    if (playerRef.current) {
      playerRef.current.previousVideo();
    }
  };

  return (
    <div className="w-full h-full object-cover ">
      <div className="h-full rounded-xl overflow-hidden" id="player"></div>
      <div className="flex px-1 items-center justify-between py-2">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={videoUrl}
          className="text-sm flex hover:underline transition-all group items-center gap-x-1"
        >
          <Youtube className="stroke-1" /> Visit Creator{" "}
          <ArrowTopRightIcon className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <div className="flex items-center">
          <Button
            onClick={previousVideo}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-black space-x-2"
          >
            <SkipBack className="w-4 h-4" />
            <span className="font-medium">Previous</span>
          </Button>
          <Button
            onClick={nextVideo}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-black space-x-2"
          >
            <span className="font-medium">Next</span>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
