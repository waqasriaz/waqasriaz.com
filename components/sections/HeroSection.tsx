"use client";

import Link from "next/link";
import { ParallaxBlobs, Typewriter } from "@/components/animations";

const typewriterTexts = [
  "Building digital products that scale.",
  "Creator of Houzez & Homey themes.",
  "Powering 60,000+ websites worldwide.",
  "Turning ideas into reality.",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-white">
      {/* Animated Background */}
      <ParallaxBlobs />

      {/* Tech Moving Lines */}
      <div className="tech-lines">
        <div className="tech-line tech-line-1" />
        <div className="tech-line tech-line-2" />
        <div className="tech-line tech-line-3" />
        <div className="tech-line-vertical tech-line-v1" />
        <div className="tech-line-vertical tech-line-v2" />
      </div>

      {/* Code Brackets */}
      <div className="tech-bracket bracket-left">&lt;/&gt;</div>
      <div className="tech-bracket bracket-right">{"{ }"}</div>

      {/* Floating Code Snippets */}
      <div className="code-snippets">
        <span className="code-snippet snippet-1">const</span>
        <span className="code-snippet snippet-2">function</span>
        <span className="code-snippet snippet-3">=&gt;</span>
        <span className="code-snippet snippet-4">npm</span>
        <span className="code-snippet snippet-5">async</span>
      </div>

      {/* Pulsing Tech Nodes */}
      <div className="tech-nodes">
        <div className="tech-node node-1" />
        <div className="tech-node node-2" />
        <div className="tech-node node-3" />
        <div className="tech-node node-4" />
      </div>

      {/* Additional Code Symbols */}
      <div className="code-symbol symbol-1">//</div>
      <div className="code-symbol symbol-2">&amp;&amp;</div>
      <div className="code-symbol symbol-3">#</div>

      {/* Binary Stream */}
      <div className="binary-stream stream-1">01010</div>
      <div className="binary-stream stream-2">10101</div>

      {/* Center Floating Elements */}
      <div className="center-elements">
        <span className="center-code center-code-1">=&gt;</span>
        <span className="center-code center-code-2">::</span>
        <span className="center-code center-code-3">||</span>
        <span className="center-code center-code-4">[ ]</span>
        <span className="center-code center-code-5">( )</span>
        <span className="center-code center-code-6">;</span>
        <div className="center-dot center-dot-1" />
        <div className="center-dot center-dot-2" />
        <div className="center-dot center-dot-3" />
        <div className="center-dot center-dot-4" />
        <div className="center-dot center-dot-5" />
        <div className="center-ring center-ring-1" />
        <div className="center-ring center-ring-2" />
        <div className="center-line center-line-1" />
        <div className="center-line center-line-2" />
      </div>

      {/* Extra Coding Animations */}
      <div className="extra-code-elements">
        <span className="extra-code extra-top-1">&lt;div&gt;</span>
        <span className="extra-code extra-top-2">import</span>
        <span className="extra-code extra-top-3">export</span>
        <span className="extra-code extra-top-4 terminal-cursor">_</span>
        <span className="extra-code extra-left-1">return</span>
        <span className="extra-code extra-left-2">await</span>
        <span className="extra-code extra-left-3">.map()</span>
        <span className="extra-code extra-right-1">props</span>
        <span className="extra-code extra-right-2">state</span>
        <span className="extra-code extra-right-3">{"{}"}</span>
        <span className="extra-code extra-bottom-1">React</span>
        <span className="extra-code extra-bottom-2">Node.js</span>
        <span className="extra-code extra-bottom-3">MongoDB</span>
        <span className="extra-code center-bottom-1">Next.js</span>
        <span className="extra-code center-bottom-2">TypeScript</span>
        <span className="extra-code center-bottom-3">Tailwind</span>
        <span className="extra-code extra-scatter-1">===</span>
        <span className="extra-code extra-scatter-2">!==</span>
        <span className="extra-code extra-scatter-3">??</span>
        <span className="extra-code extra-scatter-4">?.</span>
        <span className="extra-code extra-scatter-5">...</span>
        <span className="extra-code extra-scatter-6">=&gt;</span>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <span className="hero-animate hero-animate-1 badge-glow inline-flex items-center gap-2 bg-white/80 backdrop-blur-lg text-[#5b21b6] text-sm font-medium px-5 py-2 rounded-full border border-slate-200/50 mb-6">
              <span className="badge-dot w-2 h-2 bg-[#5b21b6] rounded-full" />
              <span className="role-text">Software Developer</span>
            </span>

            {/* Title */}
            <h1 className="hero-animate hero-animate-2 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Hi, I&apos;m Waqas Riaz
            </h1>

            {/* Typewriter */}
            <div className="hero-animate hero-animate-3 text-lg md:text-xl font-semibold text-slate-900 mb-4 min-h-[2rem]">
              <Typewriter texts={typewriterTexts} />
            </div>

            {/* Subtitle */}
            <p className="hero-animate hero-animate-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Creator of Houzez & Homey - WordPress themes powering 60,000+ real estate and vacation rental websites worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate hero-animate-5 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link href="#portfolio" className="btn-neo btn-neo-primary">
                View My Work
              </Link>
              <Link href="/contact" className="btn-neo btn-neo-secondary">
                Get in Touch
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="hero-animate hero-animate-6 mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-900">60K+</span>
                <span>websites powered</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-300" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-900">10+</span>
                <span>years experience</span>
              </div>
            </div>
          </div>

          {/* Profile Image - Right */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative profile-frame">
              {/* Orbiting dots */}
              <div className="orbit-container">
                <div className="orbit-dot orbit-dot-1" />
                <div className="orbit-dot orbit-dot-2" />
                <div className="orbit-dot orbit-dot-3" />
              </div>
              {/* Glow effect */}
              <div className="profile-glow" />
              {/* Profile image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile-3.jpeg"
                alt="Waqas Riaz - Software Developer"
                className="hero-image-animate w-56 h-56 sm:w-72 sm:h-72 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] rounded-full object-cover border-4 border-white shadow-2xl shadow-slate-900/10 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
