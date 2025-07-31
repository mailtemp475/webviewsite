import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Search, Music } from 'lucide-react';

interface AudioTrack {
  id: number;
  title: string;
  url: string;
  duration: string;
}

// Manual Track List - Aap yahan manually saare tracks add kar sakte hain
const manualTracks: AudioTrack[] = [
  {
    id: 1,
    title: 'Divine Meditation',
    url: 'https://infoogy.s3.ap-south-1.amazonaws.com/testing/satsang/1749828802658-0_0.mp3',
    duration: '5:23'
  },
  {
    id: 2,
    title: 'Sacred Chants',
    url: 'https://infoogy.s3.ap-south-1.amazonaws.com/testing/satsang/1749828804128-0_0.mp3',
    duration: '7:45'
  },
  {
    id: 3,
    title: 'Peaceful Prayers',
    url: 'https://infoogy.s3.ap-south-1.amazonaws.com/testing/satsang/1749828805658-0_0.mp3',
    duration: '6:12'
  },
  // Yahan aap aur tracks add kar sakte hain:
  // {
  //   id: 4,
  //   title: 'Your Track Title',
  //   url: 'https://infoogy.s3.ap-south-1.amazonaws.com/testing/satsang/YOUR_FILE_ID-0_0.mp3',
  //   duration: '4:30'
  // },
  // {
  //   id: 5,
  //   title: 'Another Track',
  //   url: 'https://infoogy.s3.ap-south-1.amazonaws.com/testing/satsang/ANOTHER_FILE_ID-0_0.mp3',
  //   duration: '6:15'
  // },
];

function App() {
  const [tracks] = useState<AudioTrack[]>(manualTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];
  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = async (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        }
      }
    }, 100);
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Spiritual Satsang
            </h1>
          </div>
          <p className="text-blue-200 text-lg">Divine Audio Collection for Inner Peace</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Track List */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tracks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="h-96 overflow-y-auto custom-scrollbar">
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">Track List ({filteredTracks.length})</h2>
              <div className="space-y-2">
                {filteredTracks.map((track, index) => {
                  const originalIndex = tracks.findIndex(t => t.id === track.id);
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(originalIndex)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20 ${
                        originalIndex === currentTrackIndex
                          ? 'bg-yellow-400/20 border border-yellow-400/50'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-sm truncate">{track.title}</h3>
                          <p className="text-blue-300 text-xs">Track {track.id}</p>
                        </div>
                        <span className="text-blue-300 text-xs">{track.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Player */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <Music className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentTrack.title}</h2>
              <p className="text-blue-300">Track {currentTrack.id} of {tracks.length}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
                onClick={seek}
              >
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-blue-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={previousTrack}
                disabled={currentTrackIndex === 0}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlay}
                className="p-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>

              <button
                onClick={nextTrack}
                disabled={currentTrackIndex === tracks.length - 1}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center space-x-4">
              <Volume2 className="w-5 h-5 text-blue-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-blue-300 text-sm">{Math.round(volume * 100)}%</span>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={currentTrack.url}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.8);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default App;