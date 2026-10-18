/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface HomeScreenProps {
  onOpenPractice: () => void;
  onOpenCompiler: () => void;
  onNavigateContests?: () => void;
}

export function HomeScreen({ onOpenPractice, onOpenCompiler, onNavigateContests }: HomeScreenProps) {
  const [createContestModal, setCreateContestModal] = useState<boolean>(false);
  const [joinContestModal, setJoinContestModal] = useState<boolean>(false);
  const [contestName, setContestName] = useState<string>('');
  const [contestCode, setContestCode] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestName.trim()) return;
    setCreateContestModal(false);
    showToast(`Contest "${contestName}" created! Share invite code: BERG-${Math.floor(1000 + Math.random() * 9000)}`);
    setContestName('');
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contestCode.trim()) return;
    setJoinContestModal(false);
    showToast(`Joined contest #${contestCode}! Redirecting to arena...`);
    setContestCode('');
    setTimeout(() => {
      onOpenPractice();
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between space-y-10 font-jakarta" data-purpose="dashboard-main">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#1e293b] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* BEGIN: HeroSection */}
      <section className="space-y-8" data-purpose="hero-banner">
        {/* Top Row: Typography & Penguin Illustration */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          {/* Left Header Copy */}
          <div className="max-w-xl z-10">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#8392a5] uppercase mb-3">
              CODE • PRACTICE • GROW
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              Your Next<br />
              Coding Challenge<br />
              <span className="text-[#f59e0b]">Starts Here</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[#64748b] max-w-md font-medium">
              Create custom contests, join live competitions, and level up your coding skills — all in one place.
            </p>
          </div>

          {/* Right Hero Illustration Container */}
          <div className="relative w-full lg:w-[420px] h-60 lg:h-64 flex items-center justify-center" data-purpose="hero-mascot-illustration">
            {/* Soft cloud / backdrop blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ede9fe]/50 via-[#fef3c7]/30 to-[#e0f2fe]/50 rounded-full blur-2xl transform scale-90"></div>
            {/* Main SVG Mascot Illustration */}
            <svg className="w-full h-full relative z-10" fill="none" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg">
              {/* Floating speech bubble </> */}
              <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                <rect fill="#93a5ff" fillOpacity="0.9" height="36" rx="10" width="46" x="70" y="28"></rect>
                <polygon fill="#93a5ff" fillOpacity="0.9" points="85,64 92,64 88,70"></polygon>
                <text fill="#ffffff" fontFamily="'Plus Jakarta Sans', monospace" fontSize="14" fontWeight="700" textAnchor="middle" x="93" y="52">&lt;/&gt;</text>
              </g>
              {/* Floating message bar right */}
              <rect fill="#b4c6fc" fillOpacity="0.9" height="28" rx="8" width="44" x="295" y="56"></rect>
              <rect fill="#ffffff" height="3" rx="1.5" width="28" x="303" y="65"></rect>
              <rect fill="#ffffff" height="3" rx="1.5" width="18" x="303" y="72"></rect>
              {/* Sparkling gold stars */}
              <path d="M54 75L56 68L58 75L65 77L58 79L56 86L54 79L47 77Z" fill="#fbbf24"></path>
              <path d="M312 36L313.5 30L315 36L321 37.5L315 39L313.5 45L312 39L306 37.5Z" fill="#fbbf24"></path>
              <circle cx="218" cy="80" fill="#a5b4fc" r="2.5"></circle>
              {/* Penguin Body */}
              {/* Shadows */}
              <ellipse cx="230" cy="216" fill="#000000" fillOpacity="0.06" rx="72" ry="10"></ellipse>
              {/* Main Navy Body */}
              <ellipse cx="232" cy="148" fill="#20293a" rx="50" ry="58"></ellipse>
              {/* Penguin White Belly / Face patch */}
              <path d="M214 116C214 104 223 96 233 96C243 96 251 104 251 116C251 138 259 160 259 174C259 190 248 198 232 198C216 198 206 190 206 174C206 158 214 136 214 116Z" fill="#f8fafc"></path>
              {/* Left Eye */}
              <ellipse cx="221" cy="120" fill="#1e293b" rx="3.5" ry="5.5"></ellipse>
              <ellipse cx="222" cy="118" fill="#ffffff" rx="1.2" ry="1.8"></ellipse>
              {/* Right Eye */}
              <ellipse cx="242" cy="120" fill="#1e293b" rx="3.5" ry="5.5"></ellipse>
              <ellipse cx="243" cy="118" fill="#ffffff" rx="1.2" ry="1.8"></ellipse>
              {/* Orange Beak */}
              <polygon fill="#f59e0b" points="231,126 226,134 237,134" stroke="#f59e0b" strokeLinejoin="round" strokeWidth="2"></polygon>
              {/* Left & Right Flippers */}
              <ellipse cx="187" cy="168" fill="#1a2333" rx="10" ry="24" transform="rotate(25 187 168)"></ellipse>
              <ellipse cx="272" cy="160" fill="#1a2333" rx="11" ry="26" transform="rotate(-18 272 160)"></ellipse>
              {/* Orange Feet */}
              <ellipse cx="239" cy="204" fill="#fbbf24" rx="12" ry="8" stroke="#f59e0b" strokeWidth="1.5"></ellipse>
              {/* Laptop */}
              {/* Laptop Screen */}
              <path d="M152 144C152 140 155 137 159 137H217C221 137 224 140 224 144L230 198H160L152 144Z" fill="#475569" stroke="#334155" strokeWidth="1.5"></path>
              {/* Inner screen reflection / logo */}
              <rect fill="#3b4859" height="42" rx="3" width="58" x="163" y="145"></rect>
              <text fill="#cbd5e1" fontFamily="'Plus Jakarta Sans', monospace" fontSize="12" fontWeight="700" textAnchor="middle" x="192" y="171">&lt;/&gt;</text>
              {/* Laptop Base / Keyboard deck */}
              <path d="M157 197H242L248 208H165L157 197Z" fill="#64748b"></path>
              <rect fill="#334155" height="4" rx="2" width="91" x="157" y="206"></rect>
            </svg>
          </div>
        </div>

        {/* Bottom Action Cards (Create Contest & Join Contest) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-purpose="action-cards">
          {/* Card 1: Create Contest */}
          <button
            type="button"
            onClick={() => setCreateContestModal(true)}
            className="interactive-card hero-pattern-card1 bg-wave-amber relative overflow-hidden rounded-2xl p-5 border border-amber-100 flex items-center justify-between group shadow-sm hover:shadow-md text-left cursor-pointer"
          >
            <div className="flex items-center space-x-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-[#fcd34d]/60 flex items-center justify-center shrink-0 text-[#78350f]">
                {/* Code icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1e293b] flex items-center">
                  Create Contest
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5 max-w-[220px]">
                  Set your own questions, rules and invite others to compete.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#475569] group-hover:translate-x-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>

          {/* Card 2: Join Contest */}
          <button
            type="button"
            onClick={() => setJoinContestModal(true)}
            className="interactive-card hero-pattern-card2 bg-wave-purple relative overflow-hidden rounded-2xl p-5 border border-indigo-100 flex items-center justify-between group shadow-sm hover:shadow-md text-left cursor-pointer"
          >
            <div className="flex items-center space-x-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-[#c7d2fe]/60 flex items-center justify-center shrink-0 text-[#3730a3]">
                {/* Users/Group icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1e293b] flex items-center">
                  Join Contest
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5 max-w-[220px]">
                  Discover live and upcoming contests and test your skills.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#475569] group-hover:translate-x-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: PracticeTracksSection */}
      <section className="space-y-4" data-purpose="practice-tracks">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-[#111827]">Practice Tracks</h3>
            <span className="text-[10px] font-bold text-[#4f46e5] bg-[#e0e7ff] px-2 py-0.5 rounded-full uppercase tracking-wider">Curated</span>
          </div>
          <button 
            onClick={onOpenPractice}
            className="text-xs font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center space-x-1 group transition-colors cursor-pointer"
          >
            <span>View All</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Primary Featured Card: C++ Practice */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#e0e7fe] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle background ambient glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-[#ede9fe]/40 via-[#e0f2fe]/40 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="max-w-md space-y-2.5">
                {/* Top tags */}
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-[#eef2ff] text-[#4f46e5] flex items-center justify-center text-xs font-bold font-mono">&lt;/&gt;</span>
                  <span className="text-[11px] font-semibold text-[#4f46e5] bg-[#ede9fe] px-2.5 py-0.5 rounded-full">Practice</span>
                </div>
                {/* Title & Description */}
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">C++ Practice</h4>
                <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed font-medium">
                  Build your C++ skills with 201 carefully curated questions, from basics to advanced.
                </p>
              </div>

              {/* Mascot & Laptop mini illustration */}
              <div className="relative w-36 h-28 sm:w-44 sm:h-32 shrink-0 self-center sm:self-auto flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 160 115" xmlns="http://www.w3.org/2000/svg">
                  {/* Floating code bubble */}
                  <rect fill="#818cf8" fillOpacity="0.95" height="20" rx="6" width="28" x="16" y="14"></rect>
                  <text fill="#ffffff" fontFamily="monospace" fontSize="8.5" fontWeight="bold" textAnchor="middle" x="30" y="28">&lt;/&gt;</text>
                  {/* Mini star */}
                  <path d="M138 20L139 16L140 20L144 21L140 22L139 26L138 22L134 21Z" fill="#f59e0b"></path>
                  <circle cx="146" cy="42" fill="#93c5fd" r="2"></circle>
                  {/* Stacked Books */}
                  <rect fill="#38bdf8" height="8" rx="2" width="34" x="18" y="88"></rect>
                  <rect fill="#818cf8" height="8" rx="2" width="30" x="22" y="80"></rect>
                  <rect fill="#fbbf24" height="8" rx="2" width="32" x="20" y="72"></rect>
                  {/* Penguin Body Shadow */}
                  <ellipse cx="92" cy="102" fill="#000000" fillOpacity="0.06" rx="36" ry="6"></ellipse>
                  {/* Penguin Main Body */}
                  <ellipse cx="92" cy="66" fill="#1e293b" rx="26" ry="31"></ellipse>
                  {/* White Belly/Face Patch */}
                  <path d="M82 48C82 42 87 38 92 38C97 38 102 42 102 48C102 60 106 72 106 80C106 88 100 92 92 92C84 92 78 88 78 80C78 72 82 60 82 48Z" fill="#f8fafc"></path>
                  {/* Eyes */}
                  <circle cx="87" cy="50" fill="#0f172a" r="2.2"></circle>
                  <circle cx="97" cy="50" fill="#0f172a" r="2.2"></circle>
                  <circle cx="87.6" cy="49.2" fill="#ffffff" r="0.8"></circle>
                  <circle cx="97.6" cy="49.2" fill="#ffffff" r="0.8"></circle>
                  {/* Beak */}
                  <polygon fill="#f59e0b" points="92,54 89,58 95,58"></polygon>
                  {/* Flippers */}
                  <ellipse cx="68" cy="74" fill="#0f172a" rx="5.5" ry="13" transform="rotate(25 68 74)"></ellipse>
                  <ellipse cx="114" cy="72" fill="#0f172a" rx="5.5" ry="13" transform="rotate(-20 114 72)"></ellipse>
                  {/* Laptop */}
                  <path d="M58 64H88L92 90H54L58 64Z" fill="#475569" stroke="#334155" strokeWidth="1"></path>
                  <rect fill="#1e293b" height="18" rx="1.5" width="24" x="61" y="66"></rect>
                  <text fill="#93c5fd" fontFamily="monospace" fontSize="6.5" fontWeight="bold" textAnchor="middle" x="73" y="78">&lt;/&gt;</text>
                  <path d="M50 90H96L100 95H46L50 90Z" fill="#64748b"></path>
                  {/* Feet */}
                  <ellipse cx="97" cy="96" fill="#fbbf24" rx="7" ry="4"></ellipse>
                </svg>
              </div>
            </div>

            {/* Bottom Row: Metrics & Action Button */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* 201 Questions Badge */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>201 Questions</span>
                </div>
                {/* Difficulty Badge */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" x2="18" y1="20" y2="10"></line>
                    <line x1="12" x2="12" y1="20" y2="4"></line>
                    <line x1="6" x2="6" y1="20" y2="14"></line>
                  </svg>
                  <span>Beginner → Advanced Difficulty</span>
                </div>
                {/* Rating Badge */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#fefce8] border border-amber-200/70 text-xs font-bold text-[#b45309]">
                  <svg className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>4.5 Rating</span>
                </div>
              </div>
              {/* Circular Right Arrow CTA */}
              <button 
                onClick={onOpenPractice}
                className="w-10 h-10 rounded-full bg-[#eef2ff] hover:bg-[#e0e7fe] text-[#4f46e5] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#4f46e5] group-hover:text-white transition-all shadow-sm cursor-pointer" 
                title="Start C++ Practice"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Secondary Companion Practice Card: Python Mastery */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#fed7aa]/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-[#ffedd5]/60 to-transparent rounded-full blur-xl pointer-events-none"></div>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-[#fff7ed] text-[#ea580c] flex items-center justify-center text-xs font-bold font-mono">&lt;/&gt;</span>
                  <span className="text-[11px] font-semibold text-[#ea580c] bg-[#ffedd5] px-2.5 py-0.5 rounded-full">Track</span>
                </div>
                <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-full">Intermediate</span>
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0f172a] tracking-tight">Python Mastery</h4>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                  Master algorithms, OOP and fast prototyping with 180 hands-on Python challenges.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#334155]">
                <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>180 Questions</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#b45309] font-bold flex items-center">
                  <svg className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b] inline mr-0.5" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  4.8
                </span>
              </div>
              <button 
                onClick={onOpenPractice}
                className="w-9 h-9 rounded-full bg-[#fff7ed] hover:bg-[#fed7aa] text-[#ea580c] flex items-center justify-center group-hover:bg-[#ea580c] group-hover:text-white transition-all shadow-sm cursor-pointer" 
                title="Start Python Practice"
              >
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: PracticeTracksSection */}

      {/* BEGIN: OngoingContestsSection */}
      <section className="space-y-4" data-purpose="ongoing-contests">
        {/* Section Title with 'View All' */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#111827]">Ongoing Contests</h3>
          <button 
            onClick={onNavigateContests || onOpenPractice}
            className="text-xs font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center space-x-1 group transition-colors cursor-pointer"
          >
            <span>View All</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Horizontal 3-Card Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-purpose="contests-grid">
          {/* Contest Card 1: Codeforces */}
          <div className="interactive-card bg-white rounded-3xl p-6 sm:p-7 border border-[#e0e7fe] shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group bg-wave-purple">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-[#ede9fe]/50 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-[#deddff] text-[#4f46e5] flex items-center justify-center text-xs font-bold font-mono">&lt;/&gt;</span>
                  <span className="text-[11px] font-semibold text-[#4f46e5] bg-[#e6e5ff] px-2.5 py-0.5 rounded-full">Codeforces</span>
                </div>
                <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded-full">Medium</span>
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0f172a] tracking-tight">Weekly Challenge #12</h4>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed font-medium">
                  Global rating contest featuring 6 algorithmic problems across combinatorics and graphs.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>2h 34m left</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  <span>842 registered</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#fefce8] border border-amber-200/70 text-xs font-bold text-[#b45309]">
                  <svg className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Div. 2</span>
                </div>
              </div>
              <button 
                onClick={onOpenPractice}
                className="w-10 h-10 rounded-full bg-[#eef2ff] hover:bg-[#e0e7fe] text-[#4f46e5] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#4f46e5] group-hover:text-white transition-all shadow-sm shrink-0 cursor-pointer" 
                title="Join Contest"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Contest Card 2: LeetCode */}
          <div className="interactive-card bg-white rounded-3xl p-6 sm:p-7 border border-[#bbf7d0]/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group bg-wave-green">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-[#dcfce7]/50 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-xs font-bold font-mono">&lt;/&gt;</span>
                  <span className="text-[11px] font-semibold text-[#16a34a] bg-[#dcfce7] px-2.5 py-0.5 rounded-full">LeetCode</span>
                </div>
                <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-2.5 py-0.5 rounded-full">Easy</span>
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0f172a] tracking-tight">DSA Sprint</h4>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed font-medium">
                  Timed sprint session focusing on dynamic programming, two pointers, and binary trees.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>5h 12m left</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  <span>1.2k registered</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#fefce8] border border-amber-200/70 text-xs font-bold text-[#b45309]">
                  <svg className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>4.9 Rating</span>
                </div>
              </div>
              <button 
                onClick={onOpenPractice}
                className="w-10 h-10 rounded-full bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#16a34a] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#16a34a] group-hover:text-white transition-all shadow-sm shrink-0 cursor-pointer" 
                title="Join Contest"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Contest Card 3: CodeChef */}
          <div className="interactive-card bg-white rounded-3xl p-6 sm:p-7 border border-[#fed7aa]/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group bg-wave-orange">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-[#ffedd5]/50 to-transparent rounded-full blur-2xl pointer-events-none"></div>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-[#fff7ed] text-[#ea580c] flex items-center justify-center text-xs font-bold font-mono">&lt;/&gt;</span>
                  <span className="text-[11px] font-semibold text-[#ea580c] bg-[#ffedd5] px-2.5 py-0.5 rounded-full">CodeChef</span>
                </div>
                <span className="text-[10px] font-bold text-[#dc2626] bg-[#fee2e2] px-2.5 py-0.5 rounded-full">Hard</span>
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0f172a] tracking-tight">Algo Masters</h4>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed font-medium">
                  Competitive round testing complex greedy strategies, string algorithms, and segment trees.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>1d 3h left</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#f8fafc] border border-stone-200/60 text-xs font-semibold text-[#334155]">
                  <svg className="w-3.5 h-3.5 text-[#64748b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  <span>567 registered</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#fefce8] border border-amber-200/70 text-xs font-bold text-[#b45309]">
                  <svg className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Rated</span>
                </div>
              </div>
              <button 
                onClick={onOpenPractice}
                className="w-10 h-10 rounded-full bg-[#fff7ed] hover:bg-[#fed7aa] text-[#ea580c] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#ea580c] group-hover:text-white transition-all shadow-sm shrink-0 cursor-pointer" 
                title="Join Contest"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 24 24">
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: OngoingContestsSection */}

      {/* MODAL: Create Contest */}
      {createContestModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  &lt;/&gt;
                </span>
                <h3 className="font-extrabold text-lg text-slate-900">Create New Contest</h3>
              </div>
              <button 
                onClick={() => setCreateContestModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contest Title</label>
                <input
                  type="text"
                  value={contestName}
                  onChange={(e) => setContestName(e.target.value)}
                  placeholder="e.g. Dynamic Programming Blitz"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>3 Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Problems</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-amber-500 bg-white">
                    <option>4 Questions</option>
                    <option>6 Questions</option>
                    <option>8 Questions</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateContestModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Launch Contest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Join Contest */}
      {joinContestModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  ⚡
                </span>
                <h3 className="font-extrabold text-lg text-slate-900">Join a Contest</h3>
              </div>
              <button 
                onClick={() => setJoinContestModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contest Code or Link</label>
                <input
                  type="text"
                  value={contestCode}
                  onChange={(e) => setContestCode(e.target.value)}
                  placeholder="e.g. BERG-8291"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs text-slate-600 flex items-center gap-2">
                <span className="text-amber-500">💡</span>
                <span>Enter the PIN provided by your instructor or tournament organizer.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJoinContestModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Enter Arena
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
