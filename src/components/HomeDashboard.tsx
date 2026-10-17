/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

// Web Audio API Synthesizer (Zero External Libs)
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHoverBlip() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.045);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  playChannelPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  playTactileClick() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  playCoinChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [1046.50, 1318.51, 1567.98]; // C6, E6, G6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = now + (idx * 0.08);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(start);
        osc.stop(start + 0.38);
      });
    } catch {}
  }

  triggerHaptic(pattern = 20) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }
}

const sounds = new SoundEngine();

export function HomeDashboard({ onOpenPractice }: { onOpenPractice: () => void }) {
  const [coinBalance, setCoinBalance] = useState<number>(500);
  const [claimBtnText, setClaimBtnText] = useState<string>('Claim 500 Coins');
  const [balanceHighlight, setBalanceHighlight] = useState<boolean>(false);

  // Claim 500 Coins action
  const handleClaimCoins = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.triggerHaptic(30);
    sounds.playCoinChime();

    setCoinBalance((prev) => prev + 500);
    setBalanceHighlight(true);
    setClaimBtnText('+500 Added! 🎉');

    setTimeout(() => {
      setBalanceHighlight(false);
    }, 400);

    setTimeout(() => {
      setClaimBtnText('Claim 500 Coins');
    }, 1600);
  };

  // Attach 3D tilt physics and user interaction audio unlock
  useEffect(() => {
    const handlePointerDown = () => {
      sounds.playHoverBlip();
    };
    window.addEventListener('pointerdown', handlePointerDown, { once: true });

    const tiltCards = document.querySelectorAll<HTMLElement>('.tilt-card');
    const cleanups: Array<() => void> = [];

    tiltCards.forEach((card) => {
      let bounds: DOMRect | null = null;
      const updateBounds = () => {
        bounds = card.getBoundingClientRect();
      };

      const onEnter = () => {
        updateBounds();
        sounds.playHoverBlip();
      };

      const onMove = (e: MouseEvent) => {
        if (!bounds) updateBounds();
        if (!bounds) return;
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = mouseX / bounds.width;
        const yPct = mouseY / bounds.height;

        const rotateY = ((xPct - 0.5) * 14).toFixed(2);
        const rotateX = ((0.5 - yPct) * 14).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.035, 1.035, 1.035)`;
        card.style.setProperty('--mouse-x', `${(xPct * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(yPct * 100).toFixed(1)}%`);
      };

      const onLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      cleanups.forEach((c) => c());
    };
  }, []);

  const handleCardClick = () => {
    sounds.triggerHaptic(20);
    sounds.playTactileClick();
    onOpenPractice();
  };

  return (
    <div className="bg-[#fcf9f4] min-h-screen text-[#2a1700] font-quicksand pb-16 selection:bg-[#fed7aa] selection:text-[#855300]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 sm:space-y-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO SPLIT SECTION: Mascot Banner & User Status                       */}
        {/* ========================================================================= */}
        <section className="w-full" data-purpose="hero-section">
          <div className="relative bg-gradient-to-br from-[#fff7ed] via-[#fef3c7] to-[#fed7aa] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 lg:p-9 border border-amber-200/70 shadow-[0_4px_20px_rgba(217,119,6,0.06)] overflow-hidden flex flex-col md:flex-row md:items-end justify-between min-h-[220px] md:min-h-[240px] gap-6 md:gap-4 group">
            {/* Left details: Name, Rank, Streak & Coins */}
            <div className="z-10 flex flex-col justify-center space-y-3.5 max-w-xl pr-0 md:pr-4">
              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#855300] font-bold text-base sm:text-lg lg:text-xl leading-none block tracking-tight">Hello,</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/75 backdrop-blur-sm border border-amber-200/60 text-xs font-bold text-[#855300] shadow-xs">
                    ⭐ Level 18 • Grandmaster
                  </span>
                </div>
                <h1 className="text-[#2a1700] font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight block tracking-tight">
                  Siddhi Jha
                </h1>
              </div>

              {/* Badges & Coins Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                {/* Claim Coin Button with Shimmer */}
                <button 
                  onClick={handleClaimCoins}
                  className="claim-badge-shimmer inline-flex items-center gap-1.5 border border-[#f59e0b]/50 rounded-full px-3 sm:px-3.5 py-1.5 shadow-sm transition-transform hover:scale-105 active:scale-95 w-max cursor-pointer"
                >
                  <span className="w-4 h-4 rounded-full bg-[#d97706] flex items-center justify-center text-white text-[10px] font-black leading-none animate-bounce">
                    💰
                  </span>
                  <span className="text-[#855300] font-extrabold text-xs sm:text-[12.5px] tracking-tight">
                    {claimBtnText}
                  </span>
                </button>

                {/* Current Coin Balance */}
                <div className={`inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-xs border border-amber-200 rounded-full px-3 sm:px-3.5 py-1.5 w-max transition-all shadow-xs ${balanceHighlight ? 'scale-110 bg-amber-100' : 'hover:scale-105'}`}>
                  <span className="w-4 h-4 rounded-full bg-[#f59e0b] border border-[#d97706] flex items-center justify-center text-[10px]">🪙</span>
                  <span className="text-[#855300] font-extrabold text-xs sm:text-[12.5px] tracking-tight">
                    {coinBalance} coins
                  </span>
                </div>

                {/* Streak Badge */}
                <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-xs border border-amber-200/70 rounded-full px-3 py-1.5 w-max text-[#855300] font-bold text-xs tracking-tight shadow-xs hover:bg-white transition-all">
                  <span>🔥</span>
                  <span>14-Day Streak</span>
                </div>
              </div>
            </div>

            {/* Grounded & Prominent Mascot Character */}
            <div className="self-end md:absolute md:right-8 lg:right-14 md:bottom-0 z-10 flex items-end justify-center md:justify-end pointer-events-none w-full md:w-auto h-40 sm:h-48 md:h-56 lg:h-64">
              <img 
                alt="Siddhi Mascot Character" 
                className="h-full w-auto max-w-[200px] sm:max-w-[240px] md:max-w-none object-contain object-bottom select-none drop-shadow-md animate-mascot block -mb-0.5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZwYwfutAhwXFnQlHSX604aISJEdyUMXC_U4iWO2Jfovikjk3SI76iV-m3jVMX6uWtqsKm8Ef5F7g4mp3iK_G9HSrCfO-ylOX1OuxBPudeP2nMmB-TMmVytRbM9JHtuo1-dwQeA8xOKWZB8NniYhLWcFbBGPfIGgRSkm1oFksTO3PHh-SyLl9Mj4UdfbCTGHjQlKgmhFGY77t-Cu5cm7Lv_r9pOEhuhmWtjgdwrhqMTnu2EZpDUDc8IvnECqYiRwGdDw"
              />
            </div>

            {/* Edit Profile Pencil Button */}
            <button 
              aria-label="Edit Profile" 
              onClick={() => { sounds.playTactileClick(); }}
              className="absolute top-3 sm:top-auto sm:bottom-3 right-3 z-20 w-8 h-8 bg-[#d97706] hover:bg-[#b45309] text-white rounded-md flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-90 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SHELF: CONTESTS (5 Cards)                                              */}
        {/* ========================================================================= */}
        <section className="space-y-4" data-purpose="shelf-contests">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2a1700] flex items-center gap-2 tracking-tight">
              <span className="text-[#f59e0b] text-xl">★</span> Contests
            </h2>
            <button 
              onClick={handleCardClick}
              className="text-[#d97706] hover:text-[#b45309] text-sm font-bold tracking-tight transition-colors cursor-pointer"
            >
              See more
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {/* Card 1: Web Development (Pastel Blue) */}
            <article 
              onClick={handleCardClick}
              onMouseEnter={() => sounds.playHoverBlip()}
              className="contest-card bg-white rounded-[24px] p-4 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer min-w-0"
            >
              <div className="bg-[#e0f2fe]/70 rounded-[18px] p-4 flex flex-col min-h-[220px] transition-transform duration-300 group-hover:bg-[#e0f2fe]/90">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-sky-800 shadow-xs group-hover:scale-105 transition-transform">₹5,000 Pool</span>
                  <span className="text-[11px] font-bold text-sky-900/60">2.1k registered</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-snug tracking-tight">Web Development</h3>
                <p className="text-xs font-medium text-gray-700/80 mt-1.5 leading-relaxed">Build high-performance web applications, reactive UIs and APIs.</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bae6fd]/70 text-sky-950 transition-all hover:bg-sky-200">Frontend</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bae6fd]/70 text-sky-950 transition-all hover:bg-sky-200">Backend</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bae6fd]/70 text-sky-950 transition-all hover:bg-sky-200">REST APIs</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bae6fd]/70 text-sky-950 transition-all hover:bg-sky-200">Next.js</span>
                </div>
              </div>
              <div className="pt-4 px-1 pb-1 flex items-center justify-between">
                <span className="font-black text-sm text-gray-900 group-hover:text-[#d97706] transition-colors">Explore</span>
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:bg-[#f59e0b] group-hover:text-white group-hover:translate-x-1 transition-all shadow-xs">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </article>

            {/* Card 2: Algorithms & DS (Pastel Peach/Orange) */}
            <article 
              onClick={handleCardClick}
              onMouseEnter={() => sounds.playHoverBlip()}
              className="contest-card bg-white rounded-[24px] p-4 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer min-w-0"
            >
              <div className="bg-[#ffedd5]/80 rounded-[18px] p-4 flex flex-col min-h-[220px] transition-transform duration-300 group-hover:bg-[#ffedd5]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-orange-900 shadow-xs group-hover:scale-105 transition-transform">₹8,000 Pool</span>
                  <span className="text-[11px] font-bold text-orange-950/60">3.8k registered</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-snug tracking-tight">Algorithms &amp; DS</h3>
                <p className="text-xs font-medium text-gray-700/80 mt-1.5 leading-relaxed">Solve complex algorithmic puzzles, dynamic programming &amp; graph logic.</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fed7aa] text-orange-950 transition-all hover:bg-orange-300">Dynamic Prog</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fed7aa] text-orange-950 transition-all hover:bg-orange-300">Graphs</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fed7aa] text-orange-950 transition-all hover:bg-orange-300">Trees</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fed7aa] text-orange-950 transition-all hover:bg-orange-300">Backtracking</span>
                </div>
              </div>
              <div className="pt-4 px-1 pb-1 flex items-center justify-between">
                <span className="font-black text-sm text-gray-900 group-hover:text-[#d97706] transition-colors">Compete</span>
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:bg-[#f59e0b] group-hover:text-white group-hover:translate-x-1 transition-all shadow-xs">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </article>

            {/* Card 3: AI & Machine Learning (Pastel Lavender) */}
            <article 
              onClick={handleCardClick}
              onMouseEnter={() => sounds.playHoverBlip()}
              className="contest-card bg-white rounded-[24px] p-4 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer min-w-0"
            >
              <div className="bg-[#f3e8ff]/75 rounded-[18px] p-4 flex flex-col min-h-[220px] transition-transform duration-300 group-hover:bg-[#f3e8ff]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-purple-900 shadow-xs group-hover:scale-105 transition-transform">₹10,000 Pool</span>
                  <span className="text-[11px] font-bold text-purple-950/60">4.5k registered</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-snug tracking-tight">AI &amp; Machine Learning</h3>
                <p className="text-xs font-medium text-gray-700/80 mt-1.5 leading-relaxed">Train predictive models, computer vision neural nets &amp; LLM agents.</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e9d5ff] text-purple-950 transition-all hover:bg-purple-300">PyTorch</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e9d5ff] text-purple-950 transition-all hover:bg-purple-300">LLMs</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e9d5ff] text-purple-950 transition-all hover:bg-purple-300">Vision</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e9d5ff] text-purple-950 transition-all hover:bg-purple-300">NLP</span>
                </div>
              </div>
              <div className="pt-4 px-1 pb-1 flex items-center justify-between">
                <span className="font-black text-sm text-gray-900 group-hover:text-[#d97706] transition-colors">Explore</span>
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:bg-[#f59e0b] group-hover:text-white group-hover:translate-x-1 transition-all shadow-xs">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </article>

            {/* Card 4: Systems & Security (Pastel Mint) */}
            <article 
              onClick={handleCardClick}
              onMouseEnter={() => sounds.playHoverBlip()}
              className="contest-card bg-white rounded-[24px] p-4 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer min-w-0"
            >
              <div className="bg-[#dcfce7]/75 rounded-[18px] p-4 flex flex-col min-h-[220px] transition-transform duration-300 group-hover:bg-[#dcfce7]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-emerald-900 shadow-xs group-hover:scale-105 transition-transform">₹6,500 Pool</span>
                  <span className="text-[11px] font-bold text-emerald-950/60">1.9k registered</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-snug tracking-tight">Systems &amp; Security</h3>
                <p className="text-xs font-medium text-gray-700/80 mt-1.5 leading-relaxed">Low-level OS internals, concurrency, memory safety &amp; binary analysis.</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 transition-all hover:bg-emerald-300">Rust</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 transition-all hover:bg-emerald-300">C / C++</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 transition-all hover:bg-emerald-300">Linux Kernel</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#bbf7d0] text-emerald-950 transition-all hover:bg-emerald-300">Crypto</span>
                </div>
              </div>
              <div className="pt-4 px-1 pb-1 flex items-center justify-between">
                <span className="font-black text-sm text-gray-900 group-hover:text-[#d97706] transition-colors">Explore</span>
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:bg-[#f59e0b] group-hover:text-white group-hover:translate-x-1 transition-all shadow-xs">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </article>

            {/* Card 5: Competitive CP (Pastel Warm Amber/Yellow) */}
            <article 
              onClick={handleCardClick}
              onMouseEnter={() => sounds.playHoverBlip()}
              className="contest-card bg-white rounded-[24px] p-4 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer min-w-0"
            >
              <div className="bg-[#fef9c3]/80 rounded-[18px] p-4 flex flex-col min-h-[220px] transition-transform duration-300 group-hover:bg-[#fef9c3]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-amber-900 shadow-xs group-hover:scale-105 transition-transform">₹12,000 Pool</span>
                  <span className="text-[11px] font-bold text-amber-950/60">5.1k registered</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 leading-snug tracking-tight">Competitive CP</h3>
                <p className="text-xs font-medium text-gray-700/80 mt-1.5 leading-relaxed">High-speed live contests with ICPC &amp; Codeforces rating systems.</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fef08a] text-amber-950 transition-all hover:bg-amber-300">Speed Run</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fef08a] text-amber-950 transition-all hover:bg-amber-300">ICPC Style</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fef08a] text-amber-950 transition-all hover:bg-amber-300">Math</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fef08a] text-amber-950 transition-all hover:bg-amber-300">Codeforces</span>
                </div>
              </div>
              <div className="pt-4 px-1 pb-1 flex items-center justify-between">
                <span className="font-black text-sm text-gray-900 group-hover:text-[#d97706] transition-colors">Compete</span>
                <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:bg-[#f59e0b] group-hover:text-white group-hover:translate-x-1 transition-all shadow-xs">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SHELF: CHANNELS (9 Channel Avatars in Aura Rings)                      */}
        {/* ========================================================================= */}
        <section className="space-y-4" data-purpose="shelf-my-channels">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2a1700] flex items-center gap-2 tracking-tight">
              <span className="text-[#f59e0b] text-xl">★</span> My channels
            </h2>
            <button 
              onClick={() => { sounds.playTactileClick(); }}
              className="text-[#d97706] hover:text-[#b45309] text-sm font-bold tracking-tight transition-colors cursor-pointer"
            >
              See more
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-amber-100/70 shadow-[0_2px_12px_rgba(217,119,6,0.04)] flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {[
              {
                name: 'CyberHamster',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYBe8sZOc6x5XMVxjeX7CpnTJWyx7hEQTkfGDAtkeH1slvNVWfcVMTkc7bMarrpEQxMYeQXxFAsRTi2DWBz2i046Cw0k21BMsXCpLpczewUohFR1zIE2vZU5O6196gIlDx4bwCo_FLoIjL0IbGdWhjUpocm2v2VkWjo81lyTzFyyadI39qdAfjbBk1uHV1Qz2jO4cgoUuyEuU6DOoyhyRcaVp_q3MBZDi7qQFwdY6NpFvlBl_Co-pnMXtYV8HNifEwLQ'
              },
              {
                name: 'Matrix Coders',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLeJ6_EPNXAb8nNjj1kWjgyxJ5Xl80YyQRDryJLCL1z28Fwfg4EzG8mFJqFap7ot4L6SESNsNjt7nshNBrT5BOunt8lTEPcG9YL2nZQ09V5xsTBLyjTVarK3jWokFEHFlrtRi3hFhQIbvRTC8IcWpysyoqE8H-anT4GZij807IZ0SM43kOzXkuavLsf3g8qYvbYP4Iip1w3FRBFtZZKhioawuJuE02vPJYRHsm2hXZGheht6gImii7q2C-7Cuhego70g'
              },
              {
                name: 'Java Kitty Dev',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnm8R79gXlWo-4wlyZbeHF79v_dybK19t-VFISWmz0fznyhvG5NMfc8arm-IOK4-GzxaV_qEwWM1GamGYED3aS25h3XdTUK3jh2eeGBWWg_crV7kgtcPbMp4fgYQ85QCXco46XBb-NAZDWaGpbPZX39NSsWaIO8NI_7OkxJ3aAZdtCGKEfI-dhsTWSL0WZ086_teY3C04FhkFcCQPbnn3Ml9_eXIYQ4-ChohwkSP1dRyfoR7WLhgSMYiL-5l-JqcAyEQ'
              },
              {
                name: 'Kermit Tech Club',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdVcc9W6E4-uTLWC7-K02eYhmzIAxvunlfAY-BZXybaJQ8jrSjK6_C9xKSwrCBk3ufTYny97D_l6z0cNg1q9R2AaAXK0hkNDDiJGgc3uOc0WjyL2GEEhHKkvy5lZpmY_Rw0hr4lur6Dzhs1GUjs99NR6QlmOMVXXjMkerQSR0uFqEc9FT_HEj-sXn714x88uDJ1Sl4UuowUT-F_WRQohxUvO_sbuvpgzlztN1cSAYHe_Vs7Um0e7BCrMVnqqaxFJOHFQ'
              },
              {
                name: 'Chill Dev Station',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2eV3Q1GRJKU4PwFN1r8FTH_tebL0JFQ3aDUgO-pSpAsgeb1HmMrs1C9dJA8WkFnK3pfpCEf2FIicJqtGlu3AyISzrM87T3vU1UHLseAMmUHmNxIrFwkQv5JvC14kEXaabTOLfx9s-48sIaI3cJSfL-KIyfnL5rzfp0HYqSJVmothPbm7-WJnI-8Rd4pNF89ao3hWf20f1Z2cBHHYZGL6tJGoTYaQF9RfOuTFR10t30I_RJGK4f-zQWPFfwNwy64KZ2g'
              },
              {
                name: '#DEFINE',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAHGcjcwmADFgNY6mAjrCW2KzKel8ZizwZdjrIe5eG7hYsDnZfPNtEsYVFvlvc7hEXDPekole4Vmxugwg2REozeHxkgpS1gIOnhHJ7peOHo1AhoM78AICRpGTYfZdVMwfaRQIbzoeDjHmldtDA8B90oV5gklSBAR5SWot-_J3BSeqdmG5cp3nolfDt9532iabB73QjPxpktID27EpXYZ68cQ7JW8iuolcjNJ_8oshZ1j5LmqhCWFGkCowpwV_oWAxOKQ'
              },
              {
                name: 'GDG Devs',
                bg: 'bg-white',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2zvALaQBXXzL5Z5RBUGFb7qXvAH8jCFhWQXRUkiZa4W8iEAH5bdKyqAgSJUmLi_-oRpHU72C-cdGr1hhOwQisrHWvwIf3NLm_YbJYI02H5nA9Rn9GCZypKdKEcrXUQy4UcPiq966aS5xhGtO_td0XD9QWZ7N4ME_k39D419uDKolgfcIrxx_WDIOEynQUxvIDLl23XSjsg8x61JEC485n53B9G0WGBSECL_DKtcCJT43qJRctlU1tAKTmMAQcfFFBUA'
              },
              {
                name: 'Namespace',
                bg: 'bg-white',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAVxZpedjlXC6qIchftLd32S_KF1uxuyUtQlv071XXV2ReBQM_bxr9r7dlCdi7Lm1HXK3BMf1CW8AM_v-WD6RL1V0KS03ZNM1GL6AZWNxYYj8LBL7wbkG924BmnVWJYA60N9Ls6HNzAxbtbnOhmlYw2dFr7b6lplhyzQqS1e5dXQr-qnu8WohrJr6DFOL33oMxP-BjVbsZlcuibcaSfXHBYbEhUl7GmISx5ggh5cHEkxL9XScNmwI8GSQrMzH5pvahhA'
              },
              {
                name: 'Anveshan',
                bg: 'bg-black',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhdl1LRbh9lGq6kfug5vJGCLuQ8VJXmvQQGLD8mkyTswkCMS51D0XZGODH-Kjpt_2oYgclJd20ww0_kCheK1Hsw8rgXjlVppdGacsKdhnzbWYop2lFdNE46BcTbd5-Jd6AmJVSEkYIhM51frsvpsBYzMMClOicaoOSdMbeyEZ9oOI_SLQEaiJFjN9trP7jmub50Bd3rM5zzM6oT-tUp_19HNFiMJPqiXkLRrdACuMFMOcVj7cwcS5EzpdYBad9xcDXOQ'
              }
            ].map((channel, i) => (
              <div 
                key={i} 
                onClick={() => { sounds.triggerHaptic(20); sounds.playTactileClick(); }}
                onMouseEnter={() => sounds.playChannelPop()}
                className="channel-item flex flex-col items-center cursor-pointer shrink-0 transition-transform duration-200 active:scale-95"
              >
                <div className="channel-ring relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-md shadow-amber-500/20 transition-all duration-300 ease-out">
                  <div className={`w-full h-full rounded-full overflow-hidden relative shadow-inner ${channel.bg}`}>
                    <img 
                      alt={channel.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      src={channel.img} 
                    />
                    <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
                    <div className="absolute top-1 left-2.5 right-2.5 h-7 rounded-t-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none blur-[0.5px]"></div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 text-center truncate w-20 sm:w-24 mt-2 sm:mt-2.5 group-hover:text-[#d97706] transition-colors">
                  {channel.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SHELF: PRACTICE & HACKATHONS (5 Cards with Specular Sheen Sweep)       */}
        {/* ========================================================================= */}
        <section className="space-y-4" data-purpose="shelf-mathematics">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2a1700] flex items-center gap-2 tracking-tight">
              <span className="text-[#f59e0b] text-xl">★</span> Practice
            </h2>
            <button 
              onClick={handleCardClick}
              className="text-[#d97706] hover:text-[#b45309] text-sm font-bold tracking-tight transition-colors cursor-pointer"
            >
              See more
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {[
              {
                title: "Math Hackathon Africa '25",
                badge: "August 6th",
                badgeColor: "text-[#855300]",
                tag1: "Global",
                tag2: "Prize 10k",
                tag2Color: "text-[#d97706] bg-amber-50 border-amber-200/60",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjO5wRARhRB-GhRX3I-0DZHm90Wxw6nuEcS1jI5NrxSv_oCDFNrZTO1R-8yjZAhR4EHPM6yhgEmlz298iS8tRfAH-XG53xX5cpquzhd1na6WlUe1DnPtGtVuD7kpU7FdgUsrhIy-ulfSg6uE2WemzlCmaJAdXTBtqEK_oXcw3jZURbT89JYzd-X_UiWUibd7W6xI9Nz_EW4-RVKdrNGMr8dUMmC6-fufWq04Bd5jTyv0GZpx-b04j8H023rSS9zxZlUw",
                bg: "bg-amber-50/50"
              },
              {
                title: "Hackathon 25: Digital Strategies",
                badge: "Oct 10-11",
                badgeColor: "text-emerald-800",
                tag1: "BCG Platinion",
                tag2: "Coding",
                tag2Color: "text-emerald-700 bg-emerald-50 border-emerald-200/60",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0WDf7-Kx8sJrNcy-7se0F8F8TW76YnG14zdDiLeg3LeKmiY6g-B2Zkn0oVZ-Wh9-ZrsEfeQkg4VGkCJn9ok0C7q6Q_NTwTcU3OhTeh3zitkHpS60ARmHPu3ixLtVHg7wZWATMXeYXeqasPUrm0Dqb5nP4r5Vgyy-qRZfP0h4FQEs_fWR8XMUg7Wau2COyDQLhFaWjRpm7NTxMealna-jXx4A_dTrBtRTuKLwjqWbsaZSQ0LdzLGEchEehFCJFHYsXVQ",
                bg: "bg-emerald-50/50"
              },
              {
                title: "NACOS Tech Week '25",
                badge: "1st - 8th June",
                badgeColor: "text-[#0284c7]",
                tag1: "AI & VR",
                tag2: "University",
                tag2Color: "text-blue-700 bg-blue-50 border-blue-200/60",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSf-SHw4EUm9k0ceLzTA4UW4SW3Sv2fODfooegCrqDQbY1uKDXTQjRaVjTfxqJ6glHEII8XNnLZcnYgNJ4hrobGfhU8YmgQG4Xlbleo1mFCpPm69uuD7yAsI6rQPiZImlpMefJD5ZN6Usn0SXayr4-TlcTnZVFozNqsmzSOT-yZDXh_NDbWXK_KhTs80U_jI2f1oJEUOJNpqkkusu-J48TeOgn-a4pRKzJMsSxPy0c28pWNvSeNzoOk8w8PaTVFmyqhg",
                bg: "bg-blue-50/50"
              },
              {
                title: "Capture The Flag Hackathon",
                badge: "9 Juni",
                badgeColor: "text-[#e11d48]",
                tag1: "Security",
                tag2: "CTF",
                tag2Color: "text-pink-700 bg-pink-50 border-pink-200/60",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALI8A0nave4kBA6wHg4OhskVqEHqOZLan-Sixib1oN6vM92ip6ZITTGxh-auo5Nimo12olL34S3B9WhIfnALhsLcaXTuIsyqTfdxUU1O0z-mGG9mA4prGxm1KtudqQUAT8VUz9SdcMB5IKZJX8tA25RSjKprBuAHIwlqbIIb2rr2dtqO77Fwpv932p71HCuMRIKkvRfN_TwS3MDmPZbcwslk-TznKVitHECWH_hYMJuM2VqF967YgbL0-1GeUA8QvQ8g",
                bg: "bg-rose-50/50"
              },
              {
                title: "Yukthi National Hackathon",
                badge: "Sep 18-19",
                badgeColor: "text-indigo-800",
                tag1: "IEEE",
                tag2: "Prize ₹30K",
                tag2Color: "text-indigo-700 bg-indigo-50 border-indigo-200/60",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1_vFdJA7dCi8vtOOBpozOf-GI6_8uEQlDpDJRSZlGFEN4GPFFc-AEKHj_fUQuPLF14Ubr68zv_bEDLSyE_Od6P2QprgaaYKHOWKDh-H4KxQMcxoW9spXTlLxhxJMKCjJYVMqPuuiw2asxTj0jg1LABdcg5RiVfHdQLdJKe2C6A19162fr7MTHqsi1TSulFTe75lYeREXa2iY5pqPFor8xM3sBgiT9pIaNsXJrRtPZACnenerrm56IClj3wqfkLHF0g",
                bg: "bg-indigo-50/50"
              }
            ].map((hack, idx) => (
              <article 
                key={idx}
                onClick={handleCardClick}
                onMouseEnter={() => sounds.playHoverBlip()}
                className="hackathon-card bg-white/70 backdrop-blur-xl rounded-[28px] border border-white/80 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-8px_rgba(217,119,6,0.2)] p-3 flex flex-col justify-between group cursor-pointer min-w-0"
              >
                <div className={`relative w-full aspect-square rounded-[22px] overflow-hidden ${hack.bg} shadow-inner`}>
                  <img 
                    alt={hack.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300" 
                    src={hack.img} 
                  />
                  <div className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-md text-[10px] font-bold ${hack.badgeColor} shadow-xs border border-white/80`}>
                    {hack.badge}
                  </div>
                </div>

                <div className="mt-3 px-1 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#d97706] transition-colors line-clamp-1">
                    {hack.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-gray-600 border border-gray-100 shadow-xs">
                      {hack.tag1}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-xs ${hack.tag2Color}`}>
                      {hack.tag2}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
                    className="mt-3 w-full py-2 px-3 rounded-full bg-gradient-to-b from-white/95 to-amber-50/80 hover:from-white hover:to-amber-100 active:scale-95 text-[#855300] font-bold text-xs tracking-tight shadow-sm border border-white/90 transition-all text-center cursor-pointer" 
                    type="button"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
