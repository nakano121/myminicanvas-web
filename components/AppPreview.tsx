"use client";

import { useState, useEffect } from "react";

type Screen = "gallery" | "record" | "story" | "bedtime" | "draw";

const SCREENS: Screen[] = ["gallery", "record", "story", "bedtime", "draw"];

const TABS = [
  {
    id: "gallery" as Screen,
    label: "Browse",
    desc: "Every memory, at a glance",
    subdesc:
      "A growing archive of your child's drawings — each one linked to their voice, their story, and the day they made it.",
  },
  {
    id: "record" as Screen,
    label: "Record",
    desc: "One tap. Let them talk.",
    subdesc:
      "Photograph the drawing, hit record, and let them explain it. The 'it's a rocket but also a dog' moment you'll want to keep forever.",
  },
  {
    id: "story" as Screen,
    label: "Story",
    desc: "Their words become a bedtime story",
    subdesc:
      "Claude AI writes a warm, personal story from their description — ready for you to review and save with one tap.",
  },
  {
    id: "bedtime" as Screen,
    label: "Bedtime",
    desc: "Read it aloud together",
    subdesc:
      "Dim the room. A warm AI voice reads the story with word-by-word highlighting. No screen-time guilt — it's their story.",
  },
  {
    id: "draw" as Screen,
    label: "Draw",
    desc: "Draw together on the canvas.",
    subdesc:
      "Open the built-in canvas and draw alongside your child with Apple Pencil or a finger. No app switch. No account. Saved straight to their memory.",
  },
];

/* ── Per-screen phone content ─────────────────────────────────── */

function GalleryScreen() {
  const memories = [
    {
      title: "Purple Dragon",
      child: "Lily, age 4",
      date: "Today",
      bg: "bg-[#EDE1F5]",
      shape: (
        <svg viewBox="0 0 80 60" className="w-full h-full" fill="none">
          <ellipse cx="40" cy="35" rx="22" ry="18" fill="#9B59B6" opacity="0.6" />
          <ellipse cx="28" cy="22" rx="10" ry="8" fill="#9B59B6" opacity="0.5" />
          <circle cx="22" cy="18" r="4" fill="#E8572D" opacity="0.7" />
          <circle cx="30" cy="14" r="3" fill="#E8572D" opacity="0.7" />
          <path d="M35 50 L40 60 L45 50" fill="#9B59B6" opacity="0.5" />
          <circle cx="24" cy="20" r="2" fill="white" />
        </svg>
      ),
      badge: (
        <span className="text-[8px] font-bold text-sage bg-sage/15 px-1.5 py-0.5 rounded-full">✨ Story saved</span>
      ),
    },
    {
      title: "House Rocket",
      child: "Mia, age 3",
      date: "Yesterday",
      bg: "bg-honey-light",
      shape: (
        <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
          <rect y="48" width="80" height="12" fill="#6B9678" />
          <rect x="20" y="28" width="40" height="22" fill="#FAF4EB" stroke="#E8572D" strokeWidth="1.5" />
          <polygon points="15,30 40,10 65,30" fill="#C03E18" />
          <rect x="32" y="38" width="16" height="12" rx="8 8 0 0" fill="#241F1C" opacity="0.6" />
          <ellipse cx="62" cy="18" rx="4" ry="10" fill="#E8572D" />
          <circle cx="62" cy="8" r="3" fill="#C03E18" />
        </svg>
      ),
      badge: (
        <span className="text-[8px] font-bold text-coral bg-coral/10 px-1.5 py-0.5 rounded-full">🎙 0:42</span>
      ),
    },
    {
      title: "Rainbow Garden",
      child: "Sam, age 5",
      date: "3 days ago",
      bg: "bg-sage-light",
      shape: (
        <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
          <rect y="44" width="80" height="16" fill="#6B9678" opacity="0.7" />
          <circle cx="20" cy="42" r="10" fill="#6B9678" opacity="0.8" />
          <circle cx="40" cy="38" r="14" fill="#6B9678" opacity="0.7" />
          <circle cx="60" cy="42" r="10" fill="#6B9678" opacity="0.8" />
          <rect x="38" y="44" width="4" height="16" fill="#6D6058" />
          <circle cx="18" cy="16" r="8" fill="#F0A130" opacity="0.75" />
          <path d="M30 30 Q40 10 50 30" stroke="#E8572D" strokeWidth="2" fill="none" />
          <path d="M28 32 Q40 8 52 32" stroke="#F0A130" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      badge: (
        <span className="text-[8px] font-bold text-muted bg-ink/8 px-1.5 py-0.5 rounded-full">Add story</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full bg-parchment">
      {/* Dynamic island */}
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-[100px] h-[28px] bg-ink rounded-full" />
      </div>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-3 flex-shrink-0">
        <div>
          <p className="text-[9px] text-muted">Good evening</p>
          <p className="text-[13px] font-bold text-ink">My Memories</p>
        </div>
        <div className="w-7 h-7 bg-coral rounded-full flex items-center justify-center shadow-sm shadow-coral/30">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      {/* Cards */}
      <div className="flex-1 px-3 space-y-2 overflow-hidden">
        {memories.map((m) => (
          <div key={m.title} className="bg-white rounded-xl flex overflow-hidden shadow-sm">
            <div className={`w-[70px] h-[60px] flex-shrink-0 ${m.bg} flex items-center justify-center p-1`}>
              {m.shape}
            </div>
            <div className="px-3 py-2 flex flex-col justify-center gap-0.5 flex-1 min-w-0">
              <p className="text-[11px] font-bold text-ink truncate">{m.title}</p>
              <p className="text-[9px] text-muted">{m.child} · {m.date}</p>
              {m.badge}
            </div>
          </div>
        ))}
      </div>
      {/* Bottom tabs */}
      <div className="flex justify-around items-center px-4 py-3 border-t border-ink/5 flex-shrink-0">
        {["home", "gallery", "book", "settings"].map((icon, i) => (
          <div key={icon} className={`w-5 h-5 rounded ${i === 0 ? "text-coral" : "text-muted/40"}`}>
            <svg fill="none" stroke="currentColor" strokeWidth={i === 0 ? 2.5 : 1.8} viewBox="0 0 24 24" className="w-full h-full">
              {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
              {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
              {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
              {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecordScreen() {
  const bars = [3, 7, 5, 9, 4, 8, 5, 7, 3, 9, 6, 7, 4, 8, 5, 9, 4, 6];
  return (
    <div className="flex flex-col h-full bg-parchment">
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-[100px] h-[28px] bg-ink rounded-full" />
      </div>
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-2 pb-3 flex-shrink-0">
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <p className="text-[13px] font-bold text-ink">New Memory</p>
      </div>
      {/* Drawing thumbnail */}
      <div className="mx-4 rounded-2xl overflow-hidden bg-honey-light h-[110px] flex items-center justify-center flex-shrink-0 mb-3">
        <svg viewBox="0 0 140 100" className="w-36 h-28" fill="none">
          <rect width="140" height="100" fill="#FEF0D4"/>
          <circle cx="22" cy="20" r="11" fill="#F0A130" opacity="0.75"/>
          <rect y="80" width="140" height="20" fill="#6B9678"/>
          <rect x="28" y="50" width="68" height="34" fill="#FAF4EB" stroke="#E8572D" strokeWidth="1.5"/>
          <polygon points="20,52 62,20 104,52" fill="#C03E18"/>
          <rect x="50" y="65" width="24" height="19" rx="12 12 0 0" fill="#241F1C" opacity="0.7"/>
          <rect x="34" y="58" width="14" height="12" rx="2" fill="#F0A130" opacity="0.8"/>
          <rect x="76" y="58" width="14" height="12" rx="2" fill="#F0A130" opacity="0.8"/>
          <ellipse cx="118" cy="30" rx="5" ry="14" fill="#E8572D"/>
          <circle cx="118" cy="16" r="5" fill="#C03E18"/>
        </svg>
      </div>
      {/* Record button */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0 mb-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-400/20 scale-125 animate-ping" />
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 relative z-10">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm7 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V22H8v2h8v-2h-3v-1.06A9 9 0 0 0 21 12z"/>
            </svg>
          </div>
        </div>
        <p className="text-[10px] font-bold text-red-500 tracking-wider uppercase">Recording · 0:38</p>
      </div>
      {/* Waveform */}
      <div className="flex items-end justify-center gap-[2px] h-8 px-8 flex-shrink-0 mb-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-coral rounded-full"
            style={{ height: `${Math.min(h * 3, 30)}px`, opacity: 0.4 + (i % 4) * 0.14 }}
          />
        ))}
      </div>
      {/* Transcript preview */}
      <div className="mx-4 bg-white rounded-xl p-3 flex-1">
        <p className="text-[9px] text-muted font-medium mb-1.5 uppercase tracking-wide">What they&apos;re saying</p>
        <p className="text-[10px] text-ink leading-relaxed">
          &ldquo;It&apos;s a house... but also it has a rocket on top because the house wanted to go to the moon and visit the moon people and...&rdquo;
        </p>
      </div>
    </div>
  );
}

function StoryScreen() {
  return (
    <div className="flex flex-col h-full bg-parchment">
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-[100px] h-[28px] bg-ink rounded-full" />
      </div>
      {/* Nav */}
      <div className="flex items-center gap-2 px-4 pt-2 pb-3 flex-shrink-0">
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <p className="text-[13px] font-bold text-ink">House Rocket</p>
      </div>
      {/* Mini drawing + meta */}
      <div className="flex items-center gap-3 px-4 pb-3 flex-shrink-0">
        <div className="w-14 h-14 rounded-xl bg-honey-light flex items-center justify-center flex-shrink-0 overflow-hidden">
          <svg viewBox="0 0 60 50" fill="none" className="w-12 h-10">
            <rect y="38" width="60" height="12" fill="#6B9678"/>
            <rect x="10" y="22" width="40" height="18" fill="#FAF4EB" stroke="#E8572D" strokeWidth="1.5"/>
            <polygon points="5,24 30,6 55,24" fill="#C03E18"/>
            <rect x="22" y="30" width="16" height="10" rx="8 8 0 0" fill="#241F1C" opacity="0.6"/>
            <ellipse cx="50" cy="14" rx="3" ry="8" fill="#E8572D"/>
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold text-ink">House Rocket</p>
          <p className="text-[9px] text-muted">Mia, age 3 · May 22</p>
        </div>
      </div>
      {/* Story card */}
      <div className="mx-3 rounded-2xl overflow-hidden flex-1 flex flex-col" style={{background: 'linear-gradient(135deg, #FDE8DF, #FEF0D4)'}}>
        <div className="px-4 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-coral" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p className="text-[9px] font-bold text-muted uppercase tracking-wide">Story</p>
          </div>
          <span className="text-[8px] font-bold text-white bg-coral px-2 py-0.5 rounded-full uppercase tracking-wide">Review</span>
        </div>
        <div className="flex-1 px-4 overflow-hidden">
          <p className="text-[10px] text-ink leading-relaxed">
            Once upon a time, there was a little house who dreamed of touching the stars. Every night, while the other houses slept peacefully, this house gazed up at the moon and wondered...
          </p>
        </div>
        {/* Actions */}
        <div className="px-3 pb-3 pt-2 space-y-1.5 flex-shrink-0">
          <div className="bg-coral rounded-xl flex items-center justify-center py-2">
            <p className="text-[10px] font-bold text-white">Save Story</p>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-white/60 rounded-xl flex items-center justify-center py-1.5">
              <p className="text-[9px] font-medium text-muted">Discard</p>
            </div>
            <div className="flex-1 bg-coral/15 rounded-xl flex items-center justify-center py-1.5">
              <p className="text-[9px] font-medium text-coral">Regenerate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BedtimeScreen() {
  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'linear-gradient(to bottom, #2A1E0F, #1C1208)' }}
    >
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-[100px] h-[28px] bg-white/10 rounded-full" />
      </div>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2 flex-shrink-0">
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white/55" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-coral" />
          <p className="text-[9px] text-white/45 font-medium">AI Voice · Reading…</p>
        </div>
        <div className="w-8" />
      </div>
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[[12,8],[25,15],[70,6],[85,10],[8,25],[50,20],[90,18],[35,30]].map(([x,y], i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-amber-100/30" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </div>
      {/* Moon */}
      <div className="flex justify-center py-4 flex-shrink-0">
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#F0A130', filter: 'drop-shadow(0 0 12px rgba(240,161,48,0.4))' }}>
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
        </svg>
      </div>
      {/* Story text */}
      <div className="flex-1 px-6 flex items-center">
        <p className="text-[11px] leading-[1.9] text-center text-white/75 font-light tracking-wide">
          Once upon a time, there was a little house who dreamed of touching the{" "}
          <span className="text-coral font-bold">stars</span>
          . Every night, while the other houses slept peacefully, this house gazed up at the moon and wondered what it would feel like to fly.
        </p>
      </div>
      {/* Pause button */}
      <div className="flex justify-center pb-8 flex-shrink-0">
        <div className="w-14 h-14 bg-white/12 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white/85" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function DrawScreen() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Dynamic island */}
      <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-[100px] h-[28px] bg-ink rounded-full" />
      </div>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2 flex-shrink-0 border-b border-ink/6">
        <span className="text-[10px] text-muted font-medium">Cancel</span>
        <p className="text-[12px] font-bold text-ink">Draw Together</p>
        <span className="text-[10px] text-coral font-bold opacity-40">Use Drawing</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <svg viewBox="0 0 248 370" className="w-full h-full" fill="none">
          {/* Sky */}
          <rect width="248" height="370" fill="#F8F9FA" />
          {/* Sun */}
          <circle cx="208" cy="38" r="24" fill="#F0A130" opacity="0.88" />
          {/* Clouds */}
          <ellipse cx="54" cy="40" rx="26" ry="14" fill="#EEF3FF" />
          <ellipse cx="70" cy="31" rx="19" ry="14" fill="#EEF3FF" />
          <ellipse cx="37" cy="34" rx="17" ry="12" fill="#EEF3FF" />
          {/* Ground */}
          <rect x="0" y="298" width="248" height="72" fill="#6B9678" opacity="0.52" />
          {/* House body */}
          <rect x="62" y="188" width="124" height="118" fill="white" stroke="#E8572D" strokeWidth="3.5" />
          {/* Roof */}
          <polygon points="46,190 124,108 202,190" fill="#C03E18" />
          {/* Door */}
          <rect x="99" y="238" width="50" height="68" rx="25 25 0 0" fill="#8B6F5E" />
          {/* Windows */}
          <rect x="70" y="208" width="34" height="24" rx="4" fill="#B0D8F5" opacity="0.9" />
          <rect x="144" y="208" width="34" height="24" rx="4" fill="#B0D8F5" opacity="0.9" />
          {/* Rainbow */}
          <path d="M8,294 Q124,96 240,294" stroke="#E8572D" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M19,298 Q124,112 229,298" stroke="#F0A130" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M30,302 Q124,128 218,302" stroke="#FFD93F" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Active blue stroke being drawn */}
          <path
            d="M48,172 Q72,138 100,154 Q124,167 148,147 Q168,130 192,150"
            stroke="#4A9EE8" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        {/* Active color indicator dot */}
        <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full border-[2.5px] border-white shadow-md" style={{ background: '#4A9EE8' }} />
      </div>

      {/* PencilKit toolbar */}
      <div className="mx-2 mb-2 mt-1 bg-[#F5F5F5] rounded-xl flex items-center px-3 py-2 gap-2 flex-shrink-0 border border-ink/5">
        {/* Tool icons */}
        {[false, true, false].map((active, i) => (
          <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center ${active ? 'bg-[#4A9EE8]/15' : ''}`}>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
              {i === 0 && (
                <path d="M15.5 2.5l2 2-11 11H4.5v-2l11-11z" stroke={active ? "#4A9EE8" : "#8B7E76"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {i === 1 && (
                <>
                  <path d="M3 16l5-5m0 0l7-7a2 2 0 012.8 2.8l-7 7" stroke={active ? "#4A9EE8" : "#8B7E76"} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 11l-4 5" stroke={active ? "#4A9EE8" : "#8B7E76"} strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
              {i === 2 && (
                <path d="M4 12l4-4 4 4 4-4M2 17h16" stroke={active ? "#4A9EE8" : "#8B7E76"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>
        ))}
        <div className="w-px h-5 bg-ink/10 mx-0.5" />
        {/* Color swatches */}
        {['#E8572D', '#F0A130', '#4A9EE8', '#6B9678', '#241F1C'].map((color, i) => (
          <div
            key={i}
            className="w-[17px] h-[17px] rounded-full flex-shrink-0"
            style={{
              background: color,
              boxShadow: i === 2 ? `0 0 0 2px ${color}, 0 0 0 3.5px white, 0 0 0 4.5px ${color}` : 'none',
              transform: i === 2 ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ screen, key: _ }: { screen: Screen; key: string }) {
  return (
    <div className="relative w-[268px] mx-auto">
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-5 bg-white/5 blur-2xl rounded-full" />
      <div className="relative bg-[#1a1a1a] rounded-[3.2rem] p-[10px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
        <div className="rounded-[2.6rem] overflow-hidden h-[540px]">
          <div className="animate-fade-in h-full">
            {screen === "gallery"  && <GalleryScreen />}
            {screen === "record"   && <RecordScreen />}
            {screen === "story"    && <StoryScreen />}
            {screen === "bedtime"  && <BedtimeScreen />}
            {screen === "draw"     && <DrawScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */

export function AppPreview() {
  const [active, setActive] = useState<Screen>("gallery");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive(prev => {
        const idx = SCREENS.indexOf(prev);
        return SCREENS[(idx + 1) % SCREENS.length];
      });
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const current = TABS.find(t => t.id === active)!;

  return (
    <section className="py-28 px-6 bg-ink overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-coral font-semibold text-sm uppercase tracking-widest">Live preview</span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold text-white leading-tight">
            See it in your hands
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-lg mx-auto">
            Tap through every moment — from the first photo to the last goodnight.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => { setActive(tab.id); setPaused(true); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === tab.id
                  ? "bg-coral text-white shadow-lg shadow-coral/30"
                  : "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white/80"
              }`}
            >
              <span className="text-[11px] font-bold text-white/40">{String(i + 1).padStart(2, "0")}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Phone + description */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <PhoneFrame screen={active} key={active} />
          </div>

          {/* Description */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <div className="animate-fade-in" key={active + "-desc"}>
              {/* Step indicator */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-coral/15 rounded-lg flex items-center justify-center">
                  <span className="text-coral text-xs font-bold">{String(SCREENS.indexOf(active) + 1).padStart(2,"0")}</span>
                </div>
                <div className="flex gap-1.5">
                  {SCREENS.map(s => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-500 ${s === active ? "w-6 bg-coral" : "w-1.5 bg-white/20"}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight mb-4">
                {current.desc}
              </h3>
              <p className="text-white/55 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                {current.subdesc}
              </p>

              {/* Auto-advance indicator */}
              {!paused && (
                <div className="mt-8 flex items-center gap-2 text-white/30 text-xs justify-center lg:justify-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                  Auto-advancing · tap any step to pause
                </div>
              )}
              {paused && (
                <button
                  onClick={() => setPaused(false)}
                  className="mt-8 flex items-center gap-2 text-white/40 text-xs hover:text-white/60 transition-colors mx-auto lg:mx-0"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Resume auto-play
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
