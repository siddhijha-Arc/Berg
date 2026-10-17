/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export interface ContestProblem {
  id: string;
  letter: string;
  title: string;
  pillTitle: string;
  filename: string;
  points: string;
  timeLimit: string;
  descriptionHtml: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string[];
  codeLines: string[];
  rawCode: string;
  testCasesPass: Array<{
    title: string;
    time: string;
    input: string;
    output: string;
    expected: string;
    passed: boolean;
    errorType?: string;
  }>;
  testCasesFail: Array<{
    title: string;
    time: string;
    input: string;
    output: string;
    expected: string;
    passed: boolean;
    errorType?: string;
  }>;
  execTimePass: string;
  memoryPass: string;
  execTimeFail: string;
  memoryFail: string;
}

export const CONTEST_PROBLEMS: ContestProblem[] = [
  {
    id: 'Q1',
    letter: 'A',
    title: 'A. Array Sum',
    pillTitle: 'A. Array Sum',
    filename: 'solution_A.cpp',
    points: '100 pts',
    timeLimit: 'Time Limit: 1.0s',
    descriptionHtml: `
      <p class="text-stone-700 leading-normal">Given an array of <span class="math-font text-[15px]">n</span> integers, calculate and print the total sum of all elements. Ensure your solution avoids integer overflow for large cumulative inputs.</p>
    `,
    sampleInput: `5\n1 2 3 4 5`,
    sampleOutput: `15`,
    constraints: [
      '• 1 ≤ <span class="math-font">n</span> ≤ 10<sup>5</sup>',
      '• -10<sup>9</sup> ≤ <span class="math-font">a<sub>i</sub></span> ≤ 10<sup>9</sup>',
      '• Memory Limit: 256 MB'
    ],
    rawCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t = 1;

    while (t--) {
        int n;
        cin >> n;
        long long total_sum = 0;
        for (int i = 0; i < n; i++) {
            long long val;
            cin >> val;
            total_sum += val;
        }
        cout << total_sum << "\\n";
    }
    return 0;
}`,
    codeLines: [
      '<div><span class="text-purple-600 font-semibold">#include</span> <span class="text-emerald-600">&lt;bits/stdc++.h&gt;</span></div>',
      '<div><span class="text-purple-600 font-semibold">using</span> <span class="text-purple-600 font-semibold">namespace</span> <span class="text-stone-800">std;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-blue-600 font-semibold">int</span> <span class="text-sky-700 font-semibold">main</span>() {</div>',
      '<div>    <span class="text-stone-800">ios::sync_with_stdio(</span><span class="text-amber-600">false</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-stone-800">cin.tie(</span><span class="text-amber-600">nullptr</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> <span class="text-stone-800">t = 1;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div>    <span class="text-purple-600 font-semibold">while</span> <span class="text-stone-800">(t--) {</span></div>',
      '<div>        <span class="text-blue-600 font-semibold">int</span> <span class="text-stone-800">n;</span></div>',
      '<div>        <span class="text-stone-800">cin &gt;&gt; n;</span></div>',
      '<div>        <span class="text-blue-600 font-semibold">long long</span> <span class="text-stone-800">total_sum = 0;</span></div>',
      '<div>        <span class="text-purple-600 font-semibold">for</span> <span class="text-stone-800">(</span><span class="text-blue-600 font-semibold">int</span> <span class="text-stone-800">i = 0; i &lt; n; i++) {</span></div>',
      '<div>            <span class="text-blue-600 font-semibold">long long</span> <span class="text-stone-800">val;</span></div>',
      '<div>            <span class="text-stone-800">cin &gt;&gt; val;</span></div>',
      '<div>            <span class="text-stone-800">total_sum += val;</span></div>',
      '<div>        <span class="text-stone-800">}</span></div>',
      '<div>        <span class="text-stone-800">cout &lt;&lt; total_sum &lt;&lt; </span><span class="text-emerald-600">"\\n"</span><span class="text-stone-800">;</span></div>',
      '<div>    <span class="text-stone-800">}</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">return</span> <span class="text-amber-600">0</span><span class="text-stone-800">;</span></div>',
      '<div>}</div>'
    ],
    testCasesPass: [
      { title: 'Case 1', time: '4ms', input: '5\n1 2 3 4 5', output: '15', expected: '15', passed: true },
      { title: 'Case 2', time: '5ms', input: '3\n100 200 300', output: '600', expected: '600', passed: true },
      { title: 'Case 3', time: '3ms', input: '1\n42', output: '42', expected: '42', passed: true }
    ],
    testCasesFail: [
      { title: 'Case 1', time: '4ms', input: '5\n1 2 3 4 5', output: '15', expected: '15', passed: true },
      { title: 'Case 2', time: '5ms', input: '3\n100 200 300', output: '600', expected: '600', passed: true },
      { title: 'Case 3', time: '7ms', input: '1\n42', output: '0', expected: '42', passed: false, errorType: 'Wrong Answer' }
    ],
    execTimePass: '12 ms',
    memoryPass: '1.4 MB',
    execTimeFail: '16 ms',
    memoryFail: '1.5 MB'
  },
  {
    id: 'Q2',
    letter: 'B',
    title: 'B. Prefix Product',
    pillTitle: 'B. Prefix Product',
    filename: 'solution_B.cpp',
    points: '150 pts',
    timeLimit: 'Time Limit: 1.5s',
    descriptionHtml: `
      <p class="text-stone-700 leading-normal">You are given an array <span class="math-font text-[15px]">A</span> of length <span class="math-font text-[15px]">n</span>. Construct an answer array <span class="math-font text-[15px]">P</span> where <span class="math-font text-[15px]">P[i]</span> is equal to the product of all elements in <span class="math-font text-[15px]">A</span> except <span class="math-font text-[15px]">A[i]</span>, modulo <span class="math-font text-[15px]">10<sup>9</sup> + 7</span>. Division by zero is not allowed; solve in linear time <span class="math-font text-[15px]">O(n)</span>.</p>
    `,
    sampleInput: `4\n1 2 3 4`,
    sampleOutput: `24 12 8 6`,
    constraints: [
      '• 2 ≤ <span class="math-font">n</span> ≤ 2 × 10<sup>5</sup>',
      '• 1 ≤ <span class="math-font">a<sub>i</sub></span> ≤ 10<sup>9</sup>',
      '• Time Limit: 1.5s • Memory: 256 MB'
    ],
    rawCode: `#include <bits/stdc++.h>
using namespace std;

const int MOD = 1e9 + 7;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<long long> a(n), pref(n, 1), suff(n, 1);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 1; i < n; i++) pref[i] = (pref[i-1] * a[i-1]) % MOD;
    for (int i = n - 2; i >= 0; i--) suff[i] = (suff[i+1] * a[i+1]) % MOD;
    for (int i = 0; i < n; i++) {
        long long ans = (pref[i] * suff[i]) % MOD;
        cout << ans << " ";
    }
    cout << "\\n";
    return 0;
}`,
    codeLines: [
      '<div><span class="text-purple-600 font-semibold">#include</span> <span class="text-emerald-600">&lt;bits/stdc++.h&gt;</span></div>',
      '<div><span class="text-purple-600 font-semibold">using</span> <span class="text-purple-600 font-semibold">namespace</span> <span class="text-stone-800">std;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-purple-600 font-semibold">const</span> <span class="text-blue-600 font-semibold">int</span> <span class="text-stone-800">MOD = 1e9 + 7;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-blue-600 font-semibold">int</span> <span class="text-sky-700 font-semibold">main</span>() {</div>',
      '<div>    <span class="text-stone-800">ios::sync_with_stdio(</span><span class="text-amber-600">false</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-stone-800">cin.tie(</span><span class="text-amber-600">nullptr</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> <span class="text-stone-800">n; cin &gt;&gt; n;</span></div>',
      '<div>    <span class="text-stone-800">vector&lt;<span class="text-blue-600 font-semibold">long long</span>&gt; a(n), pref(n, 1), suff(n, 1);</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">for</span> (<span class="text-blue-600 font-semibold">int</span> i = 0; i &lt; n; i++) <span class="text-stone-800">cin &gt;&gt; a[i];</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">for</span> (<span class="text-blue-600 font-semibold">int</span> i = 1; i &lt; n; i++) <span class="text-stone-800">pref[i] = (pref[i-1] * a[i-1]) % MOD;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">for</span> (<span class="text-blue-600 font-semibold">int</span> i = n - 2; i &gt;= 0; i--) <span class="text-stone-800">suff[i] = (suff[i+1] * a[i+1]) % MOD;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">for</span> (<span class="text-blue-600 font-semibold">int</span> i = 0; i &lt; n; i++) {</div>',
      '<div>        <span class="text-blue-600 font-semibold">long long</span> <span class="text-stone-800">ans = (pref[i] * suff[i]) % MOD;</span></div>',
      '<div>        <span class="text-stone-800">cout &lt;&lt; ans &lt;&lt; </span><span class="text-emerald-600">" "</span><span class="text-stone-800">;</span></div>',
      '<div>    }</div>',
      '<div>    <span class="text-stone-800">cout &lt;&lt; </span><span class="text-emerald-600">"\\n"</span><span class="text-stone-800">;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">return</span> <span class="text-amber-600">0</span><span class="text-stone-800">;</span></div>',
      '<div>}</div>'
    ],
    testCasesPass: [
      { title: 'Case 1', time: '14ms', input: '4\n1 2 3 4', output: '24 12 8 6', expected: '24 12 8 6', passed: true },
      { title: 'Case 2', time: '18ms', input: '3\n5 10 2', output: '20 10 50', expected: '20 10 50', passed: true },
      { title: 'Case 3', time: '11ms', input: '2\n7 9', output: '9 7', expected: '9 7', passed: true }
    ],
    testCasesFail: [
      { title: 'Case 1', time: '14ms', input: '4\n1 2 3 4', output: '24 12 8 6', expected: '24 12 8 6', passed: true },
      { title: 'Case 2', time: '18ms', input: '3\n5 10 2', output: '20 10 50', expected: '20 10 50', passed: true },
      { title: 'Case 3', time: '12ms', input: '2\n7 9', output: '0 0', expected: '9 7', passed: false, errorType: 'Wrong Answer' }
    ],
    execTimePass: '23 ms',
    memoryPass: '2.8 MB',
    execTimeFail: '26 ms',
    memoryFail: '2.9 MB'
  },
  {
    id: 'Q3',
    letter: 'C',
    title: 'C. Unique Pairs',
    pillTitle: 'C. Unique Pairs',
    filename: 'solution_C.cpp',
    points: '200 pts',
    timeLimit: 'Time Limit: 2.0s',
    descriptionHtml: `
      <p class="text-stone-700 leading-normal">Given a multiset of <span class="math-font text-[15px]">n</span> positive numbers and an integer target <span class="math-font text-[15px]">k</span>, find the count of distinct index pairs <span class="math-font text-[15px]">(i, j)</span> with <span class="math-font text-[15px]">i &lt; j</span> such that <span class="math-font text-[15px]">|a<sub>i</sub> - a<sub>j</sub>| = k</span>.</p>
    `,
    sampleInput: `6 2\n1 5 3 4 2 1`,
    sampleOutput: `3`,
    constraints: [
      '• 2 ≤ <span class="math-font">n</span> ≤ 3 × 10<sup>5</sup>',
      '• 0 ≤ <span class="math-font">k</span> ≤ 10<sup>9</sup>',
      '• 1 ≤ <span class="math-font">a<sub>i</sub></span> ≤ 10<sup>9</sup>'
    ],
    rawCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; long long k;
    if (!(cin >> n >> k)) return 0;
    map<long long, int> freq;
    long long count = 0;
    for (int i = 0; i < n; i++) {
        long long val; cin >> val;
        count += freq[val - k];
        if (k != 0) count += freq[val + k];
        freq[val]++;
    }
    cout << count << "\\n";
    return 0;
}`,
    codeLines: [
      '<div><span class="text-purple-600 font-semibold">#include</span> <span class="text-emerald-600">&lt;bits/stdc++.h&gt;</span></div>',
      '<div><span class="text-purple-600 font-semibold">using</span> <span class="text-purple-600 font-semibold">namespace</span> <span class="text-stone-800">std;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-blue-600 font-semibold">int</span> <span class="text-sky-700 font-semibold">main</span>() {</div>',
      '<div>    <span class="text-stone-800">ios::sync_with_stdio(</span><span class="text-amber-600">false</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-stone-800">cin.tie(</span><span class="text-amber-600">nullptr</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> n; <span class="text-blue-600 font-semibold">long long</span> k;</div>',
      '<div>    <span class="text-stone-800">if (!(cin &gt;&gt; n &gt;&gt; k)) return 0;</span></div>',
      '<div>    <span class="text-stone-800">map&lt;<span class="text-blue-600 font-semibold">long long</span>, <span class="text-blue-600 font-semibold">int</span>&gt; freq;</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">long long</span> count = 0;</div>',
      '<div>    <span class="text-purple-600 font-semibold">for</span> (<span class="text-blue-600 font-semibold">int</span> i = 0; i &lt; n; i++) {</div>',
      '<div>        <span class="text-blue-600 font-semibold">long long</span> val; <span class="text-stone-800">cin &gt;&gt; val;</span></div>',
      '<div>        <span class="text-stone-800">count += freq[val - k];</span></div>',
      '<div>        <span class="text-purple-600 font-semibold">if</span> (k != 0) <span class="text-stone-800">count += freq[val + k];</span></div>',
      '<div>        <span class="text-stone-800">freq[val]++;</span></div>',
      '<div>    }</div>',
      '<div>    <span class="text-stone-800">cout &lt;&lt; count &lt;&lt; </span><span class="text-emerald-600">"\\n"</span><span class="text-stone-800">;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">return</span> <span class="text-amber-600">0</span><span class="text-stone-800">;</span></div>',
      '<div>}</div>'
    ],
    testCasesPass: [
      { title: 'Case 1', time: '19ms', input: '6 2\n1 5 3 4 2 1', output: '3', expected: '3', passed: true },
      { title: 'Case 2', time: '9ms', input: '4 0\n3 3 3 3', output: '6', expected: '6', passed: true },
      { title: 'Case 3', time: '15ms', input: '5 3\n1 4 7 10 13', output: '4', expected: '4', passed: true }
    ],
    testCasesFail: [
      { title: 'Case 1', time: '19ms', input: '6 2\n1 5 3 4 2 1', output: '3', expected: '3', passed: true },
      { title: 'Case 2', time: '9ms', input: '4 0\n3 3 3 3', output: '6', expected: '6', passed: true },
      { title: 'Case 3', time: '17ms', input: '5 3\n1 4 7 10 13', output: '2', expected: '4', passed: false, errorType: 'Wrong Answer' }
    ],
    execTimePass: '38 ms',
    memoryPass: '3.6 MB',
    execTimeFail: '41 ms',
    memoryFail: '3.8 MB'
  },
  {
    id: 'Q4',
    letter: 'D',
    title: 'D. Maximum Flow',
    pillTitle: 'D. Maximum Flow',
    filename: 'solution_D.cpp',
    points: '300 pts',
    timeLimit: 'Time Limit: 2.0s',
    descriptionHtml: `
      <p class="text-stone-700 leading-normal">Given a directed graph with <span class="math-font text-[15px]">V</span> vertices and <span class="math-font text-[15px]">E</span> edges with capacities, calculate the maximum flow from source <span class="math-font text-[15px]">s</span> to sink <span class="math-font text-[15px]">t</span> using Dinic's algorithm with scaling.</p>
    `,
    sampleInput: `4 5 1 4\n1 2 10\n1 3 10\n2 3 2\n2 4 4\n3 4 9`,
    sampleOutput: `13`,
    constraints: [
      '• 2 ≤ <span class="math-font">V</span> ≤ 1200',
      '• 1 ≤ <span class="math-font">E</span> ≤ 10<sup>4</sup>',
      '• 0 ≤ <span class="math-font">capacity</span> ≤ 10<sup>9</sup>'
    ],
    rawCode: `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int to, rev;
    long long cap, flow = 0;
};

vector<vector<Edge>> adj;

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int n, m, s, t;
    if (!(cin >> n >> m >> s >> t)) return 0;
    adj.assign(n + 1, {});
    cout << 13 << "\\n";
    return 0;
}`,
    codeLines: [
      '<div><span class="text-purple-600 font-semibold">#include</span> <span class="text-emerald-600">&lt;bits/stdc++.h&gt;</span></div>',
      '<div><span class="text-purple-600 font-semibold">using</span> <span class="text-purple-600 font-semibold">namespace</span> <span class="text-stone-800">std;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-purple-600 font-semibold">struct</span> <span class="text-stone-800 font-semibold">Edge</span> {</div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> to, rev;</div>',
      '<div>    <span class="text-blue-600 font-semibold">long long</span> cap, flow = 0;</div>',
      '<div>};</div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-purple-600 font-semibold">vector</span>&lt;<span class="text-stone-800">vector&lt;Edge&gt;</span>&gt; <span class="text-stone-800">adj;</span></div>',
      '<div><span class="text-blue-600 font-semibold">int</span> <span class="text-sky-700 font-semibold">main</span>() {</div>',
      '<div>    <span class="text-stone-800">ios::sync_with_stdio(</span><span class="text-amber-600">false</span><span class="text-stone-800">); cin.tie(</span><span class="text-amber-600">nullptr</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> n, m, s, t;</div>',
      '<div>    <span class="text-purple-600 font-semibold">if</span> (!(cin &gt;&gt; n &gt;&gt; m &gt;&gt; s &gt;&gt; t)) return 0;</div>',
      '<div>    <span class="text-stone-800">adj.assign(n + 1, {});</span></div>',
      '<div>    <span class="text-stone-400">// Dinic augmentation routine...</span></div>',
      '<div>    <span class="text-stone-800">cout &lt;&lt; </span><span class="text-emerald-600">13</span><span class="text-stone-800"> &lt;&lt; </span><span class="text-emerald-600">"\\n"</span><span class="text-stone-800">;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">return</span> <span class="text-amber-600">0</span><span class="text-stone-800">;</span></div>',
      '<div>}</div>'
    ],
    testCasesPass: [
      { title: 'Case 1', time: '22ms', input: '4 5 1 4\n1 2 10\n1 3 10...', output: '13', expected: '13', passed: true },
      { title: 'Case 2', time: '17ms', input: '6 9 1 6\n1 2 7\n1 3 4...', output: '10', expected: '10', passed: true },
      { title: 'Case 3', time: '31ms', input: '2 1 1 2\n1 2 500', output: '500', expected: '500', passed: true }
    ],
    testCasesFail: [
      { title: 'Case 1', time: '22ms', input: '4 5 1 4\n1 2 10\n1 3 10...', output: '13', expected: '13', passed: true },
      { title: 'Case 2', time: '17ms', input: '6 9 1 6\n1 2 7\n1 3 4...', output: '10', expected: '10', passed: true },
      { title: 'Case 3', time: '34ms', input: '2 1 1 2\n1 2 500', output: '0', expected: '500', passed: false, errorType: 'Wrong Answer' }
    ],
    execTimePass: '45 ms',
    memoryPass: '4.9 MB',
    execTimeFail: '49 ms',
    memoryFail: '5.1 MB'
  },
  {
    id: 'Q5',
    letter: 'E',
    title: 'E. Interval Tree',
    pillTitle: 'E. Interval Tree',
    filename: 'solution_E.cpp',
    points: '400 pts',
    timeLimit: 'Time Limit: 2.5s',
    descriptionHtml: `
      <p class="text-stone-700 leading-normal">Maintain a set of disjoint intervals under dynamic insertions, deletions, and point query operations. Query returns the total length of covered segments in a specified range <span class="math-font text-[15px]">[L, R]</span>.</p>
    `,
    sampleInput: `5\n1 2 5\n1 7 9\n2 4 8\n1 3 8\n2 1 10`,
    sampleOutput: `4\n9`,
    constraints: [
      '• 1 ≤ <span class="math-font">Q</span> ≤ 2 × 10<sup>5</sup>',
      '• 1 ≤ <span class="math-font">L</span> ≤ <span class="math-font">R</span> ≤ 10<sup>9</sup>',
      '• Range queries require <span class="math-font">O(log n)</span> amortized update'
    ],
    rawCode: `#include <bits/stdc++.h>
using namespace std;

class IntervalTree {
public:
    void add(long long l, long long r);
    long long query(long long l, long long r);
};

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr);
    int q; cin >> q;
    cout << "4\\n9\\n";
    return 0;
}`,
    codeLines: [
      '<div><span class="text-purple-600 font-semibold">#include</span> <span class="text-emerald-600">&lt;bits/stdc++.h&gt;</span></div>',
      '<div><span class="text-purple-600 font-semibold">using</span> <span class="text-purple-600 font-semibold">namespace</span> <span class="text-stone-800">std;</span></div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-purple-600 font-semibold">class</span> <span class="text-stone-800 font-semibold">IntervalTree</span> {</div>',
      '<div>    <span class="text-stone-400">// Lazy dynamic segment tree implementation</span></div>',
      '<div><span class="text-purple-600 font-semibold">public:</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">void</span> <span class="text-sky-700 font-semibold">add</span>(<span class="text-blue-600 font-semibold">long long</span> l, <span class="text-blue-600 font-semibold">long long</span> r);</div>',
      '<div>    <span class="text-blue-600 font-semibold">long long</span> <span class="text-sky-700 font-semibold">query</span>(<span class="text-blue-600 font-semibold">long long</span> l, <span class="text-blue-600 font-semibold">long long</span> r);</div>',
      '<div>};</div>',
      '<div class="h-[22px]"></div>',
      '<div><span class="text-blue-600 font-semibold">int</span> <span class="text-sky-700 font-semibold">main</span>() {</div>',
      '<div>    <span class="text-stone-800">ios::sync_with_stdio(</span><span class="text-amber-600">false</span><span class="text-stone-800">); cin.tie(</span><span class="text-amber-600">nullptr</span><span class="text-stone-800">);</span></div>',
      '<div>    <span class="text-blue-600 font-semibold">int</span> q; <span class="text-stone-800">cin &gt;&gt; q;</span></div>',
      '<div>    <span class="text-stone-800">cout &lt;&lt; </span><span class="text-emerald-600">"4\\n9\\n"</span><span class="text-stone-800">;</span></div>',
      '<div>    <span class="text-purple-600 font-semibold">return</span> <span class="text-amber-600">0</span><span class="text-stone-800">;</span></div>',
      '<div>}</div>'
    ],
    testCasesPass: [
      { title: 'Case 1', time: '35ms', input: '5\n1 2 5\n1 7 9...', output: '4\n9', expected: '4\n9', passed: true },
      { title: 'Case 2', time: '29ms', input: '3\n1 1 100\n2 50 60', output: '11', expected: '11', passed: true },
      { title: 'Case 3', time: '42ms', input: '4\n1 10 20\n1 30 40...', output: '22', expected: '22', passed: true }
    ],
    testCasesFail: [
      { title: 'Case 1', time: '35ms', input: '5\n1 2 5\n1 7 9...', output: '4\n9', expected: '4\n9', passed: true },
      { title: 'Case 2', time: '29ms', input: '3\n1 1 100\n2 50 60', output: '11', expected: '11', passed: true },
      { title: 'Case 3', time: '46ms', input: '4\n1 10 20\n1 30 40...', output: '0', expected: '22', passed: false, errorType: 'Wrong Answer' }
    ],
    execTimePass: '54 ms',
    memoryPass: '7.2 MB',
    execTimeFail: '58 ms',
    memoryFail: '7.4 MB'
  }
];

export function PracticeWorkspace({ onExit }: { onExit?: () => void }) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [isSepiaTheme, setIsSepiaTheme] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'results' | 'console'>('results');
  const [mobileTab, setMobileTab] = useState<'problem' | 'editor'>('problem');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>('Compiling and running against 3 test cases...');
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);
  const [inspectorCase, setInspectorCase] = useState<{
    title: string;
    input: string;
    output: string;
    expected: string;
    passed: boolean;
    time: string;
    errorType?: string;
  } | null>(null);

  const prob = CONTEST_PROBLEMS[currentProblemIndex];

  // Keydown listener for Esc exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleCopyInput = () => {
    navigator.clipboard.writeText(prob.sampleInput);
    setCopiedInput(true);
    setTimeout(() => setCopiedInput(false), 1200);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(prob.sampleOutput);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 1200);
  };

  const triggerExecution = (isSubmit: boolean) => {
    setIsExecuting(true);
    if (isSubmit) {
      setLoaderMessage('Compiling and judging submission against all test sets...');
    } else {
      setLoaderMessage('Compiling and running against 3 test cases...');
    }

    setTimeout(() => {
      setIsExecuting(false);
      setActiveTab('results');
      if (isSubmit) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(null);
        }, 2200);
      }
    }, 450);
  };

  const lineCount = Math.max(prob.codeLines.length, 22);

  return (
    <div className={`w-full overflow-hidden select-none bg-[#fbf7f0] text-stone-900 m-0 p-0 flex flex-col relative font-sans ${
      isFullscreen 
        ? 'fixed inset-0 z-50 h-screen' 
        : 'h-[calc(100dvh-64px)] sm:h-[calc(100dvh-75px)] flex-1 min-h-0'
    }`}>
      {/* Floating Exit Fullscreen Control Pill (Netflix/YouTube style overlay) */}
      <aside 
        aria-label="Fullscreen Controls" 
        className={`fixed top-4 left-1/2 z-50 flex items-center gap-2.5 bg-stone-900/90 text-stone-100 hover:bg-stone-900 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all text-xs font-mono select-none ${
          isFullscreen 
            ? 'opacity-100 pointer-events-auto translate-x-[-50%] translate-y-0' 
            : 'opacity-0 pointer-events-none translate-x-[-50%] translate-y-[-20px]'
        }`}
      >
        <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <span className="material-symbols-outlined text-[15px]">fullscreen_exit</span>
          <span>Immersive Editor</span>
        </span>
        <span className="text-stone-500">|</span>
        <button 
          onClick={() => setIsFullscreen(false)}
          className="bg-white/15 hover:bg-white/25 active:scale-95 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Exit Full Screen</span>
          <span className="bg-black/30 text-stone-300 text-[10px] px-1 rounded font-mono">Esc</span>
        </button>
      </aside>

      {/* BEGIN: WindowTitleBar */}
      {!isFullscreen && (
        <header className="h-10 sm:h-11 px-3 sm:px-5 flex items-center justify-between bg-[#f97316] shrink-0 border-b border-orange-600/40 shadow-xs z-30 transition-all duration-300" data-purpose="window-titlebar">
          {/* Window Traffic Light Dots in Sleek Pill Capsule */}
          <div className="group bg-white/95 hover:bg-white rounded-full px-2 sm:px-2.5 py-1 shadow-sm inline-flex items-center gap-1.5 sm:gap-2 border border-black/10 backdrop-blur-xs transition-all duration-200 shrink-0">
            {/* Close Dot (Red) */}
            <button 
              onClick={onExit}
              aria-label="Close window" 
              className="traffic-dot w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-gradient-to-b from-[#ff6b6b] to-[#e03131] border border-[#c92a2a]/40 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-150 group/dot" 
              type="button"
            >
              <span className="text-[9px] font-black text-[#580000] opacity-0 group-hover:opacity-100 transition-opacity duration-150 leading-none select-none -translate-y-[0.5px]">✕</span>
            </button>
            {/* Minimize Dot (Yellow) */}
            <button 
              aria-label="Minimize window" 
              className="traffic-dot w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-gradient-to-b from-[#fcc419] to-[#fab005] border border-[#e67700]/40 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-150 group/dot" 
              type="button"
            >
              <span className="text-[9px] font-black text-[#5c3e00] opacity-0 group-hover:opacity-100 transition-opacity duration-150 leading-none select-none -translate-y-[1px]">−</span>
            </button>
            {/* Maximize Dot (Green) -> Triggers Immersive Fullscreen */}
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              aria-label="Expand window to immersive fullscreen" 
              className="traffic-dot w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-gradient-to-b from-[#51cf66] to-[#2f9e44] border border-[#2b8a3e]/40 flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-150 group/dot" 
              title="Enter Immersive Full Screen" 
              type="button"
            >
              <span className="text-[8px] font-black text-[#0b4816] opacity-0 group-hover:opacity-100 transition-opacity duration-150 leading-none select-none">⤢</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-orange-950/80 font-semibold truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0"></span>
            <span className="tracking-wide truncate">MANGO ARENA <span className="hidden xs:inline">• LIVE CONTEST</span></span>
          </div>
        </header>
      )}
      {/* END: WindowTitleBar */}

      {/* MOBILE ADAPTIVE VIEW TOGGLE (Shown only on screens < lg) */}
      {!isFullscreen && (
        <div className="lg:hidden flex items-center justify-between px-3 py-1.5 bg-[#faebd7]/80 border-b border-stone-200 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1 p-0.5 bg-stone-200/60 rounded-lg">
            <button
              onClick={() => setMobileTab('problem')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                mobileTab === 'problem'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">description</span>
              <span>Problem</span>
            </button>
            <button
              onClick={() => setMobileTab('editor')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 font-medium ${
                mobileTab === 'editor'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>Code & IDE</span>
            </button>
          </div>
          <span className="text-[11px] font-mono text-stone-700 font-semibold bg-stone-200/70 px-2 py-0.5 rounded">
            {prob.points}
          </span>
        </div>
      )}

      {/* BEGIN: WindowMainGrid */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative min-h-0">
        {/* BEGIN: ProblemStatementView */}
        {!isFullscreen && (
          <main className={`
            ${mobileTab === 'problem' ? 'flex' : 'hidden'} lg:flex
            w-full lg:w-[420px] xl:w-[480px] shrink-0 bg-[#fbf7f0] flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200/80 transition-all duration-300 h-full
          `} data-purpose="problem-description">
            {/* Horizontal Problem Selector */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-stone-200/70 bg-[#faebd7]/50 flex items-center justify-between text-xs select-none shrink-0">
              <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5 custom-scrollbar max-w-[calc(100%-70px)] sm:max-w-none">
                {CONTEST_PROBLEMS.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    {idx === currentProblemIndex ? (
                      <span className="px-2.5 py-1 rounded-md bg-[#fce7b8] text-stone-900 font-semibold shadow-xs flex items-center space-x-1 border border-amber-300/60 cursor-pointer select-none transition-all duration-200 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block animate-pulse"></span>
                        <span className="truncate max-w-[120px] sm:max-w-none">{p.pillTitle}</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCurrentProblemIndex(idx)}
                        className="px-2 py-1 rounded-md text-stone-600 hover:text-stone-900 hover:bg-black/5 font-medium transition-colors cursor-pointer text-xs shrink-0"
                        title={p.title}
                      >
                        {p.id}
                      </button>
                    )}
                    {idx < CONTEST_PROBLEMS.length - 1 && (
                      <span className="text-stone-400 font-mono text-[11px] px-0.5 select-none shrink-0">›</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="hidden lg:flex items-center space-x-1 shrink-0 ml-2 text-stone-500">
                <span className="text-[11px] font-mono font-medium bg-stone-200/60 px-2 py-0.5 rounded text-stone-700 transition-all duration-200">
                  {prob.points}
                </span>
              </div>
            </div>

            {/* Problem Content Body */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col space-y-5 overflow-y-auto flex-1 select-text custom-scrollbar">
              <div className="space-y-1.5 border-b border-stone-200/60 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase font-mono">CONTEST: WEEKLY #12</span>
                  <span className="text-stone-500 text-xs font-mono">{prob.timeLimit}</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-stone-900 transition-opacity duration-150">{prob.title}</h1>
              </div>

              <div className="space-y-2 text-[13.5px] leading-relaxed text-stone-800">
                <p className="font-semibold text-stone-900">Brief Description</p>
                <div 
                  className="text-stone-700 leading-normal transition-opacity duration-150" 
                  dangerouslySetInnerHTML={{ __html: prob.descriptionHtml }}
                />
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-700 font-mono">SAMPLE INPUT</p>
                  <button 
                    onClick={handleCopyInput}
                    className="text-[10px] text-stone-400 font-mono cursor-pointer hover:text-stone-700 active:scale-95 transition-all"
                  >
                    {copiedInput ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-white rounded-lg border border-stone-200/90 p-3 sm:p-3.5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-stone-900 shadow-sm whitespace-pre overflow-x-auto">
                  {prob.sampleInput}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-700 font-mono">SAMPLE OUTPUT</p>
                  <button 
                    onClick={handleCopyOutput}
                    className="text-[10px] text-stone-400 font-mono cursor-pointer hover:text-stone-700 active:scale-95 transition-all"
                  >
                    {copiedOutput ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-white rounded-lg border border-stone-200/90 p-3 sm:p-3.5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-stone-900 shadow-sm whitespace-pre overflow-x-auto">
                  {prob.sampleOutput}
                </div>
              </div>

              <div className="pt-2 text-[13px] text-stone-800 bg-amber-50/50 rounded-lg p-3 sm:p-3.5 border border-amber-200/60">
                <div className="font-semibold text-stone-900 mb-1 text-xs tracking-wider uppercase font-mono text-amber-900">Constraints</div>
                <div className="space-y-0.5 text-stone-700 font-mono text-xs">
                  {prob.constraints.map((c, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Jump to Editor Action Button */}
            <div className="lg:hidden p-3 border-t border-stone-200/70 bg-[#faebd7]/40 shrink-0">
              <button
                onClick={() => setMobileTab('editor')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#fd651e] hover:bg-[#ea5612] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
              >
                <span>Write Solution & Run Tests</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </main>
        )}
        {/* END: ProblemStatementView */}

        {/* BEGIN: Right Split Editor & Console Container */}
        <div className={`
          ${mobileTab === 'editor' ? 'flex' : 'hidden'} lg:flex
          flex-1 bg-[#f4eee4] p-2 sm:p-3 flex-col gap-2 sm:gap-3 overflow-hidden h-full min-w-0
        `} id="ide-workspace-container">
          {/* BEGIN: CodeEditorPanel */}
          <section 
            style={{ backgroundColor: isSepiaTheme ? '#fdfbf7' : '#ffffff' }}
            className="flex-1 text-stone-800 flex flex-col relative overflow-hidden rounded-xl sm:rounded-2xl sunken-panel min-h-[220px] transition-colors duration-200 shadow-sm" 
            data-purpose="code-editor"
          >
            {/* Top Editor Tab Header */}
            <div className="bg-[#faf7f2] border-b border-stone-200 px-3 flex items-center justify-between select-none h-9 sm:h-10 shrink-0">
              <div className="flex items-center space-x-1">
                <div className="bg-white text-stone-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-t text-xs font-mono flex items-center space-x-1.5 sm:space-x-2 border-t-2 border-amber-500 shadow-xs border-x border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-[11px] sm:text-xs">{prob.filename}</span>
                  <span className="text-stone-400 hover:text-stone-600 cursor-pointer text-[11px] ml-1">✕</span>
                </div>
                <div className="text-stone-400 hover:text-stone-700 px-2 py-1 text-xs font-mono cursor-pointer transition-colors" title="New file">+</div>
              </div>
              <div className="flex items-center space-x-1 text-stone-500">
                <button 
                  onClick={() => setIsSepiaTheme(!isSepiaTheme)}
                  className="p-1.5 hover:text-stone-800 hover:bg-stone-100 rounded text-xs flex items-center transition-colors cursor-pointer" 
                  title="Editor Theme (Warm / Neutral)"
                >
                  <span className="material-symbols-outlined text-[16px]">palette</span>
                </button>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 hover:text-stone-800 hover:bg-stone-100 rounded text-xs flex items-center transition-colors cursor-pointer" 
                  title={isFullscreen ? "Exit Immersive Full Screen" : "Enter Immersive Full Screen"}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isFullscreen ? 'close_fullscreen' : 'open_in_full'}
                  </span>
                </button>
                <button className="p-1.5 hover:text-stone-800 hover:bg-stone-100 rounded text-xs flex items-center transition-colors relative cursor-pointer" title="Settings">
                  <span className="material-symbols-outlined text-[16px]">more_vert</span>
                </button>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 flex overflow-hidden min-h-0 relative bg-inherit">
              <div className="flex-1 p-3 sm:p-4 font-mono text-[12px] sm:text-[13px] leading-[20px] sm:leading-[22px] flex overflow-auto relative select-text custom-scrollbar">
                <div className="select-none text-right pr-3 sm:pr-4 text-stone-400 space-y-0 min-w-[28px] sm:min-w-[32px] font-mono border-r border-stone-200 mr-3 sm:mr-4">
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>
                <div 
                  className="flex-1 whitespace-pre font-mono text-stone-800 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: prob.codeLines.join('') }}
                />
              </div>
            </div>
          </section>
          {/* END: CodeEditorPanel */}

          {/* BEGIN: Bottom Console & Test Results Panel */}
          <section className="h-60 sm:h-64 bg-white rounded-xl sm:rounded-2xl sunken-panel flex flex-col shrink-0 overflow-hidden shadow-sm relative" data-purpose="test-console-panel">
            {/* Top Console Bar */}
            <div className="px-3 sm:px-4 py-2 bg-[#faf7f2] border-b border-stone-200 flex items-center justify-between select-none shrink-0 gap-2 sm:gap-3">
              {/* Left tabs */}
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono shrink-0">
                <button 
                  onClick={() => setActiveTab('results')}
                  className={`flex items-center space-x-1 sm:space-x-1.5 transition-colors cursor-pointer text-xs font-mono pb-1 ${
                    activeTab === 'results' 
                      ? 'text-stone-900 font-semibold border-b-2 border-stone-800' 
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  <span>Test Result</span>
                </button>
                <button 
                  onClick={() => setActiveTab('console')}
                  className={`flex items-center space-x-1 sm:space-x-1.5 transition-colors cursor-pointer text-xs font-mono pb-1 ${
                    activeTab === 'console' 
                      ? 'text-stone-900 font-semibold border-b-2 border-stone-800' 
                      : 'text-stone-500 hover:text-stone-800 font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">terminal</span>
                  <span>Console</span>
                </button>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                <button 
                  onClick={() => triggerExecution(false)}
                  disabled={isExecuting}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-800 text-xs font-medium font-mono flex items-center space-x-1 sm:space-x-1.5 transition-all border border-stone-300/70 shadow-xs cursor-pointer disabled:opacity-50" 
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[15px] ${isExecuting ? 'animate-spin' : ''}`}>
                    {isExecuting ? 'autorenew' : 'play_arrow'}
                  </span>
                  <span>{isExecuting ? 'Running...' : 'Run'}</span>
                </button>
                <button 
                  onClick={() => triggerExecution(true)}
                  disabled={isExecuting}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-white font-semibold text-xs font-mono flex items-center space-x-1 sm:space-x-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50 ${
                    submitSuccess 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'bg-[#fd651e] hover:bg-[#ea5612] active:scale-95'
                  }`}
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[15px] ${isExecuting ? 'animate-spin' : ''}`}>
                    {submitSuccess ? 'check' : isExecuting ? 'sync' : 'cloud_upload'}
                  </span>
                  <span>{submitSuccess ? 'Accepted!' : isExecuting ? 'Judging...' : 'Submit'}</span>
                </button>
              </div>
            </div>

            {/* Loading Overlay during Run/Submit execution */}
            {isExecuting && (
              <div className="absolute inset-0 top-10 bg-white/95 backdrop-blur-2xs z-20 flex flex-col items-center justify-center space-y-3 p-4">
                <div className="flex items-center gap-2 text-stone-800 font-mono text-xs font-medium text-center">
                  <span className="material-symbols-outlined text-[20px] text-amber-600 animate-spin shrink-0">progress_activity</span>
                  <span className="text-xs truncate">{loaderMessage}</span>
                </div>
                <div className="w-48 sm:w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full w-full animate-shimmer"></div>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Target: GCC 13.2 C++20 Sandbox</span>
              </div>
            )}

            {/* Panel View: Test Results */}
            {activeTab === 'results' && (
              <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto font-mono text-xs space-y-2.5 text-stone-700 custom-scrollbar bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200/80 gap-1.5">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
                    <span className="text-emerald-600 font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5 shrink-0">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">check_circle</span>
                      Accepted
                    </span>
                    <span className="text-stone-300">|</span>
                    <span className="text-[11px] sm:text-xs text-stone-500 font-mono truncate">Runtime: <span className="text-stone-900 font-semibold">{prob.execTimePass}</span></span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[11px] sm:text-xs text-stone-500 font-mono truncate">Memory: <span className="text-stone-900 font-semibold">{prob.memoryPass}</span></span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-stone-400 font-mono">All 3 testcases passed</div>
                </div>

                {/* Adaptive Testcase Cards Grid: 1 col on mobile, 3 cols on tablet/desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {prob.testCasesPass.map((tc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setInspectorCase(tc)}
                      className={`p-2.5 sm:p-3 rounded-xl space-y-1.5 sm:space-y-2 shadow-2xs transition-colors cursor-pointer ${
                        idx === 0 
                          ? 'border border-emerald-500/30 bg-emerald-50/20' 
                          : 'border border-stone-200/80 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {tc.title}
                        </span>
                        <span className="text-stone-400 font-mono text-[10px]">{tc.time}</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Input</div>
                        <div className="bg-stone-50 border border-stone-200/70 rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 font-mono text-stone-800 text-[11px] whitespace-pre overflow-x-auto">
                          {tc.input}
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Output</div>
                        <div className="bg-stone-50 border border-stone-200/70 rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 font-mono text-emerald-700 font-semibold text-[11px]">
                          {tc.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inspector Drawer Modal */}
                {inspectorCase && (
                  <div className="mt-2.5 p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800 text-xs">
                        {inspectorCase.title} Details — <span className="text-emerald-600 font-semibold">Passed (Accepted)</span>
                      </span>
                      <button 
                        onClick={() => setInspectorCase(null)}
                        className="text-stone-400 hover:text-stone-600 text-xs cursor-pointer px-1 py-0.5"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="text-[11px] sm:text-xs font-mono space-y-1">
                      <div><span className="text-stone-500">Input:</span> {inspectorCase.input.replace(/\n/g, ' ')}</div>
                      <div><span className="text-stone-500">Expected:</span> <span className="text-emerald-700 font-bold">{inspectorCase.expected}</span></div>
                      <div><span className="text-stone-500">Your Output:</span> <span className="text-emerald-700 font-bold">{inspectorCase.output}</span></div>
                      <div className="text-[10px] text-emerald-600 pt-0.5">Execution runtime: {inspectorCase.time} | Match 100%</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Panel View: Console Output */}
            {activeTab === 'console' && (
              <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto font-mono text-xs text-stone-700 bg-stone-50/60 space-y-1.5 custom-scrollbar">
                <div className="text-stone-400">// Compilation Command: g++ -O3 -std=c++20 {prob.filename} -o solution</div>
                <div className="text-emerald-700 font-medium">[INFO] Compilation successful without warnings (0.18s)</div>
                <div className="text-stone-500">[DEBUG] Standard input fed via test runner driver</div>
                <div className="text-stone-800 whitespace-pre">Program exited with return code 0 (SIGTERM: none)</div>
              </div>
            )}
          </section>
          {/* END: Bottom Console & Test Results Panel */}
        </div>
        {/* END: Right Split Editor & Console Container */}
      </div>
      {/* END: WindowMainGrid */}
    </div>
  );
}
