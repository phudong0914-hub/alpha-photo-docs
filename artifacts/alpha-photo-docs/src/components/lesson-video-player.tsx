import { getYouTubeEmbedUrl, getYouTubeThumbnail, LessonVideo } from "@/lib/video-config";
import { useState, useRef, useEffect } from "react";

interface LessonVideoPlayerProps {
  video?: LessonVideo;
}

export function LessonVideoPlayer({ video }: LessonVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  
  // Podcast audio states
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600); // 10 minutes default fallback
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Demo audio overview URL (relaxing ambient stream for study)
  const demoAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSecs: number) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Canvas visualizer animation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = 80;

    const barCount = 45;
    const barWidth = 4;
    const gap = 3;
    const bars: { x: number; targetHeight: number; currentHeight: number; speed: number }[] = [];

    // Initialize bars
    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + gap) + (canvas.width - barCount * (barWidth + gap)) / 2;
      bars.push({
        x,
        targetHeight: 5,
        currentHeight: 5,
        speed: 0.15 + Math.random() * 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background glow gradient
      const baseColor = "rgba(168, 85, 247, "; // Purple tint

      bars.forEach((bar, idx) => {
        // If podcast is playing, create rhythmic motion, else flat line
        if (podcastPlaying) {
          const time = Date.now() * 0.003;
          // Combination of sine waves for natural voice frequencies representation
          const wave = Math.sin(time + idx * 0.15) * Math.cos(time * 0.5 + idx * 0.05);
          const accentWave = Math.sin(time * 2.5 - idx * 0.3) * 0.3;
          
          bar.targetHeight = Math.max(4, (wave + accentWave + 1) * 32);
        } else {
          bar.targetHeight = 4;
        }

        // Smooth height transition
        bar.currentHeight += (bar.targetHeight - bar.currentHeight) * bar.speed;

        // Draw bar shadow/glow
        ctx.fillStyle = `${baseColor}${0.1 + (bar.currentHeight / 80) * 0.3})`;
        ctx.fillRect(
          bar.x,
          canvas.height / 2 - bar.currentHeight / 2 - 4,
          barWidth,
          bar.currentHeight + 8
        );

        // Draw primary bar
        ctx.fillStyle = podcastPlaying ? "#a855f7" : "#5a5a72";
        ctx.fillRect(
          bar.x,
          canvas.height / 2 - bar.currentHeight / 2,
          barWidth,
          bar.currentHeight
        );
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [podcastPlaying]);

  // Audio actions handlers
  const togglePodcastPlay = () => {
    if (!audioRef.current) return;
    if (podcastPlaying) {
      audioRef.current.pause();
      setPodcastPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPodcastPlaying(true);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleAudioLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = () => {
    if (!audioRef.current) return;
    const speedOptions = [1, 1.25, 1.5, 2];
    const currentIndex = speedOptions.indexOf(playbackSpeed);
    const nextSpeed = speedOptions[(currentIndex + 1) % speedOptions.length];
    audioRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const vol = parseFloat(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  // If video exists and has YouTube id, display YouTube play view
  if (video && video.youtubeId) {
    const thumbnailUrl = getYouTubeThumbnail(video.youtubeId);
    const embedUrl = getYouTubeEmbedUrl(video.youtubeId);

    return (
      <div className="rounded-xl overflow-hidden border border-[#1e1e2a] mb-8" style={{ position: "relative" }}>
        {!playing ? (
          <div
            onClick={() => setPlaying(true)}
            style={{
              position: "relative",
              cursor: "pointer",
              aspectRatio: "16/9",
              background: "#0a0a14",
              overflow: "hidden",
            }}
          >
            <img
              src={thumbnailUrl}
              alt={video.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85, transition: "opacity 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.85")}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.75)",
                border: "2px solid rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                transition: "transform 0.2s, background 0.2s",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M8 5l11 7-11 7V5z" />
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 16,
                right: 16,
                fontSize: "13px",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 500,
              }}
            >
              {video.title}
            </div>
          </div>
        ) : (
          <div style={{ position: "relative", aspectRatio: "16/9" }}>
            <iframe
              src={`${embedUrl}&autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        )}
      </div>
    );
  }

  // NotebookLM Audio Overview Podcast visual player (Fallback when no youtubeId)
  return (
    <div className="relative rounded-xl border border-[#1e1e2a] mb-8 overflow-hidden bg-gradient-to-br from-[#0c0c16] via-[#0e0e1a] to-[#06060c] p-6 shadow-xl shadow-black/40">
      {/* Decorative background grid and ambient lighting */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#a855f7]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-[#7c8aff]/5 blur-3xl pointer-events-none" />

      {/* Title block */}
      <div className="flex justify-between items-start gap-4 mb-5 relative z-10">
        <div>
          <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-[#a855f7]/15 text-[#b975ff] border border-[#a855f7]/25 tracking-wider">
            NotebookLM Audio Overview
          </span>
          <h4 className="text-sm font-semibold text-[#e4e4ed] mt-2 tracking-wide">
            {video?.title || "Audio Overview Bài học"}
          </h4>
          <p className="text-xs text-[#5a5a72] mt-0.5">
            {video?.description || "Bản tóm tắt học thuật dạng Podcast đối thoại tiếng Việt sinh động."}
          </p>
        </div>

        <div className="flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-[#9d9db5]">
          <span className={`w-1.5 h-1.5 rounded-full ${podcastPlaying ? "bg-[#22c55e] animate-pulse" : "bg-[#5a5a72]"}`} />
          {podcastPlaying ? "LIVE PLAYING" : "STANDBY"}
        </div>
      </div>

      {/* HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={demoAudioUrl}
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onEnded={() => setPodcastPlaying(false)}
      />

      {/* Visualizer Canvas */}
      <div className="relative w-full h-20 bg-black/[0.15] border border-white/[0.02] rounded-lg overflow-hidden flex items-center justify-center mb-5">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {!podcastPlaying && currentTime === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] pointer-events-none">
            <span className="text-[10px] text-[#5a5a72] tracking-wider uppercase flex items-center gap-1">
              🎙️ Sẵn sàng phát âm thanh tóm tắt
            </span>
          </div>
        )}
      </div>

      {/* Controls Container */}
      <div className="flex flex-col gap-3.5 relative z-10">
        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#5a5a72] w-9 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 600}
            value={currentTime}
            onChange={handleProgressBarChange}
            className="flex-1 h-1 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#a855f7]"
          />
          <span className="text-[10px] font-mono text-[#5a5a72] w-9">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action button row */}
        <div className="flex items-center justify-between mt-0.5">
          {/* Left block: Volume controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-[#9d9db5] transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-0.5 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#9d9db5]"
            />
          </div>

          {/* Center block: Playback Main Controls */}
          <div className="flex items-center gap-3">
            {/* Rewind 10s */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10);
              }}
              className="p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-[#9d9db5] active:scale-95 transition-all"
              title="Tua lùi 10s"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M2.5 2v6h6M2.5 8a10 10 0 1 1 2.36 6.36" />
              </svg>
            </button>

            {/* Play/Pause Circle */}
            <button
              onClick={togglePodcastPlay}
              className="p-3.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7c8aff] hover:shadow-lg hover:shadow-[#a855f7]/20 text-white font-bold transform active:scale-95 transition-all duration-200"
              title={podcastPlaying ? "Tạm dừng" : "Phát Audio"}
            >
              {podcastPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip 10s */}
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10);
              }}
              className="p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-[#9d9db5] active:scale-95 transition-all"
              title="Tua tiến 10s"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform scale-x-[-1]">
                <path d="M2.5 2v6h6M2.5 8a10 10 0 1 1 2.36 6.36" />
              </svg>
            </button>
          </div>

          {/* Right block: Speed modifier */}
          <button
            onClick={handleSpeedChange}
            className="px-2.5 py-1 rounded bg-[#a855f7]/10 hover:bg-[#a855f7]/15 border border-[#a855f7]/20 text-[10px] font-semibold font-mono text-[#b975ff] transition-colors"
            title="Tốc độ phát"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>
    </div>
  );
}
