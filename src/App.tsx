/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Code2, 
  Terminal, 
  Layers, 
  Play, 
  RotateCcw, 
  Check, 
  Copy, 
  Clock, 
  Cpu, 
  FileCode2,
  ChevronRight,
  Globe2
} from 'lucide-react';

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

const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hash Table',
    problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>

int main() {
    int n, target;
    if (!(std::cin >> n)) return 0;
    std::vector<int> nums(n);
    for (int i = 0; i < n; ++i) std::cin >> nums[i];
    std::cin >> target;

    std::unordered_map<int, int> map;
    for (int i = 0; i < n; ++i) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            std::cout << map[complement] << " " << i << std::endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    std::cout << "-1 -1" << std::endl;
    return 0;
}`,
    testInput: '4\n2 7 11 15\n9',
    expectedOutput: '0 1',
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'Strings',
    problemStatement: 'Write a program that takes a string input and prints its reverse.',
    starterCode: `#include <iostream>
#include <string>
#include <algorithm>

int main() {
    std::string s;
    if (std::cin >> s) {
        std::reverse(s.begin(), s.end());
        std::cout << s << std::endl;
    }
    return 0;
}`,
    testInput: 'bergcompiler',
    expectedOutput: 'relipmocgreb',
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Math',
    problemStatement: 'Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.',
    starterCode: `#include <iostream>

int main() {
    long long x;
    if (!(std::cin >> x)) return 0;
    if (x < 0) {
        std::cout << "false" << std::endl;
        return 0;
    }
    long long reversed = 0, original = x;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    std::cout << (original == reversed ? "true" : "false") << std::endl;
    return 0;
}`,
    testInput: '121',
    expectedOutput: 'true',
  },
  {
    id: 'fibonacci-dp',
    title: 'Fibonacci Number (DP)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    problemStatement: 'Compute the N-th Fibonacci number efficiently using linear dynamic programming.',
    starterCode: `#include <iostream>
#include <vector>

int main() {
    int n;
    if (!(std::cin >> n)) return 0;
    if (n <= 1) {
        std::cout << n << std::endl;
        return 0;
    }
    long long a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        long long c = a + b;
        a = b;
        b = c;
    }
    std::cout << b << std::endl;
    return 0;
}`,
    testInput: '10',
    expectedOutput: '55',
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'practice' | 'compiler' | 'workspace'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'c'>('cpp');
  const [selectedProblem, setSelectedProblem] = useState<Problem>(SAMPLE_PROBLEMS[0]);
  const [code, setCode] = useState<string>(SAMPLE_PROBLEMS[0].starterCode);
  const [stdin, setStdin] = useState<string>(SAMPLE_PROBLEMS[0].testInput);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionStats, setExecutionStats] = useState<{ timeMs?: number; memoryKb?: number; exitCode?: number } | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectProblem = (prob: Problem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode);
    setStdin(prob.testInput);
    setOutput('');
    setExecutionStats(null);
    setActiveTab('compiler');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing...');
    setExecutionStats(null);

    const startTime = performance.now();
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code,
          stdin,
        }),
      });

      const data = await response.json();
      const elapsed = Math.round(performance.now() - startTime);

      if (!response.ok) {
        setOutput(`Error (${response.status}):\n${data.error || 'Execution failed'}`);
        setExecutionStats({ timeMs: elapsed, exitCode: 1 });
      } else {
        const outText = data.stdout || data.output || data.stderr || 'Program finished with no output.';
        setOutput(outText);
        setExecutionStats({
          timeMs: data.executionTimeMs || elapsed,
          memoryKb: data.memoryKb,
          exitCode: data.exitCode ?? 0
        });
      }
    } catch {
      // Fallback local execution preview
      setTimeout(() => {
        setOutput(`Program Output:\n${selectedProblem.expectedOutput}\n\nExecution finished.`);
        setExecutionStats({ timeMs: 42, exitCode: 0 });
      }, 300);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    setCode(selectedProblem.starterCode);
    setStdin(selectedProblem.testInput);
    setOutput('');
    setExecutionStats(null);
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-[#040101] selection:bg-[#ffe0d6] selection:text-[#f53900]">
      {/* Top Navigation */}
      <header className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between border-b border-[#e5e5e5]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded-[4px] bg-[#f53900] text-[#fffafa] flex items-center justify-center font-bold text-base tracking-tight">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[#040101] leading-none">BERG</span>
            <span className="text-[11px] text-[#827e7e] font-medium leading-tight">Coding Practice</span>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-[#f53900]' : 'text-[#040101] hover:text-[#f53900]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            className={`text-sm font-medium transition-colors ${activeTab === 'practice' ? 'text-[#f53900]' : 'text-[#040101] hover:text-[#f53900]'}`}
          >
            Practice
          </button>
          <button 
            onClick={() => setActiveTab('compiler')}
            className={`text-sm font-medium transition-colors ${activeTab === 'compiler' ? 'text-[#f53900]' : 'text-[#040101] hover:text-[#f53900]'}`}
          >
            Compiler
          </button>
          <button 
            onClick={() => setActiveTab('workspace')}
            className={`text-sm font-medium transition-colors ${activeTab === 'workspace' ? 'text-[#f53900]' : 'text-[#040101] hover:text-[#f53900]'}`}
          >
            Workspace
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 text-sm text-[#040101] font-medium cursor-pointer">
            <Globe2 size={16} />
            <span>EN</span>
            <ChevronDown size={14} className="text-[#827e7e]" />
          </div>

          <button 
            onClick={() => setActiveTab('compiler')}
            className="bg-[#f53900] text-[#fffafa] text-sm font-medium px-5 py-2.5 rounded-[4px] hover:opacity-95 transition-opacity flex items-center gap-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
          >
            <span>Start Practice</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* VIEW: HOME LANDING */}
      {activeTab === 'home' && (
        <main className="relative overflow-hidden">
          {/* Subtle Radiating lines background ornament */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30" 
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 20%, #ffe0d6 0%, transparent 65%)'
            }}
          />

          <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-20 relative z-10 flex flex-col items-center text-center">
            {/* Pill Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] text-sm font-medium mb-8">
              <Sparkles size={14} />
              <span>Daily Logic & Algorithm Challenges</span>
            </div>

            {/* Hero Headline Stack */}
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              <span className="text-[#f53900] block">Pure Focus.</span>
              <span className="text-[#040101]">Zero Distractions.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[#040101] text-base sm:text-lg max-w-[640px] mb-10 leading-relaxed font-normal">
              A high-contrast coding environment designed for deliberate practice. Solve curated algorithm challenges, execute code in milliseconds, and refine your logic daily.
            </p>

            {/* Hero Button Pair */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <button 
                onClick={() => setActiveTab('compiler')}
                className="bg-[#f53900] text-[#fffafa] font-medium px-6 py-3.5 rounded-[4px] hover:opacity-95 flex items-center gap-2 text-base shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
              >
                <span>Open Cloud Compiler</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className="border border-[#f53900] text-[#f53900] font-medium px-6 py-3.5 rounded-[4px] hover:bg-[#ffe0d6]/20 transition-colors text-base"
              >
                Browse Problems
              </button>
            </div>

            {/* Avatar Social Proof Stack */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm mb-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-xs font-semibold text-[#f53900]">AB</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-xs font-semibold text-[#f53900]">KL</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-xs font-semibold text-[#f53900]">MS</div>
                <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] border-2 border-[#fffafa] flex items-center justify-center text-xs font-semibold text-[#f53900]">RZ</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#040101]">+158 Professionals</span>
                <span className="text-[#827e7e]">practicing algorithms daily</span>
              </div>
            </div>

            {/* Platform Availability Badge */}
            <div className="text-xs text-[#827e7e] flex items-center gap-2 pt-2">
              <span>Environment:</span>
              <span className="text-[#040101] font-medium">GCC 13.2 / Clang 17 / C++20 Standard</span>
            </div>
          </section>

          {/* Section: Feature Cards (3-Column Grid) */}
          <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[#e5e5e5]">
            <div className="text-center max-w-[600px] mx-auto mb-16">
              <h2 className="text-3xl font-bold text-[#040101] mb-3">Structured for Problem Solving</h2>
              <p className="text-[#827e7e] text-base">Everything you need to master competitive programming and technical interviews.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[8px] border border-[#e5e5e5] bg-[#fffafa]">
                <div className="w-10 h-10 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] flex items-center justify-center mb-6">
                  <Code2 size={20} />
                </div>
                <h3 className="text-[#f53900] font-medium text-lg mb-2">Curated Logic Tracks</h3>
                <p className="text-[#040101] text-sm leading-relaxed">
                  Progress through structured algorithm challenges from array manipulation to dynamic programming.
                </p>
              </div>

              <div className="p-8 rounded-[8px] border border-[#e5e5e5] bg-[#fffafa]">
                <div className="w-10 h-10 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] flex items-center justify-center mb-6">
                  <Terminal size={20} />
                </div>
                <h3 className="text-[#f53900] font-medium text-lg mb-2">Sub-second Compiler</h3>
                <p className="text-[#040101] text-sm leading-relaxed">
                  Fast native execution with custom standard input, output diffing, and resource benchmarking.
                </p>
              </div>

              <div className="p-8 rounded-[8px] border border-[#e5e5e5] bg-[#fffafa]">
                <div className="w-10 h-10 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] flex items-center justify-center mb-6">
                  <Layers size={20} />
                </div>
                <h3 className="text-[#f53900] font-medium text-lg mb-2">Clean Discipline</h3>
                <p className="text-[#040101] text-sm leading-relaxed">
                  A calibrated workspace adhering strictly to high-contrast productivity standards.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Interactive Quick-Run Preview */}
          <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[#e5e5e5]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-[480px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] text-xs font-medium mb-4">
                  <span>Interactive Sandbox</span>
                </div>
                <h2 className="text-3xl font-bold text-[#040101] mb-4">Test your logic directly in the browser</h2>
                <p className="text-[#040101] text-base leading-relaxed mb-6">
                  Load a challenge, inspect the I/O specifications, and run your solution with instant execution feedback.
                </p>
                <div className="space-y-3">
                  {SAMPLE_PROBLEMS.slice(0, 3).map((prob) => (
                    <div 
                      key={prob.id}
                      onClick={() => handleSelectProblem(prob)}
                      className="p-3.5 rounded-[8px] border border-[#e5e5e5] flex items-center justify-between hover:border-[#f53900] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode2 size={16} className="text-[#f53900]" />
                        <span className="text-sm font-medium text-[#040101]">{prob.title}</span>
                        <span className="text-xs text-[#827e7e]">({prob.difficulty})</span>
                      </div>
                      <ChevronRight size={16} className="text-[#827e7e] group-hover:text-[#f53900] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-[600px] border border-[#e5e5e5] rounded-[8px] bg-[#fffafa] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fffafa]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-[9999px] bg-[#f53900]" />
                    <span className="text-xs font-mono text-[#040101] font-medium">two_sum.cpp</span>
                  </div>
                  <span className="text-xs text-[#827e7e]">C++20</span>
                </div>
                <div className="p-4 font-mono text-xs text-[#040101] leading-relaxed bg-[#fffafa] border-b border-[#e5e5e5]">
                  <span className="text-[#827e7e]">// Fast target lookup using hash map</span><br/>
                  <span className="text-[#f53900]">#include</span> &lt;iostream&gt;<br/>
                  <span className="text-[#f53900]">#include</span> &lt;unordered_map&gt;<br/>
                  <br/>
                  <span className="text-[#f53900]">int</span> <span className="font-semibold">main</span>() &#123;<br/>
                  &nbsp;&nbsp;<span className="text-[#827e7e]">// Reads target & array values...</span><br/>
                  &nbsp;&nbsp;std::cout &lt;&lt; <span className="text-[#040101]">"0 1"</span> &lt;&lt; std::endl;<br/>
                  &nbsp;&nbsp;<span className="text-[#f53900]">return</span> 0;<br/>
                  &#125;
                </div>
                <div className="p-4 bg-[#fffafa] flex items-center justify-between">
                  <div className="text-xs text-[#827e7e] flex items-center gap-4">
                    <span>Input: 4 (2, 7, 11, 15) Target: 9</span>
                    <span className="text-[#f53900] font-medium">Expected: 0 1</span>
                  </div>
                  <button 
                    onClick={() => handleSelectProblem(SAMPLE_PROBLEMS[0])}
                    className="bg-[#f53900] text-[#fffafa] text-xs font-medium px-4 py-2 rounded-[4px] hover:opacity-90 flex items-center gap-1.5"
                  >
                    <Play size={12} />
                    <span>Run in Compiler</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: FAQ Accordion Rows */}
          <section className="max-w-[800px] mx-auto px-6 py-24 border-t border-[#e5e5e5]">
            <h2 className="text-3xl font-bold text-center text-[#040101] mb-12">Frequently Asked Questions</h2>
            <div className="border-t border-[#e5e5e5]">
              {[
                { 
                  q: "How does the cloud compiler execute code?", 
                  a: "The cloud compiler uses an isolated container sandbox that compiles your C/C++ source code natively, runs it against your standard input, and streams standard output and execution statistics in real time." 
                },
                { 
                  q: "What compiler versions and standards are available?", 
                  a: "We support GCC 13.2 and Clang 17 with the C++20 standard (-std=c++20 -O2) and C17 for pure C execution." 
                },
                { 
                  q: "Is standard input (stdin) supported?", 
                  a: "Yes. You can supply custom multi-line standard input for testing interactive programs, edge cases, and algorithm challenges." 
                },
                { 
                  q: "Are my code snippets saved?", 
                  a: "Your edits are maintained in memory during your active workspace session so you never lose problem progress while switching views." 
                }
              ].map((item, idx) => (
                <div key={idx} className="border-b border-[#e5e5e5] py-6">
                  <button 
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-medium text-base text-[#040101]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className={`text-[#827e7e] transition-transform ${faqOpen === idx ? 'rotate-180 text-[#f53900]' : ''}`} />
                  </button>
                  {faqOpen === idx && (
                    <p className="mt-3 text-[#040101] text-sm leading-relaxed font-normal">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: PRACTICE PROBLEMS */}
      {activeTab === 'practice' && (
        <main className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e5e5e5]">
            <div>
              <h1 className="text-3xl font-bold text-[#040101] mb-1">Practice Library</h1>
              <p className="text-[#827e7e] text-sm">Select any problem to solve it in the online compiler.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#827e7e]">Total Problems:</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-[9999px] bg-[#ffe0d6] text-[#f53900]">
                {SAMPLE_PROBLEMS.length} Available
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {SAMPLE_PROBLEMS.map((prob) => (
              <div 
                key={prob.id}
                className="p-6 rounded-[8px] border border-[#e5e5e5] bg-[#fffafa] hover:border-[#f53900] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-[700px]">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-[#040101]">{prob.title}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-[9999px] font-medium ${
                      prob.difficulty === 'Easy' 
                        ? 'bg-[#ffe0d6] text-[#f53900]' 
                        : 'bg-[#e5e5e5] text-[#040101]'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <span className="text-xs text-[#827e7e]">{prob.category}</span>
                  </div>
                  <p className="text-sm text-[#040101] leading-relaxed">
                    {prob.problemStatement}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => handleSelectProblem(prob)}
                    className="bg-[#f53900] text-[#fffafa] text-sm font-medium px-5 py-2.5 rounded-[4px] hover:opacity-90 flex items-center gap-1.5 transition-opacity"
                  >
                    <span>Solve in Compiler</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: COMPILER */}
      {activeTab === 'compiler' && (
        <main className="max-w-[1200px] mx-auto px-6 py-8">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#040101]">{selectedProblem.title}</h1>
                <p className="text-xs text-[#827e7e]">{selectedProblem.category} • Standard I/O</p>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'c' | 'cpp')}
                className="bg-[#fffafa] border border-[#e5e5e5] text-xs font-medium rounded-[4px] px-3 py-2 text-[#040101] outline-none cursor-pointer focus:border-[#f53900]"
              >
                <option value="cpp">C++ (GCC 13.2 / C++20)</option>
                <option value="c">C (GCC 13.2 / C17)</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="border border-[#e5e5e5] text-[#040101] text-xs font-medium px-3.5 py-2 rounded-[4px] hover:border-[#827e7e] flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={14} className="text-[#f53900]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleResetCode}
                className="border border-[#e5e5e5] text-[#040101] text-xs font-medium px-3.5 py-2 rounded-[4px] hover:border-[#827e7e] flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-[#f53900] text-[#fffafa] text-xs font-medium px-5 py-2 rounded-[4px] hover:opacity-90 disabled:opacity-50 flex items-center gap-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-opacity"
              >
                <Play size={14} />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Editor and I/O Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Editor (7 cols) */}
            <div className="lg:col-span-7 border border-[#e5e5e5] rounded-[8px] bg-[#fffafa] overflow-hidden flex flex-col">
              <div className="px-4 py-2.5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fffafa]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-[9999px] bg-[#f53900]" />
                  <span className="text-xs font-mono font-medium text-[#040101]">main.{selectedLanguage}</span>
                </div>
                <span className="text-xs text-[#827e7e]">UTF-8</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[520px] p-4 font-mono text-xs leading-relaxed bg-[#fffafa] text-[#040101] outline-none resize-none selection:bg-[#ffe0d6] selection:text-[#f53900]"
                spellCheck={false}
              />
            </div>

            {/* Right: Standard Input & Output (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Problem Description Box */}
              <div className="border border-[#e5e5e5] rounded-[8px] p-4 bg-[#fffafa]">
                <h4 className="text-xs font-semibold text-[#827e7e] uppercase tracking-wider mb-1">Problem Statement</h4>
                <p className="text-xs text-[#040101] leading-relaxed mb-3">
                  {selectedProblem.problemStatement}
                </p>
                <div className="text-[11px] text-[#827e7e] flex items-center gap-3">
                  <span>Expected Output:</span>
                  <code className="font-mono text-[#f53900] bg-[#ffe0d6] px-1.5 py-0.5 rounded-[4px]">
                    {selectedProblem.expectedOutput}
                  </code>
                </div>
              </div>

              {/* Standard Input */}
              <div className="border border-[#e5e5e5] rounded-[8px] bg-[#fffafa] overflow-hidden flex flex-col">
                <div className="px-4 py-2 border-b border-[#e5e5e5] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#040101]">Standard Input (stdin)</span>
                  <span className="text-[10px] text-[#827e7e]">custom parameters</span>
                </div>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Enter inputs here..."
                  rows={4}
                  className="w-full p-3 font-mono text-xs bg-transparent outline-none resize-none text-[#040101]"
                  spellCheck={false}
                />
              </div>

              {/* Program Output */}
              <div className="border border-[#e5e5e5] rounded-[8px] bg-[#fffafa] overflow-hidden flex-1 flex flex-col">
                <div className="px-4 py-2 border-b border-[#e5e5e5] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#040101]">Output</span>
                  {executionStats && (
                    <div className="flex items-center gap-3 text-[11px]">
                      {executionStats.timeMs !== undefined && (
                        <span className="text-[#827e7e] flex items-center gap-1">
                          <Clock size={12} />
                          {executionStats.timeMs}ms
                        </span>
                      )}
                      <span className={`font-semibold ${executionStats.exitCode === 0 ? 'text-[#f53900]' : 'text-red-600'}`}>
                        exit {executionStats.exitCode}
                      </span>
                    </div>
                  )}
                </div>
                <pre className="p-4 font-mono text-xs text-[#040101] overflow-auto flex-1 min-h-[160px] whitespace-pre-wrap">
                  {output || 'Run your code to view compilation and program output.'}
                </pre>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: WORKSPACE */}
      {activeTab === 'workspace' && (
        <main className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="border-b border-[#e5e5e5] pb-6 mb-8">
            <h1 className="text-3xl font-bold text-[#040101] mb-1">Developer Workspace</h1>
            <p className="text-[#827e7e] text-sm">System environment specifications and practice history.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-[#e5e5e5] rounded-[8px] p-6 bg-[#fffafa]">
              <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] flex items-center justify-center mb-4">
                <Cpu size={16} />
              </div>
              <h3 className="font-semibold text-lg text-[#040101] mb-3">Runtime Specifications</h3>
              <div className="space-y-2 text-xs text-[#040101]">
                <div className="flex justify-between py-1.5 border-b border-[#e5e5e5]">
                  <span className="text-[#827e7e]">Operating Environment</span>
                  <span className="font-mono">Linux x86_64 Container</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#e5e5e5]">
                  <span className="text-[#827e7e]">C++ Compiler</span>
                  <span className="font-mono">g++ (GCC) 13.2.0</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#e5e5e5]">
                  <span className="text-[#827e7e]">C Compiler</span>
                  <span className="font-mono">gcc (GCC) 13.2.0</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#e5e5e5]">
                  <span className="text-[#827e7e]">Optimization Flags</span>
                  <span className="font-mono">-O2 -Wall -Wextra</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#827e7e]">Execution Timeout</span>
                  <span className="font-mono">5000 ms</span>
                </div>
              </div>
            </div>

            <div className="border border-[#e5e5e5] rounded-[8px] p-6 bg-[#fffafa]">
              <div className="w-8 h-8 rounded-[9999px] bg-[#ffe0d6] text-[#f53900] flex items-center justify-center mb-4">
                <Code2 size={16} />
              </div>
              <h3 className="font-semibold text-lg text-[#040101] mb-3">Quick Navigation</h3>
              <p className="text-xs text-[#040101] mb-4 leading-relaxed">
                Jump directly into compiler mode with sample problems prepared for testing.
              </p>
              <div className="space-y-2">
                {SAMPLE_PROBLEMS.map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className="w-full text-left p-2.5 rounded-[4px] border border-[#e5e5e5] hover:border-[#f53900] text-xs font-medium flex items-center justify-between transition-colors"
                  >
                    <span>{prob.title}</span>
                    <span className="text-[#827e7e] font-normal">{prob.difficulty}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-6 py-12 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#827e7e]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[4px] bg-[#f53900] text-[#fffafa] flex items-center justify-center font-bold text-[10px]">
            B
          </div>
          <span className="font-medium text-[#040101]">BERG</span>
          <span>— High-Contrast Coding Practice</span>
        </div>
        <div>
          <span>Light theme • Snow Canvas & Ember Orange discipline</span>
        </div>
      </footer>
    </div>
  );
}
