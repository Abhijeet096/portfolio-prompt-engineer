import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Prompts", "Tools", "Content", "Contact"];

const PROJECTS = [
  {
    id: 1,
    tag: "AI-Powered Platform",
    title: "Stively",
    subtitle: "Content & Career Platform",
    url: "https://stively.com",
    metrics: ["10K+ Monthly Readers", "50+ Articles", "AI-Curated Content"],
    desc: "Built a full content platform serving technology, lifestyle, and business readers. Used AI-assisted workflows for article ideation, SEO structuring, and content editing. Reduced content production time by 60%.",
    stack: ["React.js", "Node.js", "MongoDB", "ChatGPT", "Canva AI"],
    accent: "#00e5ff",
  },
  {
    id: 2,
    tag: "AI Career Tool",
    title: "Career.Stively",
    subtitle: "AI-Powered DSA & Interview Prep",
    url: "https://career.stively.com",
    metrics: ["1000+ Coding Questions", "50+ Interview Topics", "AI Learning Paths"],
    desc: "Designed an AI-driven learning platform for engineering students. Personalized roadmaps, AI-generated practice tests, and structured DSA mastery paths. Built with prompt-engineered content generation.",
    stack: ["React.js", "Express.js", "MongoDB", "OpenAI API", "JWT Auth"],
    accent: "#a78bfa",
  },
  {
    id: 3,
    tag: "Agency Website",
    title: "Agency.Stively",
    subtitle: "Web Development Agency",
    url: "https://agency.stively.com",
    metrics: ["Client-Facing", "AI-Built UI", "Vibe Coded"],
    desc: "A professional agency site built entirely using AI-assisted development (vibe coding). Demonstrates the full workflow: prompt → design → code → deploy, with zero traditional design tools.",
    stack: ["React.js", "Tailwind CSS", "Claude AI", "Vercel"],
    accent: "#34d399",
  },
  {
    id: 4,
    tag: "Research Paper",
    title: "Cybersecurity Awareness Study",
    subtitle: "Survey-Based Academic Research",
    url: "https://stively.com/blog/cybersecurityawareness",
    metrics: ["Published Apr 2026", "J.UCS Format", "Co-authored"],
    desc: "Co-authored a research paper on cybersecurity awareness among college students. Used AI tools for literature review, data analysis narrative, and academic formatting to J.UCS journal standards.",
    stack: ["AI Writing Tools", "Research Methodology", "Data Analysis", "LaTeX"],
    accent: "#f59e0b",
  },
];

const PROMPT_CASES = [
  {
    id: 1,
    title: "Article Hook Generator",
    context: "Writing SEO content for AI & freelancing articles on Stively",
    bad_prompt: "Write an intro about AI and freelancing",
    good_prompt: `Write a 3-sentence hook for an article titled "Can AI Replace Freelancers?" targeting Indian freelancers aged 22–35. Open with a surprising statistic, build tension around job security, end with a question that forces them to keep reading. Tone: conversational but urgent.`,
    result: "3x higher scroll depth, average read time increased from 1.2 min → 3.8 min",
    lesson: "Specificity of audience + format + emotional goal = dramatically better outputs",
    tag: "Content Creation",
  },
  {
    id: 2,
    title: "React Component Builder",
    context: "Vibe coding UI components for career.stively.com",
    bad_prompt: "Make a dashboard card component",
    good_prompt: `Create a React functional component for a DSA progress card. It should show: topic name, completion percentage as an animated circular progress ring (CSS only), difficulty badge (Easy/Medium/Hard with color coding), and a "Continue" button. Use Tailwind CSS. Dark theme with #0f172a background. Export as default.`,
    result: "Component worked first try, no debugging needed. Saved ~2 hours of iteration.",
    lesson: "Specifying visual behavior, tech constraints, and color scheme eliminates revision loops",
    tag: "Development",
  },
  {
    id: 3,
    title: "YouTube Script Optimizer",
    context: "Paise Ka Funda YouTube channel — money & earning content",
    bad_prompt: "Write a YouTube script about freelancing income",
    good_prompt: `Write a 3-minute YouTube script in Hinglish (Hindi-English mix) for a video titled "₹50,000/month as a Fresher — Real or Fake?" Target audience: Indian college students aged 18–24 who want to earn online. Structure: hook (0-15 sec with a bold claim), reality check (15-60 sec), actionable breakdown (60-150 sec), honest CTA (150-180 sec). Avoid hype. Be realistic.`,
    result: "Script used with 0 edits. Video got above-average retention compared to channel baseline.",
    lesson: "Language style + audience specificity + structure outline = production-ready scripts",
    tag: "Video Production",
  },
  {
    id: 4,
    title: "SEO Meta Description Writer",
    context: "Optimizing Stively articles for Google search",
    bad_prompt: "Write a meta description for my AI article",
    good_prompt: `Write a 155-character meta description for an article about "Top AI Tools Replacing Jobs in 2025". Include the primary keyword naturally. Create urgency without clickbait. Target someone Googling "will AI take my job". End with an implied benefit.`,
    result: "CTR improved by 22% on articles using this prompt template over 3 months",
    lesson: "Character limits + keyword intent + emotional trigger = meta descriptions that actually get clicked",
    tag: "SEO & Marketing",
  },
  {
    id: 5,
    title: "Canva Design Brief Generator",
    context: "Creating thumbnails and social graphics for Stively content",
    bad_prompt: "Help me design a YouTube thumbnail",
    good_prompt: `Generate a detailed Canva design brief for a YouTube thumbnail for a video about "AI replacing freelancers". Include: dominant color (high contrast for mobile), 1 bold text element (max 5 words, suggest the exact text), 1 facial expression description if a face is used, background style, and which Canva template category to search. Output as a checklist I can follow in 10 minutes.`,
    result: "Thumbnail design time cut from 45 min → 12 min. More consistent visual brand across videos.",
    lesson: "Treating AI as a creative brief generator (not the final designer) works better for visual work",
    tag: "Design",
  },
];

const AI_TOOLS = [
  { name: "ChatGPT (GPT-4o)", use: "Article drafting, prompt iteration, code explanation", level: 90, color: "#10b981" },
  { name: "Claude (Anthropic)", use: "Long-form content, code generation, research analysis", level: 85, color: "#a78bfa" },
  { name: "Canva AI", use: "Thumbnail design, social graphics, brand assets", level: 80, color: "#f59e0b" },
  { name: "GitHub Copilot", use: "AI-assisted coding, autocomplete in MERN projects", level: 75, color: "#00e5ff" },
  { name: "CapCut AI", use: "AI video editing, auto-captions, background removal", level: 70, color: "#f43f5e" },
  { name: "DaVinci Resolve", use: "Professional video editing, color grading", level: 65, color: "#818cf8" },
  { name: "Midjourney / DALL-E", use: "AI image generation for articles and thumbnails", level: 60, color: "#34d399" },
  { name: "Perplexity AI", use: "Research and fact-checking for articles", level: 75, color: "#fb923c" },
];

const STATS = [
  { value: "10K+", label: "Monthly Readers" },
  { value: "50+", label: "Published Articles" },
  { value: "3", label: "Live Platforms" },
  { value: "8+", label: "AI Tools Mastered" },
];

const AI_VIDEOS = [
  {
    id: "JT2Xoklf3lY",
    url: "https://youtube.com/shorts/JT2Xoklf3lY",
    title: "AI Generated Short #1",
    tag: "AI Video",
  },
  {
    id: "p0B-7wu5Y7k",
    url: "https://youtube.com/shorts/p0B-7wu5Y7k",
    title: "AI Generated Short #2",
    tag: "AI Video",
  },
  {
    id: "Jlr7IAC8IEI",
    url: "https://youtube.com/shorts/Jlr7IAC8IEI",
    title: "AI Generated Short #3",
    tag: "AI Video",
  },
  {
    id: "UTYNgc22XV8",
    url: "https://youtube.com/shorts/UTYNgc22XV8",
    title: "AI Generated Short #4",
    tag: "AI Video",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [activePrompt, setActivePrompt] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleStats(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("tradeabhiyt@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Mono', 'Fira Code', monospace", background: "#080c10", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00e5ff33; color: #00e5ff; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: #00e5ff44; border-radius: 2px; }

        .syne { font-family: 'Syne', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }

        .nav-link {
          color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;
          cursor: pointer; transition: color 0.2s; padding: 6px 0;
          font-family: 'DM Mono', monospace;
        }
        .nav-link:hover { color: #00e5ff; }

        .glow-btn {
          background: transparent; border: 1px solid #00e5ff44; color: #00e5ff;
          padding: 10px 24px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s; font-family: 'DM Mono', monospace;
          position: relative; overflow: hidden;
        }
        .glow-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #00e5ff11; opacity: 0; transition: opacity 0.2s;
        }
        .glow-btn:hover::before { opacity: 1; }
        .glow-btn:hover { border-color: #00e5ff88; box-shadow: 0 0 20px #00e5ff22; }

        .tag-pill {
          display: inline-block; padding: 3px 10px; font-size: 10px;
          border: 1px solid; border-radius: 2px; letter-spacing: 0.08em; text-transform: uppercase;
          font-family: 'DM Mono', monospace;
        }

        .project-card {
          border: 1px solid #1e293b; padding: 1.5rem; cursor: pointer;
          transition: all 0.25s; background: #0d1117;
        }
        .project-card:hover { border-color: #334155; background: #111827; transform: translateY(-2px); }
        .project-card.active { border-color: #00e5ff44; background: #0a1628; }

        .prompt-tab {
          padding: 10px 16px; font-size: 11px; letter-spacing: 0.06em;
          cursor: pointer; border-bottom: 2px solid transparent;
          transition: all 0.2s; color: #475569; text-transform: uppercase;
          font-family: 'DM Mono', monospace; white-space: nowrap;
        }
        .prompt-tab.active { color: #00e5ff; border-bottom-color: #00e5ff; }
        .prompt-tab:hover { color: #94a3b8; }

        .code-block {
          background: #0d1117; border: 1px solid #1e293b; padding: 1rem 1.25rem;
          font-size: 12px; line-height: 1.7; color: #94a3b8; position: relative;
          border-radius: 4px;
        }
        .code-block .keyword { color: #00e5ff; }
        .code-block .string { color: #34d399; }

        .bar-track {
          height: 3px; background: #1e293b; border-radius: 2px; overflow: hidden; flex: 1;
        }
        .bar-fill {
          height: 100%; border-radius: 2px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }

        .grid-bg {
          background-image: linear-gradient(#1e293b22 1px, transparent 1px),
            linear-gradient(90deg, #1e293b22 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .stat-num {
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(2rem, 5vw, 3.5rem);
          background: linear-gradient(135deg, #00e5ff, #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1;
        }

        .section-label {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #00e5ff; font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 8px;
        }
        .section-label::before { content: '//'; opacity: 0.5; }

        .contact-input {
          background: #0d1117; border: 1px solid #1e293b; color: #e2e8f0;
          padding: 12px 16px; font-family: 'DM Mono', monospace; font-size: 13px;
          width: 100%; transition: border-color 0.2s; outline: none;
        }
        .contact-input:focus { border-color: #00e5ff44; }
        .contact-input::placeholder { color: #334155; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 #00e5ff33; } 70% { box-shadow: 0 0 0 12px #00e5ff00; } 100% { box-shadow: 0 0 0 0 #00e5ff00; } }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .blink { animation: blink 1.2s step-end infinite; }
        .pulse-dot { animation: pulse-ring 2s infinite; }

        .hero-tag {
          font-size: 11px; letter-spacing: 0.15em; color: #00e5ff; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
        }
        .hero-tag::before { content: ''; width: 24px; height: 1px; background: #00e5ff; }

        textarea.contact-input { resize: vertical; min-height: 100px; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        background: scrolled ? "#080c10ee" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "1px solid transparent",
        transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "60px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 8, height: 8, background: "#00e5ff", borderRadius: "50%" }} className="pulse-dot" />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", color: "#e2e8f0" }}>
            abhijit<span style={{ color: "#00e5ff" }}>.ai</span>
          </span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: "28px" }}>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
        </div>

        <button className="glow-btn" style={{ fontSize: "11px", padding: "7px 16px" }} onClick={() => scrollTo("contact")}>
          Hire Me →
        </button>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", flexDirection: "column", gap: "4px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 20, height: 1, background: "#94a3b8" }} />)}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "#080c10", borderBottom: "1px solid #1e293b",
          padding: "1rem clamp(1.5rem, 5vw, 4rem)", display: "flex", flexDirection: "column", gap: "0"
        }}>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
              style={{ padding: "12px 0", borderBottom: "1px solid #0f172a" }}>{l}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="about" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px clamp(1.5rem, 8vw, 8rem) 60px", position: "relative", overflow: "hidden" }}>
        {/* scanline effect */}
        <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #00e5ff22, transparent)", animation: "scanline 4s linear infinite", pointerEvents: "none" }} />

        {/* glow orb */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, #00e5ff08 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, background: "radial-gradient(circle, #a78bfa08 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, position: "relative" }}>
          <div className="hero-tag fade-up" style={{ animationDelay: "0.1s", marginBottom: "1.5rem" }}>
            AI Prompt Engineer & Content Creator
          </div>

          <h1 className="syne fade-up" style={{ animationDelay: "0.2s", fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            I build things<br />
            <span style={{ color: "#00e5ff" }}>with AI.</span>
            <span className="blink" style={{ color: "#00e5ff", marginLeft: "4px" }}>_</span>
          </h1>

          <p className="fade-up" style={{ animationDelay: "0.35s", fontSize: "15px", color: "#64748b", lineHeight: 1.8, maxWidth: 560, marginBottom: "2.5rem" }}>
            Software engineering student & co-founder of{" "}
            <a href="https://stively.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00e5ff", textDecoration: "none" }}>Stively</a>{" "}
            — a content & career platform reaching <strong style={{ color: "#94a3b8" }}>10,000+ readers/month</strong>. I design prompts, automate workflows, and ship AI-powered products.
          </p>

          <div className="fade-up" style={{ animationDelay: "0.5s", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="glow-btn" onClick={() => scrollTo("prompts")}>
              View Prompt Work →
            </button>
            <button className="glow-btn" style={{ borderColor: "#334155", color: "#94a3b8" }} onClick={() => scrollTo("projects")}>
              See Projects
            </button>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.65s", display: "flex", gap: "16px", marginTop: "2rem", flexWrap: "wrap" }}>
            {["Stively.com", "Sambhajinagar, MH", "MERN Stack", "Open to Internships"].map(t => (
              <span key={t} className="tag-pill" style={{ borderColor: "#1e293b", color: "#475569" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div ref={statsRef} style={{ background: "#0d1117", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b", padding: "3rem clamp(1.5rem, 8vw, 8rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", maxWidth: 900 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="stat-num" style={{ opacity: visibleStats ? 1 : 0, transition: `opacity 0.5s ${i * 0.15}s` }}>{s.value}</div>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px", fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem clamp(1.5rem, 8vw, 8rem)" }}>
        <div style={{ maxWidth: 1100 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Projects</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Things I've shipped
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#1e293b" }}>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="project-card" onClick={() => setActiveProject(i)}
                style={{ background: activeProject === i ? "#0a1628" : "#0d1117", borderColor: activeProject === i ? p.accent + "44" : "#1e293b" }}>
                <span className="tag-pill" style={{ borderColor: p.accent + "44", color: p.accent, marginBottom: "1rem", display: "inline-block" }}>{p.tag}</span>
                <h3 className="syne" style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "4px" }}>{p.title}</h3>
                <p style={{ fontSize: "12px", color: "#475569", marginBottom: "1rem" }}>{p.subtitle}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                  {p.metrics.map(m => (
                    <span key={m} style={{ fontSize: "10px", color: "#64748b", background: "#111827", padding: "3px 8px", border: "1px solid #1e293b" }}>{m}</span>
                  ))}
                </div>
                {activeProject === i && (
                  <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1rem", marginTop: "0.5rem" }}>
                    <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
                      {p.stack.map(s => (
                        <span key={s} className="tag-pill" style={{ borderColor: "#334155", color: "#64748b" }}>{s}</span>
                      ))}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      style={{ color: p.accent, fontSize: "12px", textDecoration: "none", letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      Visit Site →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPT CASE STUDIES */}
      <section id="prompts" style={{ padding: "6rem clamp(1.5rem, 8vw, 8rem)", background: "#0a0e14" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Prompt Engineering</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Prompt case studies
            </h2>
            <p style={{ fontSize: "14px", color: "#475569" }}>Real prompts I use — with before/after analysis and results.</p>
          </div>

          <div style={{ display: "flex", borderBottom: "1px solid #1e293b", marginBottom: "2rem", overflowX: "auto", gap: "0" }}>
            {PROMPT_CASES.map((p, i) => (
              <button key={p.id} className={`prompt-tab ${activePrompt === i ? "active" : ""}`} onClick={() => setActivePrompt(i)}>
                {String(i + 1).padStart(2, "0")} {p.title}
              </button>
            ))}
          </div>

          {(() => {
            const p = PROMPT_CASES[activePrompt];
            return (
              <div key={p.id} style={{ animation: "fadeUp 0.3s ease both" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
                  <span className="tag-pill" style={{ borderColor: "#00e5ff33", color: "#00e5ff" }}>{p.tag}</span>
                  <span style={{ fontSize: "12px", color: "#475569" }}>{p.context}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#1e293b", marginBottom: "1.5rem" }}>
                  <div className="code-block" style={{ borderRadius: "4px 0 0 4px", border: "1px solid #1e293b" }}>
                    <div style={{ fontSize: "10px", color: "#ef4444", letterSpacing: "0.1em", marginBottom: "0.75rem", textTransform: "uppercase" }}>✗ Weak prompt</div>
                    <span className="string">"{p.bad_prompt}"</span>
                  </div>
                  <div className="code-block" style={{ borderRadius: "0 4px 4px 0", border: "1px solid #00e5ff22", borderLeft: "1px solid #1e293b" }}>
                    <div style={{ fontSize: "10px", color: "#10b981", letterSpacing: "0.1em", marginBottom: "0.75rem", textTransform: "uppercase" }}>✓ Engineered prompt</div>
                    <span className="string" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>"{p.good_prompt}"</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "#0d1117", border: "1px solid #1e293b", padding: "1rem 1.25rem" }}>
                    <div style={{ fontSize: "10px", color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Result</div>
                    <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{p.result}</p>
                  </div>
                  <div style={{ background: "#0d1117", border: "1px solid #1e293b", padding: "1rem 1.25rem" }}>
                    <div style={{ fontSize: "10px", color: "#a78bfa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Key lesson</div>
                    <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>{p.lesson}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* AI TOOLS */}
      <section id="tools" style={{ padding: "6rem clamp(1.5rem, 8vw, 8rem)" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>AI Tools Stack</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              What I use daily
            </h2>
          </div>

          <div style={{ display: "grid", gap: "0", border: "1px solid #1e293b" }}>
            {AI_TOOLS.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 1.25rem", borderBottom: i < AI_TOOLS.length - 1 ? "1px solid #1e293b" : "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#0d1117"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                <div style={{ flex: "0 0 180px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#e2e8f0" }}>{t.name}</div>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: visibleStats ? `${t.level}%` : "0%", background: t.color }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#475569", minWidth: "30px" }}>{t.level}%</span>
                </div>
                <div style={{ flex: "0 0 200px", fontSize: "11px", color: "#475569", textAlign: "right", display: "none" }} className="tool-desc">
                  {t.use}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {AI_TOOLS.slice(0, 4).map(t => (
              <div key={t.name} style={{ background: "#0d1117", border: "1px solid #1e293b", padding: "1rem" }}>
                <div style={{ fontSize: "12px", fontWeight: 500, color: t.color, marginBottom: "6px" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "#475569", lineHeight: 1.6 }}>{t.use}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT / VIDEO */}
      <section id="content" style={{ padding: "6rem clamp(1.5rem, 8vw, 8rem)", background: "#0a0e14" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Content & Video</div>
            <h2 className="syne" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Creating at scale with AI
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "#1e293b" }}>
            {[
              { icon: "📝", title: "AI Article Writing", count: "50+ Published", desc: "End-to-end AI-assisted content pipeline: ideation → outline → draft → edit → publish. Topics span AI, tech, business, and freelancing.", color: "#00e5ff" },
              { icon: "🎬", title: "AI Video Production", count: "YouTube Channel", desc: "Paise Ka Funda — Hindi/Hinglish content on earning online for Indian students. Scripts, voiceovers, and edits powered by AI tools.", color: "#f59e0b" },
              { icon: "🎨", title: "AI Design & Thumbnails", count: "Canva AI + DALL-E", desc: "Thumbnail creation, social graphics, and brand assets. AI-generated visuals with human curation and editing for brand consistency.", color: "#a78bfa" },
              { icon: "⚙️", title: "AI Development Workflow", count: "3 Live Platforms", desc: "Vibe coding methodology: prompt → scaffold → refine → deploy. React + Node.js + MongoDB projects built with AI pair-programming.", color: "#34d399" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#0d1117", padding: "2rem 1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{c.icon}</div>
                <div className="tag-pill" style={{ borderColor: c.color + "44", color: c.color, marginBottom: "0.75rem", display: "inline-block" }}>{c.count}</div>
                <h3 className="syne" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>{c.title}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* AI Generated Videos */}
          <div style={{ marginTop: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
                AI Generated &amp; Edited Videos
              </div>
              <span className="tag-pill" style={{ borderColor: "#f59e0b44", color: "#f59e0b", fontSize: "9px" }}>
                CapCut AI + DaVinci Resolve
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
              {AI_VIDEOS.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", textDecoration: "none", position: "relative", group: "true" }}
                >
                  <div style={{ position: "relative", overflow: "hidden", border: "1px solid #1e293b", background: "#0d1117", transition: "border-color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b66"; e.currentTarget.querySelector('.voverlay').style.opacity = "1"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.querySelector('.voverlay').style.opacity = "0"; }}
                  >
                    {/* YouTube thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                      alt={v.title}
                      style={{ width: "100%", aspectRatio: "9/16", objectFit: "cover", display: "block" }}
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                    {/* Fallback if thumbnail fails */}
                    <div style={{ display: "none", width: "100%", aspectRatio: "9/16", background: "#111827", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "2rem" }}>▶</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="voverlay" style={{
                      position: "absolute", inset: 0, background: "#000000aa",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      opacity: 0, transition: "opacity 0.2s", gap: "8px"
                    }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "18px", marginLeft: "3px" }}>▶</span>
                      </div>
                      <span style={{ fontSize: "10px", color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Watch Short</span>
                    </div>
                    {/* AI badge */}
                    <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                      <span style={{ fontSize: "9px", background: "#f59e0b", color: "#000", padding: "2px 6px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", fontWeight: 500 }}>
                        AI
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "8px 4px 4px" }}>
                    <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>YouTube Shorts →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Article highlights */}
          <div style={{ marginTop: "2.5rem" }}>
            <div style={{ fontSize: "11px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "'DM Mono', monospace" }}>Featured articles</div>
            {[
              { title: "Can AI Replace Freelancers? What Experts Really Think", tag: "Technology", url: "https://stively.com/blog/can-ai-replace-freelancers" },
              { title: "Cybersecurity Awareness Among College Students", tag: "Research", url: "https://stively.com/blog/cybersecurityawareness" },
              { title: "Top AI Tools Replacing Jobs in 2025", tag: "Technology", url: "https://stively.com/blog/ai-job-replace" },
            ].map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #1e293b", textDecoration: "none", gap: "1rem" }}
                onMouseEnter={e => e.currentTarget.querySelector('.at').style.color = "#00e5ff"}
                onMouseLeave={e => e.currentTarget.querySelector('.at').style.color = "#e2e8f0"}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: "10px", color: "#00e5ff", background: "#00e5ff11", padding: "2px 8px", border: "1px solid #00e5ff22", whiteSpace: "nowrap" }}>{a.tag}</span>
                  <span className="at" style={{ fontSize: "13px", color: "#e2e8f0", transition: "color 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</span>
                </div>
                <span style={{ color: "#334155", fontSize: "16px", flexShrink: 0 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem clamp(1.5rem, 8vw, 8rem)" }}>
        <div style={{ maxWidth: 700 }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Contact</div>
          <h2 className="syne" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
            Open to internships
          </h2>
          <p style={{ fontSize: "14px", color: "#475569", marginBottom: "3rem", lineHeight: 1.8 }}>
            Looking for AI Prompt Engineer, AI Content Creator, Generative AI, or AI Operations internship roles. I bring live projects, documented AI workflows, and real results — not just theory.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "#1e293b", marginBottom: "2rem" }}>
            {[
              { label: "Email", value: "tradeabhiyt@gmail.com", action: copyEmail, actionLabel: copiedEmail ? "Copied!" : "Copy" },
              { label: "Location", value: "Sambhajinagar, Maharashtra", action: null },
              { label: "Portfolio Sites", value: "stively.com", action: () => window.open("https://stively.com", "_blank"), actionLabel: "Visit →" },
            ].map((c, i) => (
              <div key={i} style={{ background: "#0d1117", padding: "1.25rem 1.5rem" }}>
                <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{c.label}</div>
                <div style={{ fontSize: "13px", color: "#e2e8f0", marginBottom: c.action ? "0.75rem" : 0 }}>{c.value}</div>
                {c.action && (
                  <button onClick={c.action} className="glow-btn" style={{ fontSize: "10px", padding: "4px 10px", marginTop: "0.5rem" }}>
                    {c.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", url: "https://github.com/Abhijeet096" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/abhijit-karande-4881ba355/" },
              { label: "Stively", url: "https://stively.com/blog" },
              { label: "YouTube", url: "https://www.youtube.com/@mindorbitanimation" },
            ].map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                className="glow-btn"
                style={{ textDecoration: "none", display: "inline-block", fontSize: "11px", padding: "7px 16px" }}>
                {l.label} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1e293b", padding: "1.5rem clamp(1.5rem, 8vw, 8rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "12px", color: "#334155", fontFamily: "'DM Mono', monospace" }}>
          © 2026 Abhijit Karande — Built with AI-assisted development
        </span>
        <span style={{ fontSize: "12px", color: "#334155", fontFamily: "'DM Mono', monospace" }}>
          <span style={{ color: "#00e5ff" }}>●</span> Open to work
        </span>
      </footer>
    </div>
  );
}