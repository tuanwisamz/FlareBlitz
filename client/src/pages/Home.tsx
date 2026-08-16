/* Signal Garden: asymmetrical editorial launchpad, marigold signals, category wayfinding, and calm motion. */
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, CalendarDays, Check, ChevronRight, Command, ExternalLink, Github, Globe2, Heart, Instagram, LayoutGrid, Linkedin, Menu, MessageCircle, Search, Send, Sparkles, Star, Terminal, Youtube } from "lucide-react";

type Tool = { name: string; url: string; note: string; icon: React.ReactNode; tone: string };
type Category = { id: string; label: string; eyebrow: string; description: string; icon: React.ReactNode; tone: string; tools: Tool[] };

const categories: Category[] = [
  { id: "performance", label: "Performance", eyebrow: "01 · everyday work", description: "The documents, canvases, calendars, and references that keep the day moving.", icon: <LayoutGrid size={20} />, tone: "marigold", tools: [
    { name: "Word", url: "https://word.cloud.microsoft/en-us/", note: "Write & edit", icon: <span className="wordmark">W</span>, tone: "blue" },
    { name: "Excel", url: "https://excel.cloud.microsoft", note: "Model & calculate", icon: <span className="wordmark">X</span>, tone: "green" },
    { name: "Document", url: "https://docs.google.com/", note: "Collaborative docs", icon: <span className="wordmark">D</span>, tone: "blue" },
    { name: "Sheets", url: "https://docs.google.com/spreadsheets", note: "Shared sheets", icon: <span className="wordmark">S</span>, tone: "green" },
    { name: "Drive", url: "https://drive.google.com/", note: "File storage", icon: <span className="wordmark">G</span>, tone: "yellow" },
    { name: "Scholars", url: "https://scholar.google.com/", note: "Research faster", icon: <span className="wordmark">S</span>, tone: "red" },
    { name: "Quillbot", url: "https://quillbot.com/", note: "Rewrite clearly", icon: <span className="wordmark">Q</span>, tone: "purple" },
    { name: "Stealth Writer", url: "https://stealthwriter.ai/", note: "Shape a draft", icon: <span className="wordmark">S</span>, tone: "ink" },
    { name: "Github", url: "https://github.com/", note: "Ship code", icon: <Github size={22} />, tone: "ink" },
    { name: "Canva", url: "https://canva.com/", note: "Make visual", icon: <span className="wordmark">C</span>, tone: "cyan" },
    { name: "Notion", url: "https://notion.com/", note: "Think in systems", icon: <span className="wordmark">N</span>, tone: "ink" },
    { name: "Calendar", url: "https://calendar.google.com/", note: "Plan the rhythm", icon: <CalendarDays size={22} />, tone: "red" },
  ] },
  { id: "utp", label: "UTP Gateways", eyebrow: "02 · campus access", description: "A direct route into the university systems you use between classes, projects, and deadlines.", icon: <Globe2 size={20} />, tone: "cobalt", tools: [
    { name: "Ucampus", url: "https://ucampus.utp.edu.my/sitsvision/wrd/siw_lgn", note: "Student portal", icon: <span className="wordmark">U</span>, tone: "cobalt" },
    { name: "Ulearn", url: "https://ulearn.utp.edu.my/login/index.php", note: "Learning space", icon: <span className="wordmark">U</span>, tone: "sage" },
    { name: "USchedule", url: "https://cloud.timeedit.net/uscheduleutp/web", note: "Find your time", icon: <CalendarDays size={22} />, tone: "coral" },
    { name: "UCS Report", url: "https://ucs.utp.edu.my/", note: "Academic reports", icon: <span className="wordmark">U</span>, tone: "marigold" },
    { name: "UBooking", url: "https://ubooking.utp.edu.my/", note: "Reserve a space", icon: <span className="wordmark">U</span>, tone: "cobalt" },
  ] },
  { id: "social", label: "Social Media", eyebrow: "03 · stay connected", description: "The channels that keep conversations, communities, and curiosity within reach.", icon: <MessageCircle size={20} />, tone: "coral", tools: [
    { name: "WhatsApp", url: "https://web.whatsapp.com/", note: "Messages", icon: <MessageCircle size={22} />, tone: "green" },
    { name: "Telegram", url: "https://web.telegram.org/", note: "Fast channels", icon: <Send size={22} />, tone: "cobalt" },
    { name: "Instagram", url: "https://www.instagram.com/", note: "Visual stories", icon: <Instagram size={22} />, tone: "coral" },
    { name: "LinkedIn", url: "https://www.linkedin.com/", note: "Professional network", icon: <Linkedin size={22} />, tone: "cobalt" },
    { name: "TikTok", url: "https://www.tiktok.com/", note: "Short-form energy", icon: <span className="wordmark">T</span>, tone: "ink" },
    { name: "YouTube", url: "https://www.youtube.com/", note: "Watch & learn", icon: <Youtube size={22} />, tone: "red" },
  ] },
  { id: "llms", label: "LLMs", eyebrow: "04 · thinking partners", description: "A considered mix of models for exploring, drafting, debugging, and seeing around corners.", icon: <Sparkles size={20} />, tone: "sage", tools: [
    { name: "Gemini", url: "https://gemini.google.com/", note: "Explore ideas", icon: <Sparkles size={22} />, tone: "cobalt" },
    { name: "Claude", url: "https://claude.ai/", note: "Work through nuance", icon: <span className="wordmark">C</span>, tone: "coral" },
    { name: "ChatGPT", url: "https://chatgpt.com/", note: "Talk it out", icon: <span className="wordmark">C</span>, tone: "sage" },
    { name: "Grok", url: "https://grok.x.ai/", note: "Ask differently", icon: <span className="wordmark">G</span>, tone: "ink" },
    { name: "Qwen", url: "https://qwen.ai/home/", note: "Build context", icon: <span className="wordmark">Q</span>, tone: "cobalt" },
    { name: "Kimi", url: "https://www.kimi.ai/", note: "Go long-form", icon: <span className="wordmark">K</span>, tone: "purple" },
    { name: "DeepSeek", url: "https://deepseek.com/en/", note: "Dive deeper", icon: <span className="wordmark">D</span>, tone: "cobalt" },
    { name: "Perplexity", url: "https://www.perplexity.ai/", note: "Search with synthesis", icon: <Search size={22} />, tone: "cyan" },
    { name: "Manus", url: "https://manus.im/app/QVLBhSZBBqzkzugkPL04qB", note: "Make it happen", icon: <Sparkles size={22} />, tone: "marigold" },
  ] },
  { id: "sites", label: "Sites", eyebrow: "05 · build & deploy", description: "The platforms behind experiments, interfaces, infrastructure, and the next thing worth shipping.", icon: <Terminal size={20} />, tone: "cobalt", tools: [
    { name: "Vercel", url: "https://vercel.com/", note: "Deploy fast", icon: <span className="wordmark">V</span>, tone: "ink" },
    { name: "Netlify", url: "https://www.netlify.com/", note: "Web workflow", icon: <span className="wordmark">N</span>, tone: "cyan" },
    { name: "Render", url: "https://render.com/", note: "Run services", icon: <span className="wordmark">R</span>, tone: "cobalt" },
    { name: "Railway", url: "https://railway.app/", note: "Ship infrastructure", icon: <span className="wordmark">R</span>, tone: "purple" },
    { name: "Figma", url: "https://figma.com/", note: "Shape interfaces", icon: <span className="wordmark">F</span>, tone: "coral" },
    { name: "Supabase", url: "https://supabase.com/", note: "Build data", icon: <span className="wordmark">S</span>, tone: "green" },
    { name: "Firebase", url: "https://firebase.google.com/", note: "Prototype systems", icon: <span className="wordmark">F</span>, tone: "yellow" },
    { name: "Cloudflare", url: "https://dash.cloudflare.com/login", note: "Protect the edge", icon: <Globe2 size={22} />, tone: "marigold" },
    { name: "Supahero", url: "https://supahero.io/", note: "Explore motion", icon: <Star size={22} />, tone: "coral" },
    { name: "React Bits", url: "https://reactbits.dev/", note: "Borrow a spark", icon: <span className="wordmark">R</span>, tone: "cobalt" },
  ] },
];

const marqueeItems = ["WRITE", "LEARN", "BUILD", "CONNECT", "EXPLORE", "REPEAT"];

function ToolCard({ tool }: { tool: Tool }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    setOpening(true);
    toast.success(`Opening ${tool.name}`, { description: tool.note });
    window.setTimeout(() => window.open(tool.url, "_blank", "noopener,noreferrer"), 180);
  };
  return <button className={`tool-card tone-${tool.tone}`} onClick={open} aria-label={`Open ${tool.name}`}>
    <span className="tool-icon">{opening ? <Check size={20} /> : tool.icon}</span>
    <span className="tool-copy"><strong>{tool.name}</strong><small>{opening ? "Opening…" : tool.note}</small></span>
    <ArrowUpRight className="tool-arrow" size={17} />
  </button>;
}

function Marquee() {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...marqueeItems, ...marqueeItems].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✳</i></span>)}</div></div>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleCategories = useMemo(() => categories.filter((category) => active === "all" || category.id === active).map((category) => ({ ...category, tools: category.tools.filter((tool) => `${tool.name} ${tool.note}`.toLowerCase().includes(query.toLowerCase())) })).filter((category) => category.tools.length > 0), [active, query]);
  const total = categories.reduce((sum, category) => sum + category.tools.length, 0);

  return <div className="site-shell">
    <header className="topbar"><a href="#top" className="brand"><span className="brand-mark"><img src="/manus-storage/flareblitz-mark_5a4d5dd7.png" alt="" /></span><span>Flare<span>Blitz</span></span></a><nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">{categories.map((category) => <a key={category.id} href={`#${category.id}`} onClick={() => setMenuOpen(false)}>{category.label}</a>)}</nav><div className="top-actions"><span className="status-dot" /> <span className="status-copy">Your links, in orbit</span><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20} /></button></div></header>
    <main id="top">
      <section className="hero-section"><div className="hero-art" /><div className="hero-content"><div className="eyebrow"><span className="eyebrow-rule" /> Personal launchpad / 2026</div><h1>Everything you reach for,<br /><em>one signal</em> away.</h1><p className="hero-lede">A calmer way to move through the web. FlareBlitz keeps your everyday tools close, categorized, and ready for the next context switch.</p><div className="hero-meta"><span><strong>{total}</strong> links curated</span><span><strong>05</strong> lanes to explore</span></div></div><aside className="quick-panel"><div className="quick-top"><span className="tiny-label">QUICK SIGNAL</span><span className="pulse"><i /> LIVE</span></div><div className="quick-mark"><Sparkles size={34} /></div><p>Pick a lane.<br /><strong>Move with intent.</strong></p><div className="quick-links"><a href="#performance">Start with work <ChevronRight size={15} /></a><a href="#llms">Think with models <ChevronRight size={15} /></a></div></aside></section>
      <Marquee />
      <section className="toolbar"><div className="section-intro"><span className="tiny-label">INDEX / {String(visibleCategories.length).padStart(2, "0")} LANES</span><p>Find the right doorway<br /><em>without digging.</em></p></div><div className="controls"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools…" aria-label="Search tools" /><kbd><Command size={12} /> K</kbd></label><div className="filter-row"><button className={active === "all" ? "filter active" : "filter"} onClick={() => setActive("all")}>All tools</button>{categories.map((category) => <button key={category.id} className={active === category.id ? "filter active" : "filter"} onClick={() => setActive(category.id)}>{category.label}</button>)}</div></div></section>
      <div className="category-list">{visibleCategories.map((category, index) => <section className={`category-section lane-${category.tone}`} id={category.id} key={category.id}><div className="category-rail"><span className="category-number">0{index + 1}</span><span className={`category-icon tone-${category.tone}`}>{category.icon}</span><h2>{category.label}</h2><p>{category.description}</p><a href={`#${category.id}`} className="rail-link">Open lane <ArrowUpRight size={15} /></a></div><div className="category-tools"><div className="category-heading"><span>{category.eyebrow}</span><span>{String(category.tools.length).padStart(2, "0")} tools</span></div><div className="tools-grid">{category.tools.map((tool) => <ToolCard tool={tool} key={tool.name} />)}</div></div></section>)}</div>
      {visibleCategories.length === 0 && <div className="empty-state"><Search size={26} /><h3>No signal found.</h3><p>Try another phrase or return to all tools.</p><button onClick={() => { setQuery(""); setActive("all"); }}>Reset index</button></div>}
      <section className="closing-note"><div className="closing-line" /><div><span className="tiny-label">A SMALL NOTE</span><h2>Made for the moments<br />between <em>big ideas.</em></h2></div><p>This is a living collection of the places that help the work happen. Add, remove, and rearrange as your rhythm changes.</p></section>
    </main>
    <footer className="footer"><div className="footer-inner"><div className="footer-brand"><span className="brand-mark"><img src="/manus-storage/flareblitz-mark_5a4d5dd7.png" alt="" /></span><span>Flare<span>Blitz</span></span></div><p>Collected with curiosity.<br />Used with intent.</p><div className="footer-right"><a href="#top">Back to top <ArrowUpRight size={15} /></a><small>© 2026 FlareBlitz / Personal project</small></div></div></footer>
  </div>;
}
