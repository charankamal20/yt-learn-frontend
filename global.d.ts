interface Window {
  onYouTubeIframeAPIReady?: () => void;
  YT: {
    Player: any;
    PlayerState: any;
  };
}