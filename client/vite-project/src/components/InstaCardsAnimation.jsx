import React, { useState, useEffect } from 'react'
import { Heart, Music, Phone, ShieldCheck, Sparkles, Star } from 'lucide-react'

export const InstaCardsAnimation = () => {
  const [animStage, setAnimStage] = useState(0)

  useEffect(() => {
    // Stage 1: Left card enters (100ms)
    const t1 = setTimeout(() => setAnimStage(1), 100)
    // Stage 2: Right card enters (300ms)
    const t2 = setTimeout(() => setAnimStage(2), 300)
    // Stage 3: Center card drops in (550ms)
    const t3 = setTimeout(() => setAnimStage(3), 550)
    // Stage 4: Floating badges & feature symbols pop in (900ms - 1200ms)
    const t4 = setTimeout(() => setAnimStage(4), 900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div className="relative w-full max-w-[440px] h-[480px] sm:h-[520px] flex items-center justify-center select-none overflow-visible">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl -z-10" />

      {/* 1. LEFT STORY CARD (Tilted Left, Enters first) */}
      <div
        className={`absolute left-2 sm:left-4 top-12 sm:top-14 w-[170px] sm:w-[195px] h-[260px] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-700 ease-out z-10 ${
          animStage >= 1
            ? 'opacity-80 -rotate-[14deg] -translate-x-4 sm:-translate-x-8 translate-y-0 scale-100'
            : 'opacity-0 -rotate-[25deg] -translate-x-24 translate-y-12 scale-75'
        }`}
      >
        <img
          src="/story_left.jpg"
          alt="Close friend story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full p-[1.5px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#d300c5]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[9px] font-bold text-white">
              S
            </div>
          </div>
          <span className="text-[10px] text-white/90 font-medium">sofia.vibe</span>
        </div>
      </div>

      {/* 2. RIGHT STORY CARD (Tilted Right with guitar/music, Enters second) */}
      <div
        className={`absolute right-2 sm:right-4 top-14 sm:top-16 w-[170px] sm:w-[195px] h-[260px] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-700 ease-out z-10 ${
          animStage >= 2
            ? 'opacity-80 rotate-[14deg] translate-x-4 sm:translate-x-8 translate-y-0 scale-100'
            : 'opacity-0 rotate-[25deg] translate-x-24 translate-y-12 scale-75'
        }`}
      >
        <img
          src="/story_right.jpg"
          alt="Close friend music story"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full p-[1.5px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#d300c5]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[9px] font-bold text-white">
              L
            </div>
          </div>
          <span className="text-[10px] text-white/90 font-medium">lucas.acoustic</span>
        </div>
      </div>

      {/* 3. CENTER MAIN STORY CARD (Upright, Foreground, Drops in with bounce) */}
      <div
        className={`relative w-[210px] sm:w-[245px] h-[330px] sm:h-[380px] rounded-3xl sm:rounded-[32px] overflow-hidden border-2 border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out z-20 ${
          animStage >= 3
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-85 translate-y-16'
        }`}
      >
        <img
          src="/story_center.jpg"
          alt="Close friends moments"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Top Story User Header */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full p-[2px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#d300c5]">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white">
                ✌️
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">maya & emma</p>
              <p className="text-[10px] text-zinc-300">Close Friends • 1h</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/10">
            Stories
          </span>
        </div>

        {/* Bottom Story Reply Bar matching Instagram screenshot */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2 z-10">
          <div className="flex-1 py-1.5 px-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] text-zinc-300">
            Reply to story...
          </div>
          <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
            <Heart className="w-3.5 h-3.5 fill-white/80" />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. SURROUNDING APP FEATURE SYMBOLS (Pop in around cards at 1s) */}
      {/* ============================================================ */}

      {/* Feature A: Reaction Emoji Bar (Floating above center card) */}
      <div
        className={`absolute top-0 sm:top-2 z-30 px-3.5 py-1.5 rounded-full bg-[#1e1e24]/90 backdrop-blur-xl border border-white/15 shadow-xl flex items-center gap-2 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 -translate-y-2'
            : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="text-sm hover:scale-125 transition-transform cursor-pointer">🔮</span>
        <span className="text-sm hover:scale-125 transition-transform cursor-pointer">🐱</span>
        <span className="text-sm hover:scale-125 transition-transform cursor-pointer">🥳</span>
        <span className="text-sm hover:scale-125 transition-transform cursor-pointer">💖</span>
      </div>

      {/* Feature B: Glowing 3D Heart (Instagram gradient heart on bottom-left) */}
      <div
        className={`absolute bottom-8 sm:bottom-12 -left-3 sm:-left-6 z-30 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-50 -translate-x-6 pointer-events-none'
        }`}
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#ff0069] via-[#d300c5] to-[#7638fa] p-0.5 shadow-lg shadow-pink-500/30 -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
          <div className="w-full h-full rounded-[14px] bg-[#121216] flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#ff0069] fill-[#ff0069] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Feature C: Close Friends Star Badge (Green badge on top-right of center card) */}
      <div
        className={`absolute top-20 sm:top-24 -right-1 sm:right-1 z-30 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-50 translate-x-6 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00ba50] text-white shadow-lg shadow-green-500/30 text-xs font-bold rotate-6 hover:rotate-0 transition-transform">
          <Star className="w-3.5 h-3.5 fill-white" />
          <span className="text-[11px] tracking-tight">Close Friends</span>
        </div>
      </div>

      {/* Feature D: Stories & Reels Ring Badge (Circular avatar with gradient ring on bottom-right) */}
      <div
        className={`absolute bottom-10 sm:bottom-14 -right-3 sm:-right-6 z-30 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-50 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="w-12 h-12 rounded-full p-[2.5px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#d300c5] shadow-lg shadow-purple-500/25 rotate-12 hover:rotate-0 transition-transform cursor-pointer">
          <div className="w-full h-full rounded-full bg-black p-[2px]">
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white">
              ✌️
            </div>
          </div>
        </div>
      </div>

      {/* Feature E: Music / Audio Badge (Floating pill top-left) */}
      <div
        className={`absolute top-10 sm:top-12 -left-2 sm:left-1 z-30 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-50 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c1c22]/90 backdrop-blur-md border border-white/15 text-zinc-300 text-[11px] font-medium shadow-md -rotate-6 hover:rotate-0 transition-transform">
          <Music className="w-3 h-3 text-[#ff0069]" />
          <span>Original Audio</span>
        </div>
      </div>

      {/* Feature F: Secure & Private Calls Badge (Floating bottom center) */}
      <div
        className={`absolute -bottom-4 z-30 transition-all duration-500 ease-out ${
          animStage >= 4
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-zinc-400 text-[10px] font-medium shadow-lg">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Encrypted Calls & Messages</span>
        </div>
      </div>
    </div>
  )
}

export default InstaCardsAnimation
