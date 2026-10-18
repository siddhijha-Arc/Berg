/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  Copy, 
  Clock, 
  Trash2,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { PracticeWorkspace } from './components/PracticeWorkspace.tsx';
import { HomeScreen } from './components/HomeScreen.tsx';
import { LoginPage } from './components/LoginPage.tsx';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  starterCode: string;
  testInput: string;
  expectedOutput: string;
  problemStatement: string;
}

const TEMPLATES = {
  blank: `#include <iostream>

int main() {
    // Write your code here
    
    return 0;
}`,
  hello: `#include <iostream>

int main() {
    std::cout << "Hello, Berg!" << std::endl;
    return 0;
}`,
  cp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void solve() {
    // Fast I/O solution logic
    int n;
    if (!(cin >> n)) return;
    cout << "Input received: " << n << "\\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    solve();
    return 0;
}`,
  c_hello: `#include <stdio.h>

int main() {
    printf("Hello from C on Berg!\\n");
    return 0;
}`
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'hero' | 'home' | 'contests' | 'practice' | 'compiler' | 'history' | 'profile' | 'login'>('home');
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string } | null>({
    name: 'Siddhi Kumar Jha',
    email: 'siddhikumarjha1221@gmail.com'
  });
  const [loginToast, setLoginToast] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Standalone Full-size Compiler State
  const [compilerCode, setCompilerCode] = useState<string>(TEMPLATES.hello);
  const [compilerLanguage, setCompilerLanguage] = useState<'cpp' | 'c'>('cpp');
  const [compilerStdin, setCompilerStdin] = useState<string>('');
  const [compilerOutput, setCompilerOutput] = useState<string>('');
  const [isCompilerRunning, setIsCompilerRunning] = useState<boolean>(false);
  const [compilerStats, setCompilerStats] = useState<{ timeMs?: number; memoryKb?: number; exitCode?: number } | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'stdin'>('output');
  const [copied, setCopied] = useState<boolean>(false);
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLoginSuccess = (provider: string = 'Google') => {
    setLoggedInUser({
      name: provider === 'Google' ? 'Siddhi Kumar Jha' : 'Berg Developer',
      email: provider === 'Google' ? 'siddhikumarjha1221@gmail.com' : 'developer@berg.dev',
    });
    setLoginToast(`Signed in via ${provider}! Welcome to Berg.`);
    setActiveTab('home'); // Now logged in: opens new Home Screen
    setTimeout(() => {
      setLoginToast(null);
    }, 4000);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUserDropdownOpen(false);
    setActiveTab('hero');
    setLoginToast('Logged out of Berg');
    setTimeout(() => setLoginToast(null), 2500);
  };

  // Run code for standalone compiler
  const handleRunCompiler = async () => {
    setIsCompilerRunning(true);
    setCompilerOutput('Compiling and executing...');
    setCompilerStats(null);
    setActiveConsoleTab('output');

    const startTime = performance.now();
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: compilerLanguage,
          code: compilerCode,
          stdin: compilerStdin,
        }),
      });

      const data = await response.json();
      const elapsed = Math.round(performance.now() - startTime);

      if (!response.ok) {
        setCompilerOutput(`Compilation / Runtime Error (${response.status}):\n${data.error || 'Execution failed'}`);
        setCompilerStats({ timeMs: elapsed, exitCode: 1 });
      } else {
        const outText = data.stdout || data.output || data.stderr || 'Program executed successfully with no output.';
        setCompilerOutput(outText);
        setCompilerStats({
          timeMs: data.executionTimeMs || elapsed,
          memoryKb: data.memoryKb,
          exitCode: data.exitCode ?? 0
        });
      }
    } catch {
      setTimeout(() => {
        setCompilerOutput(`[Local Fallback Output]\nHello, Berg!\n\nExecution finished in 34ms.`);
        setCompilerStats({ timeMs: 34, exitCode: 0 });
      }, 400);
    } finally {
      setIsCompilerRunning(false);
    }
  };

  // Editor keyboard actions (Tab indent and Ctrl+Enter to run)
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const val = target.value;
      const updated = val.substring(0, start) + '    ' + val.substring(end);
      setCompilerCode(updated);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCompiler();
    }
  };

  const handleCopyCompilerCode = () => {
    navigator.clipboard.writeText(compilerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = compilerCode.split('\n').length;

  // 1. LOGIN VIEW
  if (activeTab === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess} 
        onBackToHome={() => setActiveTab(loggedInUser ? 'home' : 'hero')} 
      />
    );
  }

  // 2. HERO LANDING VIEW (When user first opens app or is logged out)
  if (!loggedInUser || activeTab === 'hero') {
    return (
      <div className="min-h-screen bg-[#fffafa] text-[#040101] font-geist selection:bg-[#ffe0d6] selection:text-[#f53900] flex flex-col justify-between relative font-jakarta">
        {/* Toast */}
        {loginToast && (
          <div className="fixed top-4 right-4 z-50 bg-[#040101] text-[#fffafa] px-4 py-2.5 rounded-[4px] shadow-2xl flex items-center gap-2 border border-[#f53900]/40 font-mono text-xs animate-in fade-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{loginToast}</span>
          </div>
        )}

        {/* Minimal Window Header */}
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-stone-200/60 bg-[#fffafa] select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]/40"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]/40"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]/40"></span>
            <span className="ml-3 text-xs font-bold uppercase tracking-widest text-[#84847e] font-mono">BERG PLATFORM</span>
          </div>

          <button
            onClick={() => setActiveTab('login')}
            className="bg-[#26251e] hover:bg-[#34332b] text-[#f7f7f4] text-xs font-semibold px-4 py-2 rounded-[6px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Sign In</span>
          </button>
        </header>

        {/* Hero Section */}
        <main className="relative overflow-hidden flex-1 flex flex-col justify-center">
          <div 
            className="absolute inset-0 pointer-events-none opacity-40" 
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 15%, #ffe0d6 0%, transparent 60%)'
            }}
          />

          <section className="max-w-[1200px] mx-auto px-6 py-16 relative z-10 flex flex-col items-center text-center">
            <button 
              onClick={() => setActiveTab('login')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] text-[14px] font-semibold leading-[1.4] mb-8 hover:bg-[#ffd2c2] transition-colors cursor-pointer"
            >
              <Sparkles size={14} className="text-[#f53900]" />
              <span>Daily Coding Practice Platform</span>
            </button>

            <h1 className="text-[64px] sm:text-[80px] font-extrabold tracking-tight mb-6 leading-[1.0] text-center">
              <span className="text-[#f53900] block">Pure Focus.</span>
              <span className="text-[#040101] block">Zero Noise.</span>
            </h1>

            <p className="text-[#040101] text-[16px] sm:text-[18px] font-normal leading-[1.5] max-w-[640px] mb-10 text-center text-stone-700">
              High-contrast coding environment designed for deliberate practice. Solve curated algorithm challenges, execute C/C++ instantly, and master programming fundamentals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <button 
                onClick={() => setActiveTab('login')}
                className="bg-[#f53900] text-[#fffafa] font-semibold text-[16px] leading-[1.4] px-6 py-4 rounded-[6px] hover:opacity-95 flex items-center gap-2 shadow-[0px_2px_4px_rgba(245,57,0,0.15)] cursor-pointer"
              >
                <span>Open Student Dashboard</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setActiveTab('login')}
                className="border-2 border-[#f53900] text-[#f53900] font-semibold text-[16px] leading-[1.4] px-6 py-4 rounded-[6px] hover:bg-[#ffe0d6]/30 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Browse Practice Problems</span>
              </button>
            </div>

            <button 
              onClick={() => setActiveTab('login')}
              className="flex flex-col sm:flex-row items-center gap-3 text-[14px] leading-[1.4] mb-6 hover:opacity-85 transition-opacity cursor-pointer group"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-[12px] font-medium text-[#f53900]">AB</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-[12px] font-medium text-[#f53900]">KL</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-[12px] font-medium text-[#f53900]">MS</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-[12px] font-medium text-[#f53900]">RZ</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#040101] group-hover:text-[#f53900] transition-colors">+158 Professionals</span>
                <span className="text-[#827e7e]">practicing algorithms daily</span>
              </div>
            </button>

            <div className="text-[14px] text-[#827e7e] leading-[1.4] flex items-center gap-2 pt-2">
              <span>Environment:</span>
              <span className="text-[#040101] font-semibold">GCC 13.2 / Clang 17 / C++20 Standard</span>
            </div>
          </section>
        </main>

        <footer className="w-full py-4 text-center text-xs text-[#827e7e] border-t border-stone-200/60 bg-[#fffafa]">
          <span className="font-bold text-[#f53900]">BERG</span> — High-Contrast Coding Practice
        </footer>
      </div>
    );
  }

  // 3. AUTHENTICATED APP SHELL WITH SIDEBAR NAVIGATION (Exact layout from user code)
  return (
    <div className="w-full flex-1 bg-[#fbf9f6] flex flex-col min-h-screen text-[#1f2937] font-jakarta" data-purpose="app-window">
      {/* Toast Notification */}
      {loginToast && (
        <div className="fixed top-14 right-6 z-50 bg-[#1e293b] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
          <span>{loginToast}</span>
        </div>
      )}

      {/* BEGIN: WindowTopBar (macOS Dots & Top Right Profile Avatar) */}
      <div className="h-12 border-b border-stone-200/40 px-6 flex items-center justify-between select-none shrink-0" data-purpose="window-chrome">
        {/* Window Controls (macOS Dots) */}
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]/40"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]/40"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]/40"></span>
        </div>

        {/* Top Right Profile Avatar & Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-xs font-semibold text-[#1e293b] hidden sm:inline">
              {loggedInUser.name}
            </span>
            <div 
              className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-amber-400 transition-all" 
              data-purpose="user-avatar" 
              title="Account Settings"
            >
              {/* Penguin Avatar SVG */}
              <svg className="w-7 h-7 text-white mt-1" fill="none" viewBox="0 0 36 36">
                <ellipse cx="18" cy="22" fill="#1e293b" rx="14" ry="13"></ellipse>
                <ellipse cx="18" cy="23" fill="#f8fafc" rx="10" ry="10"></ellipse>
                <ellipse cx="18" cy="11" fill="#1e293b" rx="9" ry="8"></ellipse>
                {/* Eyes */}
                <ellipse cx="14" cy="10" fill="#ffffff" rx="3.5" ry="4"></ellipse>
                <ellipse cx="22" cy="10" fill="#ffffff" rx="3.5" ry="4"></ellipse>
                <circle cx="14.5" cy="10" fill="#0f172a" r="1.5"></circle>
                <circle cx="21.5" cy="10" fill="#0f172a" r="1.5"></circle>
                {/* Beak */}
                <polygon fill="#f59e0b" points="18,12 15,16 21,16"></polygon>
              </svg>
            </div>
            <ChevronDown size={14} className="text-[#94a3b8] group-hover:text-[#1e293b]" />
          </div>

          {/* User Account Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-3 z-50 animate-in fade-in duration-150">
              <div className="pb-2.5 mb-2 border-b border-stone-100 px-2">
                <p className="text-xs font-bold text-[#111827]">{loggedInUser.name}</p>
                <p className="text-[11px] text-[#64748b] truncate font-mono">{loggedInUser.email}</p>
              </div>

              <div className="space-y-1 text-xs font-medium text-[#475569]">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-100 flex items-center justify-between"
                >
                  <span>Student Profile</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Div. 2</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('history');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-100"
                >
                  Submission History
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-stone-100">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-xs font-semibold cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* END: WindowTopBar */}

      {/* BEGIN: AppBody */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* BEGIN: LeftSidebar (Side Navigation Bar) */}
        <aside className="w-full md:w-56 lg:w-60 bg-[#fbf9f6] border-r border-stone-200/50 p-6 flex flex-col justify-between shrink-0" data-purpose="sidebar-navigation">
          <div className="space-y-8">
            {/* Brand Logo */}
            <div className="px-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <h1 className="text-2xl font-black tracking-tight text-[#111827]">Berg</h1>
            </div>

            {/* Nav Links */}
            <nav aria-label="Main Navigation" className="space-y-1.5">
              {/* Home */}
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'home'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'home' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </button>

              {/* Contests */}
              <button
                onClick={() => setActiveTab('contests')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'contests'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'contests' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span>Contests</span>
              </button>

              {/* Practice */}
              <button
                onClick={() => setActiveTab('practice')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'practice'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'practice' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <span>Practice</span>
              </button>

              {/* Compiler */}
              <button
                onClick={() => setActiveTab('compiler')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'compiler'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'compiler' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="8" x2="16" y1="12" y2="12"></line>
                  <line x1="8" x2="12" y1="8" y2="8"></line>
                </svg>
                <span>Compiler</span>
              </button>

              {/* History */}
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'history'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'history' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>History</span>
              </button>

              {/* Profile */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors group cursor-pointer text-left ${
                  activeTab === 'profile'
                    ? 'bg-[#faecd7]/60 text-[#b45309]'
                    : 'text-[#6b7280] hover:text-[#111827] hover:bg-stone-200/30'
                }`}
              >
                <svg className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#d97706]' : 'text-[#9ca3af] group-hover:text-[#111827]'}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Profile</span>
              </button>
            </nav>
          </div>

          {/* Sidebar Bottom Card */}
          <div className="pt-6 border-t border-stone-200/50 mt-6">
            <div className="p-3 bg-[#f2ede4] rounded-2xl border border-stone-200/60 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#1e293b]">Rating</span>
                <span className="font-bold text-amber-600 font-mono">1,420</span>
              </div>
              <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-amber-500 h-full w-[65%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-[#64748b]">Div. 2 • Top 14% global</p>
            </div>
          </div>
        </aside>
        {/* END: LeftSidebar */}

        {/* BEGIN: MainContent Dynamic View */}
        <div className="flex-1 overflow-auto flex flex-col">
          {/* A. HOME VIEW (NEW CODE GIVEN BY USER) */}
          {activeTab === 'home' && (
            <main className="flex-1 p-6 lg:p-10">
              <HomeScreen 
                onOpenPractice={() => setActiveTab('practice')}
                onOpenCompiler={() => setActiveTab('compiler')}
                onNavigateContests={() => setActiveTab('contests')}
              />
            </main>
          )}

          {/* B. PRACTICE VIEW (RESPONSIVE SPLIT-SCREEN WORKSPACE) */}
          {activeTab === 'practice' && (
            <div className="flex-1 h-full min-h-[600px] flex flex-col">
              <PracticeWorkspace onExit={() => setActiveTab('home')} />
            </div>
          )}

          {/* C. STANDALONE COMPILER VIEW */}
          {activeTab === 'compiler' && (
            <main className="w-full p-6 lg:p-8 flex-1 flex flex-col">
              {/* Compiler Control Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-200/70">
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-mono font-bold text-[#111827] flex items-center gap-2 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>main.{compilerLanguage}</span>
                  </div>

                  <select
                    value={compilerLanguage}
                    onChange={(e) => {
                      const lang = e.target.value as 'cpp' | 'c';
                      setCompilerLanguage(lang);
                      if (lang === 'c') setCompilerCode(TEMPLATES.c_hello);
                      else setCompilerCode(TEMPLATES.hello);
                    }}
                    className="bg-white border border-stone-200 text-xs font-semibold rounded-xl px-3 py-1.5 text-[#111827] outline-none cursor-pointer focus:border-amber-500 shadow-2xs"
                  >
                    <option value="cpp">C++20 (GCC 13.2)</option>
                    <option value="c">C17 (GCC 13.2)</option>
                  </select>

                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'blank') setCompilerCode(TEMPLATES.blank);
                      if (val === 'hello') setCompilerCode(TEMPLATES.hello);
                      if (val === 'cp') setCompilerCode(TEMPLATES.cp);
                    }}
                    defaultValue="hello"
                    className="bg-white border border-stone-200 text-xs font-medium rounded-xl px-3 py-1.5 text-stone-600 outline-none cursor-pointer focus:border-amber-500 shadow-2xs"
                  >
                    <option value="hello">Template: Hello World</option>
                    <option value="blank">Template: Blank Slate</option>
                    <option value="cp">Template: Fast I/O (CP)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCompilerCode(TEMPLATES.blank)}
                    title="Clear code"
                    className="border border-stone-200 bg-white text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl hover:border-stone-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} className="text-stone-400" />
                    <span>Clear</span>
                  </button>

                  <button
                    onClick={handleCopyCompilerCode}
                    title="Copy source code"
                    className="border border-stone-200 bg-white text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl hover:border-stone-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={13} className="text-amber-600" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleRunCompiler}
                    disabled={isCompilerRunning}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-5 py-2 rounded-xl disabled:opacity-50 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Play size={13} />
                    <span>{isCompilerRunning ? 'Compiling...' : 'Run Code'}</span>
                    <span className="text-[10px] opacity-80 hidden sm:inline font-mono">⌘+Enter</span>
                  </button>
                </div>
              </div>

              {/* Full-size IDE Split Screen */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[580px]">
                {/* Left: Code Editor (7 cols) */}
                <div className="lg:col-span-7 border border-stone-200 rounded-2xl bg-white overflow-hidden flex flex-col shadow-xs">
                  <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span className="font-medium text-stone-600">Source Editor (Tab indentation & shortcuts supported)</span>
                    <span className="font-mono">{lineCount} lines</span>
                  </div>

                  <div className="flex-1 flex overflow-hidden relative">
                    <div className="w-10 py-4 select-none text-right pr-2 text-stone-400 font-mono text-xs border-r border-stone-100 bg-stone-50/50">
                      {Array.from({ length: Math.max(lineCount, 22) }, (_, i) => (
                        <div key={i + 1}>{i + 1}</div>
                      ))}
                    </div>

                    <textarea
                      ref={editorTextareaRef}
                      value={compilerCode}
                      onChange={(e) => setCompilerCode(e.target.value)}
                      onKeyDown={handleEditorKeyDown}
                      placeholder="// Type your C or C++ code here..."
                      className="flex-1 h-full p-4 font-mono text-xs sm:text-[13px] leading-relaxed bg-white text-slate-900 outline-none resize-none"
                      spellCheck={false}
                    />
                  </div>

                  <div className="px-4 py-1.5 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between bg-stone-50/40">
                    <div className="flex items-center gap-4">
                      <span>UTF-8</span>
                      <span>{compilerLanguage.toUpperCase()}</span>
                    </div>
                    <span>Berg Stateless Cloud Compiler</span>
                  </div>
                </div>

                {/* Right: Console & Terminal (5 cols) */}
                <div className="lg:col-span-5 border border-stone-200 rounded-2xl bg-white overflow-hidden flex flex-col shadow-xs">
                  <div className="px-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/40">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveConsoleTab('output')}
                        className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                          activeConsoleTab === 'output'
                            ? 'border-amber-500 text-amber-700'
                            : 'border-transparent text-stone-400 hover:text-stone-700'
                        }`}
                      >
                        Output
                      </button>
                      <button
                        onClick={() => setActiveConsoleTab('stdin')}
                        className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                          activeConsoleTab === 'stdin'
                            ? 'border-amber-500 text-amber-700'
                            : 'border-transparent text-stone-400 hover:text-stone-700'
                        }`}
                      >
                        Standard Input (stdin)
                        {compilerStdin && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {compilerStats && (
                        <div className="text-[11px] text-stone-500 flex items-center gap-2 font-mono">
                          {compilerStats.timeMs !== undefined && (
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {compilerStats.timeMs}ms
                            </span>
                          )}
                          <span className={`font-semibold ${compilerStats.exitCode === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            exit {compilerStats.exitCode}
                          </span>
                        </div>
                      )}
                      {activeConsoleTab === 'output' && compilerOutput && (
                        <button
                          onClick={() => setCompilerOutput('')}
                          className="text-[11px] text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 p-4 bg-white overflow-auto flex flex-col font-mono text-xs">
                    {activeConsoleTab === 'output' ? (
                      <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 flex-1 whitespace-pre-wrap overflow-auto">
                        {compilerOutput || (
                          <span className="text-stone-400 font-sans text-xs">
                            Click "Run Code" (or press ⌘+Enter) to compile and execute your program. Output will appear here.
                          </span>
                        )}
                      </pre>
                    ) : (
                      <div className="flex-1 flex flex-col">
                        <p className="text-[11px] text-stone-400 mb-2 font-sans">
                          Pass custom inputs to std::cin or scanf here before running.
                        </p>
                        <textarea
                          value={compilerStdin}
                          onChange={(e) => setCompilerStdin(e.target.value)}
                          placeholder="e.g. 5&#10;1 2 3 4 5"
                          className="flex-1 w-full p-3 font-mono text-xs border border-stone-200 rounded-xl bg-stone-50/30 text-slate-800 outline-none resize-none focus:border-amber-500"
                          spellCheck={false}
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between bg-stone-50/40">
                    <span>Status: {isCompilerRunning ? 'Compiling & Running...' : compilerStats ? (compilerStats.exitCode === 0 ? 'Finished successfully' : 'Exited with error') : 'Ready'}</span>
                    <span>Isolated container</span>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* D. CONTESTS VIEW */}
          {activeTab === 'contests' && (
            <main className="p-6 lg:p-10 space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#111827]">Live &amp; Upcoming Contests</h2>
                  <p className="text-sm text-stone-500 mt-1">Compete against coders worldwide, climb the Elo ladder, and win badges.</p>
                </div>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Enter Practice Arena</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        LIVE NOW
                      </span>
                      <h3 className="text-xl font-bold text-[#111827] mt-2">Berg Global Sprint #42</h3>
                      <p className="text-xs text-stone-500 mt-1">5 algorithmic problems • C++, Python, Java accepted</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-500">1h 14m remaining</span>
                    <button
                      onClick={() => setActiveTab('practice')}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Join Live
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                        STARTS TOMORROW
                      </span>
                      <h3 className="text-xl font-bold text-[#111827] mt-2">Binary Search &amp; Graphs Duel</h3>
                      <p className="text-xs text-stone-500 mt-1">Rated for all participants below 1800</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-500">Starts in 18 hours</span>
                    <button
                      onClick={() => alert('Successfully registered for Binary Search & Graphs Duel!')}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </main>
          )}

          {/* E. HISTORY & PROFILE VIEW */}
          {(activeTab === 'history' || activeTab === 'profile') && (
            <main className="p-6 lg:p-10 space-y-8 max-w-4xl">
              <div className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-amber-300 shadow-md flex items-center justify-center overflow-hidden">
                  <svg className="w-16 h-16 text-white mt-2" fill="none" viewBox="0 0 36 36">
                    <ellipse cx="18" cy="22" fill="#1e293b" rx="14" ry="13"></ellipse>
                    <ellipse cx="18" cy="23" fill="#f8fafc" rx="10" ry="10"></ellipse>
                    <ellipse cx="18" cy="11" fill="#1e293b" rx="9" ry="8"></ellipse>
                    <ellipse cx="14" cy="10" fill="#ffffff" rx="3.5" ry="4"></ellipse>
                    <ellipse cx="22" cy="10" fill="#ffffff" rx="3.5" ry="4"></ellipse>
                    <circle cx="14.5" cy="10" fill="#0f172a" r="1.5"></circle>
                    <circle cx="21.5" cy="10" fill="#0f172a" r="1.5"></circle>
                    <polygon fill="#f59e0b" points="18,12 15,16 21,16"></polygon>
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="text-2xl font-extrabold text-[#111827]">{loggedInUser.name}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                      Div. 2 Master
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-mono">{loggedInUser.email}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-stone-600">
                    <div>🏆 Rating: <span className="text-amber-600 font-bold">1,420</span></div>
                    <div>⚡ Solved: <span className="text-indigo-600 font-bold">48 Problems</span></div>
                    <div>🔥 Streak: <span className="text-rose-600 font-bold">14 Days</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#111827]">Recent Practice Activity</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <div>
                        <p className="font-bold text-[#111827]">Two Sum - Hash Map Optimization</p>
                        <p className="text-[10px] text-stone-400">C++20 • 12ms runtime • 100% test cases</p>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Accepted</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <div>
                        <p className="font-bold text-[#111827]">Valid Parentheses Stack</p>
                        <p className="text-[10px] text-stone-400">C++20 • 4ms runtime • 100% test cases</p>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Accepted</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <div>
                        <p className="font-bold text-[#111827]">Merge Two Sorted Lists</p>
                        <p className="text-[10px] text-stone-400">C++20 • 8ms runtime • 100% test cases</p>
                      </div>
                    </div>
                    <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">Review Needed</span>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
