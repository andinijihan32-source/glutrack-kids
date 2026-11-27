"use client";

import React from "react";

export function SiGluLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <div className={`relative shrink-0 ${compact ? "w-11 h-11" : "w-16 h-16"}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          <path d="M 16 74 A 46 46 0 1 1 104 74" fill="none" stroke="#00B4A6" strokeWidth="8" strokeLinecap="round" />
          <path d="M 55 16 C 55 16 32 45 32 63 C 32 76 42 86 55 86 C 68 86 78 76 78 63 C 78 45 55 16 55 16 Z" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="4" />
          <ellipse cx="43" cy="52" rx="3" ry="7" transform="rotate(-20 43 52)" fill="#FDA4AF" />
          <circle cx="48" cy="62" r="4" fill="#1E293B" />
          <circle cx="47" cy="61" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="62" r="4" fill="#1E293B" />
          <circle cx="62" cy="61" r="1.5" fill="#FFFFFF" />
          <circle cx="42" cy="68" r="3.5" fill="#FB7185" />
          <circle cx="68" cy="68" r="3.5" fill="#FB7185" />
          <path d="M 50 68 Q 55.5 76 61 68 Z" fill="#881337" />
          <rect x="20" y="54" width="13" height="16" rx="6" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="3" />
          <rect x="24" y="45" width="6" height="12" rx="3" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="3" />
          <path d="M 76 42 L 94 36 L 110 42 L 110 58 C 110 70 94 78 94 78 C 94 78 76 70 76 58 Z" fill="#FFFFFF" stroke="#00B4A6" strokeWidth="4" />
          <path d="M 94 46 V 66 M 84 56 H 104" stroke="#00B4A6" strokeWidth="5" strokeLinecap="round" />
          <circle cx="24" cy="96" r="11" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 24 85 Q 29 79 33 83 Q 28 87 24 85 Z" fill="#4ADE80" />
          <path d="M 35 102 L 49 88 L 54 93 L 40 107 Z" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="82" y="84" width="14" height="22" rx="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="85" y="79" width="8" height="5" rx="2" fill="#0284C7" />
        </svg>
      </div>
      <div>
        <div className={`font-black tracking-tight text-brand-teal leading-none ${compact ? "text-lg" : "text-2xl"}`}>
          GLUTRACK
        </div>
        <div className={`font-black tracking-wider flex items-center gap-0.5 leading-none mt-0.5 ${compact ? "text-sm" : "text-xl"}`}>
          <span className="text-brand-pink">K</span>
          <span className="text-amber-400">I</span>
          <span className="text-emerald-500">D</span>
          <span className="text-purple-500">S</span>
        </div>
      </div>
    </div>
  );
}

export function HappyKidsHeroArt() {
  return (
    <svg viewBox="0 0 360 210" className="w-full max-w-[330px] h-auto drop-shadow-md select-none">
      <circle cx="180" cy="110" r="88" fill="#E0F7FA" />
      <circle cx="180" cy="110" r="70" fill="#B2EBF2" opacity="0.55" />
      <path d="M 285 38 L 292 26 M 302 48 L 315 44 M 298 63 L 310 68" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />

      <g transform="translate(42, 32)">
        <path d="M 24 112 C 24 92 78 92 78 112 L 84 148 L 18 148 Z" fill="#00B4A6" />
        <path d="M 40 96 L 51 115 L 62 96 Z" fill="#FFFFFF" />
        <circle cx="51" cy="68" r="30" fill="#FED7AA" />
        <path d="M 21 62 A 30 28 0 0 1 81 62 Z" fill="#00B4A6" />
        <path d="M 52 54 L 92 60 Q 75 68 50 62 Z" fill="#38BDF8" />
        <path d="M 36 68 Q 41 62 46 68" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 56 68 Q 61 62 66 68" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="33" cy="75" r="4" fill="#FDA4AF" />
        <circle cx="69" cy="75" r="4" fill="#FDA4AF" />
        <path d="M 43 76 Q 51 87 59 76 Z" fill="#F43F5E" />
      </g>

      <g transform="translate(205, 34)">
        <path d="M 16 66 C 16 32 86 32 86 66 L 94 138 L 10 138 Z" fill="#FB7185" />
        <path d="M 20 112 C 20 94 82 94 82 112 L 88 146 L 14 146 Z" fill="#F43F5E" />
        <circle cx="51" cy="68" r="27" fill="#FED7AA" />
        <path d="M 37 68 Q 42 62 47 68" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 55 68 Q 60 62 65 68" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="34" cy="74" r="4" fill="#FDA4AF" />
        <circle cx="68" cy="74" r="4" fill="#FDA4AF" />
        <path d="M 44 76 Q 51 86 58 76 Z" fill="#E11D48" />
      </g>

      <g transform="translate(142, 95)">
        <path d="M 38 4 L 72 16 L 72 46 C 72 68 38 84 38 84 C 38 84 4 68 4 46 L 4 16 Z" fill="#FFFFFF" stroke="#00B4A6" strokeWidth="6" />
        <path d="M 38 24 V 58 M 21 41 H 55" stroke="#00B4A6" strokeWidth="9" strokeLinecap="round" />
        <path d="M 22 72 Q 56 76 76 48" fill="none" stroke="#4ADE80" strokeWidth="7" strokeLinecap="round" />
        <polygon points="78,38 66,50 82,55" fill="#4ADE80" />
      </g>

      <g transform="translate(65, 145)">
        <path d="M 10 26 H 74 C 72 44 58 52 42 52 C 26 52 12 44 10 26 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        <circle cx="26" cy="22" r="9" fill="#4ADE80" />
        <circle cx="42" cy="19" r="10" fill="#22C55E" />
        <circle cx="57" cy="22" r="9" fill="#FACC15" />
        <circle cx="76" cy="36" r="13" fill="#EF4444" />
        <path d="M 76 23 Q 82 17 86 21" stroke="#16A34A" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}
