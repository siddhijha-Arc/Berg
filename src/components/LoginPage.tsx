/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (provider?: string) => void;
  onBackToHome: () => void;
}

export function LoginPage({ onLoginSuccess, onBackToHome }: LoginPageProps) {
  const [currentMode, setCurrentMode] = useState<'login' | 'register' | 'cli'>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copiedCli, setCopiedCli] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('refero.design.team@gmail.com');
  const [password, setPassword] = useState<string>('BergMaster2025!');
  const [firstName, setFirstName] = useState<string>('Liam');
  const [lastName, setLastName] = useState<string>('Basil');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('berg auth login --device-sync');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 1500);
  };

  const handleGoogleLogin = () => {
    setToastMessage('Authenticating via Google...');
    onLoginSuccess('Google');
  };

  const handleGitHubLogin = () => {
    setToastMessage('Authenticating via GitHub...');
    onLoginSuccess('GitHub');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(currentMode === 'login' ? 'Signing in to Berg...' : 'Creating Berg account...');
    onLoginSuccess('Email');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#26251e] flex flex-col font-sans antialiased selection:bg-[#cdcdc9] selection:text-[#26251e] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#26251e] text-[#f7f7f4] px-4 py-3 rounded-[6px] text-xs font-mono shadow-xl flex items-center gap-2 border border-[#cdcdc9]/30 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#1f8a65] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Minimal Brand Header bar */}
      <header className="w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-[#cdcdc9] bg-[#f7f7f4] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBackToHome}>
          <div className="w-5 h-5 bg-[#26251e] flex items-center justify-center text-[#f7f7f4] text-[11px] font-mono leading-none font-bold rounded-[3px]">
            B
          </div>
          <span className="font-['EB_Garamond',serif] text-[24px] tracking-tight text-[#26251e] font-normal leading-tight">
            Berg
          </span>
          <span className="text-[11px] font-medium text-[#7a7974] px-1.5 py-0.5 bg-[#f2f1ed] border border-[#cdcdc9] ml-1 rounded-[3px]">
            v0.9.4
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-[#84847e] hidden sm:inline font-mono">Workspace Engine &amp; Compiler</span>
          <button 
            onClick={onBackToHome}
            className="text-[#84847e] hover:text-[#26251e] transition-colors flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-[4px] hover:bg-[#f2f1ed] border border-transparent hover:border-[#cdcdc9]"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to App</span>
          </button>
        </div>
      </header>

      {/* Main Canvas split layout */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Authentication Form */}
        <section className="lg:col-span-5 w-full max-w-[460px] mx-auto lg:mx-0 flex flex-col">
          {/* Flow Mode Switcher Tabs (Sign In / Register / CLI) */}
          <div className="flex items-center p-1 bg-[#f2f1ed] border border-[#cdcdc9] mb-6 max-w-fit rounded-[6px]">
            <button
              onClick={() => setCurrentMode('login')}
              type="button"
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium transition-all rounded-[4px] cursor-pointer ${
                currentMode === 'login'
                  ? 'bg-[#f7f7f4] text-[#26251e] shadow-xs border border-[#cdcdc9]'
                  : 'text-[#84847e] hover:text-[#26251e]'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setCurrentMode('register')}
              type="button"
              className={`px-4 py-2 text-xs sm:text-[13px] font-medium transition-all rounded-[4px] cursor-pointer ${
                currentMode === 'register'
                  ? 'bg-[#f7f7f4] text-[#26251e] shadow-xs border border-[#cdcdc9]'
                  : 'text-[#84847e] hover:text-[#26251e]'
              }`}
            >
              Create account
            </button>
            <button
              onClick={() => setCurrentMode('cli')}
              type="button"
              className={`px-4 py-2 text-xs sm:text-[12px] font-mono transition-all flex items-center gap-1 rounded-[4px] cursor-pointer ${
                currentMode === 'cli'
                  ? 'bg-[#f7f7f4] text-[#26251e] shadow-xs border border-[#cdcdc9]'
                  : 'text-[#84847e] hover:text-[#26251e]'
              }`}
            >
              <span className="text-[#f54e00] font-bold">$</span> cli
            </button>
          </div>

          {/* Header Typography */}
          <div className="mb-6">
            <h1 className="text-[28px] sm:text-[32px] font-normal tracking-[-0.015em] text-[#26251e] mb-2 font-sans">
              {currentMode === 'login' && 'Log in to your account'}
              {currentMode === 'register' && 'Create your account'}
              {currentMode === 'cli' && 'CLI Device Handshake'}
            </h1>
            <p className="font-['EB_Garamond',serif] text-[18px] sm:text-[20px] text-[#7a7974] leading-relaxed">
              {currentMode === 'login' && 'Enter your credentials to continue to your workspace.'}
              {currentMode === 'register' && 'Establish your authorship identity in the Berg collective.'}
              {currentMode === 'cli' && 'Authenticate terminal sessions and headless daemons securely.'}
            </p>
          </div>

          {/* Standard Form: Login & Register */}
          {currentMode !== 'cli' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields row (Visible only in register mode) */}
              {currentMode === 'register' && (
                <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a7974] mb-1.5">First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Liam"
                      required
                      className="w-full bg-[#f2f1ed] border border-[#cdcdc9] text-[#26251e] text-sm px-3.5 py-2.5 focus:border-[#26251e] focus:bg-[#f7f7f4] focus:outline-none transition-all rounded-[6px]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a7974] mb-1.5">Last name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Basil"
                      required
                      className="w-full bg-[#f2f1ed] border border-[#cdcdc9] text-[#26251e] text-sm px-3.5 py-2.5 focus:border-[#26251e] focus:bg-[#f7f7f4] focus:outline-none transition-all rounded-[6px]"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7a7974] mb-1.5">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="refero.design.team@gmail.com"
                    required
                    className="w-full bg-[#f2f1ed] border border-[#cdcdc9] text-[#26251e] text-sm font-mono px-3.5 py-2.5 focus:border-[#26251e] focus:bg-[#f7f7f4] focus:outline-none transition-all rounded-[6px] pr-10"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#84847e] pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#7a7974]">Password</label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to registered email address.')}
                    className="text-xs font-medium text-[#f54e00] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full bg-[#f2f1ed] border border-[#cdcdc9] text-[#26251e] text-sm font-mono px-3.5 py-2.5 focus:border-[#26251e] focus:bg-[#f7f7f4] focus:outline-none transition-all rounded-[6px] pr-10 ${
                      !showPassword ? 'tracking-widest' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#84847e] hover:text-[#26251e] transition-colors cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {currentMode === 'register' && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#1f8a65]">
                    <span className="w-2 h-2 rounded-full bg-[#1f8a65]"></span>
                    <span>Your password meets all security requirements.</span>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full bg-[#26251e] text-[#f7f7f4] hover:bg-[#34332b] text-sm font-medium py-3 px-4 transition-all flex items-center justify-center gap-2 rounded-[6px] cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>
                  {currentMode === 'login' ? 'Log in to Berg' : 'Complete registration'}
                </span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              {/* Hairline Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full border-t border-[#cdcdc9]"></div>
                <span className="absolute bg-[#f7f7f4] px-3 text-[11px] font-mono text-[#84847e] uppercase tracking-widest">
                  or continue with
                </span>
              </div>

              {/* Social Auth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* GOOGLE LOGIN BUTTON -> Instantly navigates to Home Screen */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2.5 bg-[#f2f1ed] hover:bg-[#e6e5e0] border border-[#cdcdc9] py-3 px-4 text-sm font-medium text-[#26251e] transition-all rounded-[6px] cursor-pointer group hover:border-[#a1a19f] shadow-2xs"
                  title="Sign in with Google"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                  </svg>
                  <span>Google</span>
                </button>

                {/* GITHUB LOGIN BUTTON */}
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="flex items-center justify-center gap-2.5 bg-[#f2f1ed] hover:bg-[#e6e5e0] border border-[#cdcdc9] py-3 px-4 text-sm font-medium text-[#26251e] transition-all rounded-[6px] cursor-pointer group hover:border-[#a1a19f] shadow-2xs"
                  title="Sign in with GitHub"
                >
                  <svg className="w-4 h-4 fill-[#26251e] shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </form>
          ) : (
            /* Terminal / CLI Auth Container */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-[#f2f1ed] border border-[#cdcdc9] p-5 text-left rounded-[6px]">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7a7974] pb-2.5 border-b border-[#cdcdc9] mb-3 font-mono">
                  <span>Terminal token handshake</span>
                  <span className="text-[#f54e00] font-semibold">PORT :4192</span>
                </div>
                <p className="text-xs font-mono text-[#84847e] mb-3">
                  Run this command from your terminal to link current machine:
                </p>
                <div className="bg-[#f7f7f4] border border-[#cdcdc9] p-3 font-mono text-xs text-[#26251e] flex items-center justify-between select-all rounded-[4px]">
                  <code>$ berg auth login --device-sync</code>
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="text-[#84847e] hover:text-[#26251e] text-xs font-mono cursor-pointer ml-2 px-2 py-1 rounded-[3px] bg-[#f2f1ed] border border-[#cdcdc9]"
                  >
                    {copiedCli ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentMode('login')}
                className="w-full text-xs font-medium text-[#84847e] hover:text-[#26251e] text-center py-2 transition-colors cursor-pointer"
              >
                ← Back to browser login
              </button>
            </div>
          )}

          {/* Legal / Switch Prompt Footer */}
          <div className="mt-8 pt-4 border-t border-[#cdcdc9] flex flex-col gap-2 text-xs font-medium text-[#84847e]">
            <div>
              <span>
                {currentMode === 'login' ? "Don't have an account?" : 'Have an account?'}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMode(currentMode === 'login' ? 'register' : 'login')}
                className="text-[#f54e00] hover:underline font-semibold ml-1 cursor-pointer"
              >
                {currentMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
            <p className="text-[#a1a19f] leading-relaxed">
              By continuing, you agree to Berg Press' <a className="underline hover:text-[#26251e]" href="#terms">Terms</a> and <a className="underline hover:text-[#26251e]" href="#privacy">Privacy Policy</a>.
            </p>
          </div>
        </section>

        {/* Right Column: Editorial Product Berg Window Mockup */}
        <section className="lg:col-span-7 w-full flex flex-col justify-center items-center py-4">
          {/* Elevated Bone Paper Card with Ambient Shadow */}
          <div className="w-full bg-[#f2f1ed] border border-[#cdcdc9] shadow-[0px_28px_70px_0px_rgba(0,0,0,0.14)] overflow-hidden max-w-[700px] rounded-[6px]">
            {/* macOS Window Title Bar Header */}
            <div className="px-4 py-2.5 bg-[#e6e5e0] border-b border-[#cdcdc9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#cdcdc9]"></span>
                <span className="w-3 h-3 rounded-full bg-[#cdcdc9]"></span>
                <span className="w-3 h-3 rounded-full bg-[#cdcdc9]"></span>
                <span className="ml-2 font-mono text-xs text-[#7a7974]">workshop/manuscript-agent.rs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono bg-[#f7f7f4] text-[#7a7974] border border-[#cdcdc9] rounded-[3px]">
                  UTF-8
                </span>
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono bg-[#f7f7f4] text-[#f54e00] border border-[#cdcdc9] rounded-[3px] font-semibold">
                  ● SYNCED
                </span>
              </div>
            </div>

            {/* Window Tab Strip */}
            <div className="flex border-b border-[#cdcdc9] bg-[#f2f1ed] text-xs font-mono">
              <div className="px-4 py-2 bg-[#f7f7f4] border-r border-[#cdcdc9] text-[#26251e] flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 bg-[#f54e00]"></span>
                <span>editor.berg</span>
              </div>
              <div className="px-4 py-2 text-[#84847e] hover:text-[#26251e] border-r border-[#cdcdc9] transition-colors flex items-center gap-2 cursor-pointer">
                <span>prose_evaluator.py</span>
              </div>
              <div className="px-4 py-2 text-[#84847e] hover:text-[#26251e] transition-colors flex items-center gap-2 cursor-pointer">
                <span>tokens.json</span>
              </div>
            </div>

            {/* Inner Content: Code / Composition Canvas with Editorial Geometry */}
            <div className="p-6 bg-[#f7f7f4] space-y-4">
              {/* Editorial Tag Badges Bento Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-3 bg-[#f2f1ed] border border-[#cdcdc9] rounded-[4px]">
                  <span className="text-[#84847e] block mb-1 text-[10px] font-semibold tracking-wider">01 / DISCIPLINE</span>
                  <span className="text-[#26251e] font-medium">1000x faster than raw manual typesetting</span>
                </div>
                <div className="p-3 bg-[#f2f1ed] border border-[#cdcdc9] rounded-[4px]">
                  <span className="text-[#84847e] block mb-1 text-[10px] font-semibold tracking-wider">02 / PROSE</span>
                  <span className="text-[#1f8a65] font-medium">Understands your cadence &amp; tone</span>
                </div>
                <div className="p-3 bg-[#f2f1ed] border border-[#cdcdc9] rounded-[4px]">
                  <span className="text-[#84847e] block mb-1 text-[10px] font-semibold tracking-wider">03 / PRINT</span>
                  <span className="text-[#a83300] font-medium">Compiles directly to bound editions</span>
                </div>
              </div>

              {/* Code Snippet / Intelligence Stream */}
              <div className="p-4 sm:p-5 bg-[#f2f1ed] border border-[#cdcdc9] font-mono text-xs sm:text-[13px] leading-relaxed text-[#26251e] space-y-2 rounded-[4px]">
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">01</span>
                  <div>
                    <span className="text-[#7a7974]">// Constructing literary berg agent session</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">02</span>
                  <div>
                    <span className="text-[#a83300] font-semibold">let</span> agent = Berg::bootstrap(&#123;
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">03</span>
                  <div className="pl-4">
                    workspace: <span className="text-[#1f8a65]">"Curated Philosophy Vol. IV"</span>,
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">04</span>
                  <div className="pl-4">
                    cadence: <span className="text-[#372000] font-medium">TypographicRestraint::Strict</span>,
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">05</span>
                  <div className="pl-4">
                    color_profile: <span className="text-[#1f8a65]">"ParchmentWarmIncandescent"</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">06</span>
                  <div>
                    &#125;).await?;
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-[#e6e5e0] -mx-4 sm:-mx-5 px-4 sm:px-5 py-1.5 border-l-2 border-[#f54e00]">
                  <span className="text-[#cdcdc9] select-none text-xs font-mono">07</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#f54e00] font-bold">›</span>
                    <span className="text-[#26251e]">agent.verify_identity(<span className="text-[#84847e]">"refero.design.team"</span>)</span>
                    <span className="inline-block animate-pulse w-1.5 h-3.5 bg-[#f54e00] ml-1"></span>
                  </div>
                </div>
              </div>

              {/* Editorial Quote & Fine Typography Footnote */}
              <div className="pt-3 border-t border-[#cdcdc9] flex items-center justify-between text-xs font-medium text-[#84847e]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#f54e00]">auto_awesome</span>
                  <span className="font-['EB_Garamond',serif] italic text-[15px] text-[#26251e]">
                    "Authority through typographic restraint &amp; negative space."
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#a1a19f]">LATENCY 14ms</span>
              </div>
            </div>

            {/* Terminal Status Bar */}
            <div className="px-4 py-2 bg-[#eeeeeb] border-t border-[#cdcdc9] flex items-center justify-between text-xs font-mono text-[#7a7974]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1f8a65]"></span>
                  <span>daemon active</span>
                </span>
                <span>branch: main</span>
              </div>
              <span>memory: 42.1MB</span>
            </div>
          </div>

          {/* Card caption */}
          <div className="mt-5 flex items-center gap-6 text-xs font-medium text-[#84847e]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">lock</span>
              <span>256-bit Hardware-bound sessions</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">terminal</span>
              <span>Cross-platform CLI sync</span>
            </span>
          </div>
        </section>
      </main>

      {/* Footer Component matching the specification */}
      <footer className="w-full px-4 sm:px-8 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[#7a7974] text-xs font-medium border-t border-[#cdcdc9] bg-[#f9f9f6] shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-['EB_Garamond',serif] text-[20px] text-[#11100a] font-normal leading-none">
            Berg
          </span>
          <span className="text-[#cdcdc9]">|</span>
          <span>© 2025 Berg Press &amp; Workshop. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a className="hover:text-[#11100a] transition-colors" href="#privacy">Privacy Policy</a>
          <a className="hover:text-[#11100a] transition-colors" href="#terms">Terms of Service</a>
          <a className="hover:text-[#11100a] transition-colors" href="#security">Security</a>
          <span className="flex items-center gap-1.5 text-[#1f8a65]">
            <span className="w-2 h-2 rounded-full bg-[#1f8a65]"></span>
            <span>System Status</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
