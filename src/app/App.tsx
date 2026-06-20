import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Shield, Smartphone, Code2, Lock, Zap, Globe, ChevronRight,
  Menu, X, Star, ArrowRight, CheckCircle, Phone, Mail,
  Server, Database, Cloud, Key, Fingerprint, Layers,
  Target, Clock, Users, Award, ChevronLeft, Send,
  ShoppingCart, Heart, GraduationCap, Truck, Building2,
  Plane, LayoutGrid, Eye, RefreshCw, GitBranch, Cpu,
  AlertTriangle, Search, MonitorSmartphone, Terminal,
  Twitter, Linkedin, Github, MessageCircle, MapPin,
  TrendingUp, BarChart3, Boxes, Hexagon,
} from "lucide-react";

// ─── Utility ───────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Shared Components ──────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 mb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
      <span className="text-xs font-medium tracking-widest uppercase text-[#00D4FF]" style={{ fontFamily: "Geist Mono, monospace" }}>
        {children}
      </span>
    </div>
  );
}

function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-r from-white via-blue-100 to-[#00D4FF] bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
}

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Background Grid ────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]" />
    </div>
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div className={cn("absolute rounded-full blur-[120px] pointer-events-none", className)} />
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Security", href: "#security" },
    { label: "Process", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-xl border-b border-[#2563EB]/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#00D4FF] flex items-center justify-center">
            <Hexagon className="w-4 h-4 text-white fill-white/20" />
          </div>
          <span className="font-bold text-white tracking-tight" style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontSize: "1.1rem" }}>
            AKAAL<span className="text-[#00D4FF]"> NEXUS</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className="text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors">
            Schedule Call
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563EB] text-white transition-all duration-200 shadow-lg shadow-blue-900/30"
          >
            Start Project
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050816]/95 backdrop-blur-xl border-t border-[#2563EB]/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white py-2 border-b border-slate-800 text-sm"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 text-center font-semibold px-5 py-3 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Phone Mockup ────────────────────────────────────────────────────────────

function PhoneMockup() {
  const screens = [
    {
      label: "Dashboard",
      bg: "from-[#0f172a] to-[#1e293b]",
      content: (
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7px] text-white/60 font-mono">AKAAL NEXUS</span>
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
          <div className="bg-gradient-to-r from-[#2563EB]/40 to-[#00D4FF]/20 rounded-lg p-2">
            <div className="text-[8px] text-white/50 mb-0.5">Balance</div>
            <div className="text-[11px] font-bold text-white">$128,420.00</div>
            <div className="text-[7px] text-[#10B981] mt-0.5">↑ +12.4% this month</div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {["Revenue", "Users", "Orders", "Growth"].map((m, i) => (
              <div key={m} className="bg-white/5 rounded-md p-1.5 border border-white/5">
                <div className="text-[6px] text-white/40">{m}</div>
                <div className="text-[9px] text-white font-semibold mt-0.5">
                  {["$42k", "8,291", "1,204", "28%"][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 rounded-md p-2 border border-white/5">
            <div className="text-[6px] text-white/40 mb-1.5">Weekly Activity</div>
            <div className="flex items-end gap-1 h-8">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i === 5
                      ? "linear-gradient(180deg,#00D4FF,#2563EB)"
                      : "rgba(37,99,235,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-[#2563EB]/30 rounded-md p-1.5 border border-[#2563EB]/30 flex items-center justify-center gap-1">
              <Send className="w-2 h-2 text-[#00D4FF]" />
              <span className="text-[7px] text-white">Send</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-md p-1.5 border border-white/5 flex items-center justify-center gap-1">
              <TrendingUp className="w-2 h-2 text-[#10B981]" />
              <span className="text-[7px] text-white">Analytics</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Security",
      bg: "from-[#0f172a] to-[#1a0a2e]",
      content: (
        <div className="p-3 flex flex-col gap-2 items-center">
          <div className="mt-2 relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#2563EB]/50 flex items-center justify-center bg-[#2563EB]/10">
              <Fingerprint className="w-7 h-7 text-[#00D4FF]" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00D4FF]/30 animate-ping" />
          </div>
          <div className="text-[9px] font-bold text-white">Biometric Auth</div>
          <div className="text-[7px] text-white/40 text-center">Touch your fingerprint sensor to authenticate</div>
          <div className="w-full mt-1 bg-white/5 rounded-lg p-2 border border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <Shield className="w-3 h-3 text-[#10B981]" />
              <span className="text-[7px] text-white/70">Security Status</span>
            </div>
            {["End-to-End Encrypted", "2FA Active", "JWT Token Valid"].map((s) => (
              <div key={s} className="flex items-center gap-1.5 py-0.5">
                <CheckCircle className="w-2.5 h-2.5 text-[#10B981]" />
                <span className="text-[6px] text-white/50">{s}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gradient-to-r from-[#2563EB] to-[#00D4FF] rounded-lg p-2 text-center">
            <span className="text-[8px] font-bold text-white">VERIFIED SECURE</span>
          </div>
        </div>
      ),
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % screens.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-[#2563EB]/15 blur-[60px]" />
      </div>

      {/* Phone frame */}
      <div className="relative z-10 w-[200px] h-[400px] rounded-[2.5rem] border-2 border-white/10 bg-[#0a0f1c] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1 h-1 rounded-full bg-slate-700" />
        </div>

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className={cn("w-full h-full bg-gradient-to-b pt-7", screens[active].bg)}
          >
            {screens[active].content}
          </motion.div>
        </AnimatePresence>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20" />
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -left-8 top-16 bg-[#0a0f1c] border border-[#2563EB]/30 rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#10B981]" />
          <span className="text-[10px] text-white font-medium">Security Verified</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-6 bottom-24 bg-[#0a0f1c] border border-[#00D4FF]/30 rounded-xl px-3 py-2 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span className="text-[10px] text-white font-medium">99.9% Uptime</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050816]">
      <GridBackground />
      <GlowOrb className="w-[600px] h-[600px] bg-[#2563EB]/20 -top-40 -left-40" />
      <GlowOrb className="w-[400px] h-[400px] bg-[#00D4FF]/10 top-1/2 -right-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-medium text-[#00D4FF]" style={{ fontFamily: "Geist Mono, monospace" }}>
              NOW ACCEPTING ENTERPRISE PROJECTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-[3.75rem] leading-[1.08] font-extrabold tracking-tight text-white mb-6"
          >
            Building{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#60a5fa] to-[#00D4FF] bg-clip-text text-transparent">
              Secure Mobile Apps
            </span>{" "}
            That Drive Business Growth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
          >
            AKAAL NEXUS designs, develops, secures, deploys, and maintains world-class mobile applications
            for startups and enterprises. Where Innovation Meets Execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563EB] text-white font-semibold transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-200 hover:bg-white/5"
            >
              Schedule Consultation
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8"
          >
            {[
              { value: "150+", label: "Apps Delivered" },
              { value: "50+", label: "Enterprise Clients" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <PhoneMockup />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const highlights = [
    { icon: MonitorSmartphone, title: "Mobile App Specialists", desc: "100% focused on mobile — iOS, Android, and cross-platform." },
    { icon: Shield, title: "Security-First Development", desc: "Every line of code follows OWASP and enterprise security standards." },
    { icon: Zap, title: "Agile Delivery", desc: "Iterative sprints, continuous deployment, and rapid go-to-market." },
    { icon: MessageCircle, title: "Transparent Communication", desc: "Weekly demos, real-time Slack updates, and complete visibility." },
    { icon: RefreshCw, title: "Long-Term Support", desc: "We maintain, scale, and evolve your app as your business grows." },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#050816] overflow-hidden">
      <GlowOrb className="w-[500px] h-[500px] bg-[#2563EB]/10 -right-60 top-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <SectionLabel>About AKAAL NEXUS</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              A Mobile-First Engineering{" "}
              <GradientText>Company</GradientText>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-6">
              AKAAL NEXUS is a premium mobile engineering studio built for the demands of modern business.
              We don't just build apps — we architect solutions that scale, perform under pressure, and
              protect your users" data with military-grade security.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              From seed-stage startups to Fortune 500 enterprises, our team of senior engineers,
              UI/UX designers, and security specialists deliver mobile experiences that set new
              benchmarks in quality, performance, and user engagement.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-[#00D4FF] font-semibold hover:gap-3 transition-all">
              Meet Our Team <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>

          <div className="grid gap-4">
            {highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 0.08}>
                <div className="group flex items-start gap-4 p-4 rounded-xl border border-[#2563EB]/10 hover:border-[#2563EB]/30 bg-[#0a0f1c]/60 hover:bg-[#0a0f1c] transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB]/25 transition-colors">
                    <h.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{h.title}</div>
                    <div className="text-sm text-slate-400">{h.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

const services = [
  { icon: Smartphone, title: "Android App Development", desc: "Native Kotlin apps optimized for every Android device, from budget phones to foldables.", color: "#2563EB" },
  { icon: MonitorSmartphone, title: "iOS App Development", desc: "Swift-powered experiences that leverage the full power of the Apple ecosystem.", color: "#00D4FF" },
  { icon: Layers, title: "Flutter Development", desc: "Single codebase, pixel-perfect UI across iOS and Android with near-native performance.", color: "#8b5cf6" },
  { icon: Code2, title: "React Native Development", desc: "JavaScript-driven cross-platform apps with access to native device capabilities.", color: "#10B981" },
  { icon: Server, title: "Backend & API Development", desc: "Scalable REST and GraphQL APIs with Node.js, NestJS, Python, and Java Spring Boot.", color: "#f59e0b" },
  { icon: Shield, title: "Mobile App Security", desc: "OWASP-compliant security audits, penetration testing, and vulnerability assessments.", color: "#ef4444" },
  { icon: RefreshCw, title: "App Maintenance & Support", desc: "24/7 monitoring, performance optimization, and continuous feature development.", color: "#06b6d4" },
  { icon: Globe, title: "App Store Deployment", desc: "Seamless submission, review management, and ASO strategy for iOS and Android.", color: "#84cc16" },
];

function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <GlowOrb className="w-[600px] h-[300px] bg-[#2563EB]/10 -left-40 bottom-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>What We Build</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            End-to-End{" "}
            <GradientText>Mobile Services</GradientText>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            From initial concept to production deployment, we handle every layer of your mobile product.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div
                className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 bg-[#0a0f1c] hover:bg-[#0d1428] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${s.color}15, transparent 70%)` }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <h3 className="font-bold text-white mb-2 text-base">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Security ────────────────────────────────────────────────────────────────

const securityFeatures = [
  { icon: Lock, title: "End-to-End Encryption", desc: "AES-256 encryption in transit and at rest for all sensitive data." },
  { icon: Key, title: "OAuth 2.0 & JWT Auth", desc: "Industry-standard token-based authentication and authorization." },
  { icon: Fingerprint, title: "Biometric Authentication", desc: "Face ID, fingerprint, and voice recognition integration." },
  { icon: Users, title: "Role-Based Access Control", desc: "Granular permission systems with least-privilege principles." },
  { icon: Server, title: "Secure API Architecture", desc: "Rate limiting, input validation, and API gateway protection." },
  { icon: AlertTriangle, title: "OWASP Best Practices", desc: "Full compliance with OWASP Mobile Top 10 vulnerabilities." },
  { icon: Search, title: "Penetration Testing", desc: "Regular third-party pen tests to identify and close attack surfaces." },
  { icon: Eye, title: "Vulnerability Assessments", desc: "Continuous static and dynamic analysis of your codebase." },
  { icon: Cloud, title: "Cloud Security", desc: "AWS, Azure, and GCP security hardening with IAM and VPC isolation." },
];

function Security() {
  return (
    <section id="security" className="relative py-24 bg-gradient-to-b from-[#050816] to-[#07091a] overflow-hidden">
      <GlowOrb className="w-[700px] h-[700px] bg-[#2563EB]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Security</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Security Is{" "}
            <GradientText>Our Foundation</GradientText>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Security is never an afterthought at AKAAL NEXUS — it is architectured into every layer
            of every application we build from day one.
          </p>
        </FadeIn>

        {/* Trust badges */}
        <FadeIn className="flex flex-wrap justify-center gap-3 mb-14">
          {["OWASP Compliant", "GDPR Ready", "HIPAA Compatible", "SOC 2 Aligned", "ISO 27001"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10">
              <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#10B981]">{badge}</span>
            </div>
          ))}
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityFeatures.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="group p-5 rounded-2xl border border-[#2563EB]/10 hover:border-[#2563EB]/30 bg-[#0a0f1c]/80 hover:bg-[#0a0f1c] transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{f.title}</div>
                    <div className="text-sm text-slate-400">{f.desc}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

const processSteps = [
  { n: "01", title: "Discovery & Strategy", desc: "Deep-dive workshops to understand your business goals, target users, and technical requirements.", icon: Target },
  { n: "02", title: "Planning & Research", desc: "Competitive analysis, user journey mapping, and detailed technical architecture planning.", icon: Search },
  { n: "03", title: "UI/UX Design", desc: "High-fidelity wireframes and interactive prototypes that users love before a single line is written.", icon: Layers },
  { n: "04", title: "Development", desc: "Agile sprints with continuous integration, code reviews, and weekly demos to keep you aligned.", icon: Code2 },
  { n: "05", title: "Security Testing", desc: "OWASP audits, penetration testing, and security hardening throughout the development lifecycle.", icon: Shield },
  { n: "06", title: "QA Testing", desc: "Automated and manual testing across 200+ device configurations, OS versions, and edge cases.", icon: CheckCircle },
  { n: "07", title: "Deployment", desc: "Smooth App Store and Play Store submission with CI/CD pipelines and zero-downtime releases.", icon: Globe },
  { n: "08", title: "Ongoing Support", desc: "Continuous monitoring, performance optimization, feature updates, and dedicated support.", icon: RefreshCw },
];

function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Our{" "}
            <GradientText>Development Process</GradientText>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            A proven 8-step methodology refined across 150+ mobile applications.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Step list */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {processSteps.map((step, i) => (
              <button
                key={step.n}
                onClick={() => setActive(i)}
                className={cn(
                  "group text-left flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border",
                  active === i
                    ? "bg-[#2563EB]/15 border-[#2563EB]/40 text-white"
                    : "border-transparent hover:bg-white/3 text-slate-400 hover:text-slate-200"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold w-8 flex-shrink-0 transition-colors",
                    active === i ? "text-[#00D4FF]" : "text-slate-600"
                  )}
                  style={{ fontFamily: "Geist Mono, monospace" }}
                >
                  {step.n}
                </span>
                <span className="font-semibold text-sm">{step.title}</span>
                {active === i && <ChevronRight className="w-4 h-4 text-[#2563EB] ml-auto" />}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl border border-[#2563EB]/20 bg-gradient-to-br from-[#0a0f1c] to-[#0d1428] h-full min-h-[320px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#00D4FF] flex items-center justify-center">
                      {(() => { const Icon = processSteps[active].icon; return <Icon className="w-7 h-7 text-white" />; })()}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#00D4FF] mb-1">{processSteps[active].n} / 08</div>
                      <h3 className="text-2xl font-bold text-white">{processSteps[active].title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">{processSteps[active].desc}</p>
                </div>

                {/* Progress */}
                <div className="mt-8">
                  <div className="flex gap-1.5">
                    {processSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={cn(
                          "h-1 rounded-full transition-all duration-200",
                          i === active ? "bg-[#2563EB] flex-1" : "bg-white/10 w-4"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-slate-500">
                    <span>Discovery</span>
                    <span>Ongoing Support</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats / Why Choose ──────────────────────────────────────────────────────

function StatCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(target, 2000, inView);
  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

function WhyChoose() {
  const stats = [
    { value: 150, suffix: "+", label: "Apps Shipped", icon: Smartphone },
    { value: 50, suffix: "+", label: "Enterprise Clients", icon: Building2 },
    { value: 99, suffix: ".9%", label: "Client Satisfaction", icon: Star },
    { value: 8, suffix: "+", label: "Years Experience", icon: Award },
  ];

  const reasons = [
    { icon: MonitorSmartphone, title: "Mobile-Only Expertise", desc: "We do one thing — mobile — and we do it better than anyone." },
    { icon: Shield, title: "Enterprise-Level Security", desc: "Bank-grade security standards applied to every project." },
    { icon: Boxes, title: "Scalable Architecture", desc: "Built to handle 10 users or 10 million without rearchitecting." },
    { icon: Zap, title: "Agile Development", desc: "2-week sprints, continuous delivery, and rapid market entry." },
    { icon: Users, title: "Dedicated Team", desc: "Your own senior engineers, designers, and PMs — not freelancers." },
    { icon: RefreshCw, title: "Continuous Support", desc: "We don't disappear post-launch. We're your long-term partner." },
  ];

  return (
    <section id="why" className="relative py-24 bg-gradient-to-b from-[#07091a] to-[#050816] overflow-hidden">
      <GlowOrb className="w-[500px] h-[500px] bg-[#00D4FF]/8 right-0 top-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Why AKAAL NEXUS</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The Difference Is{" "}
            <GradientText>In The Details</GradientText>
          </h2>
        </FadeIn>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl border border-[#2563EB]/15 bg-[#0a0f1c]">
                <s.icon className="w-6 h-6 text-[#2563EB] mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-white mb-1">
                  <StatCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Reason cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.07}>
              <div className="group p-6 rounded-2xl border border-white/5 hover:border-[#2563EB]/30 bg-[#0a0f1c] hover:bg-[#0d1428] transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#00D4FF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <r.icon className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <h3 className="font-bold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-slate-400">{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ──────────────────────────────────────────────────────────────

const industries = [
  { icon: TrendingUp, label: "FinTech", color: "#10B981" },
  { icon: Heart, label: "Healthcare", color: "#ef4444" },
  { icon: ShoppingCart, label: "E-Commerce", color: "#f59e0b" },
  { icon: GraduationCap, label: "Education", color: "#8b5cf6" },
  { icon: Truck, label: "Logistics", color: "#06b6d4" },
  { icon: Building2, label: "Real Estate", color: "#2563EB" },
  { icon: Plane, label: "Travel", color: "#00D4FF" },
  { icon: LayoutGrid, label: "SaaS", color: "#84cc16" },
];

function Industries() {
  return (
    <section id="industries" className="relative py-20 bg-[#050816] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Industries We Serve</SectionLabel>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Built For Every{" "}
            <GradientText>Vertical</GradientText>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Deep domain expertise across the industries that matter most in mobile.
          </p>
        </FadeIn>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {industries.map((ind, i) => (
            <FadeIn key={ind.label} delay={i * 0.06}>
              <div className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/5 hover:border-white/15 bg-[#0a0f1c] hover:bg-[#0d1428] transition-all duration-200 cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                  style={{ background: `${ind.color}18`, border: `1px solid ${ind.color}30` }}
                >
                  <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                </div>
                <span className="text-xs font-semibold text-slate-300 text-center">{ind.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "NexPay Wallet",
    category: "FinTech",
    desc: "A secure peer-to-peer payment platform with biometric auth, real-time transaction tracking, and multi-currency support.",
    tech: ["Flutter", "Node.js", "PostgreSQL", "AWS"],
    metrics: ["$2.4M processed daily", "500K+ users", "99.98% uptime"],
    color: "#10B981",
    bg: "from-[#064e3b] to-[#0a0f1c]",
  },
  {
    title: "MediTrack Pro",
    category: "Healthcare",
    desc: "HIPAA-compliant telemedicine app connecting patients with doctors via encrypted video calls and secure health record management.",
    tech: ["React Native", "NestJS", "MongoDB", "Azure"],
    metrics: ["200+ hospitals", "1M+ appointments", "HIPAA Certified"],
    color: "#ef4444",
    bg: "from-[#450a0a] to-[#0a0f1c]",
  },
  {
    title: "ShopFlow Enterprise",
    category: "E-Commerce",
    desc: "Headless commerce platform with AR try-on, personalized recommendations, and seamless multi-vendor checkout flow.",
    tech: ["Kotlin", "Spring Boot", "Redis", "GCP"],
    metrics: ["320% conversion lift", "$8M in sales/mo", "4.9 App Store"],
    color: "#f59e0b",
    bg: "from-[#451a03] to-[#0a0f1c]",
  },
  {
    title: "LogiRoute SaaS",
    category: "Logistics",
    desc: "Real-time fleet management and last-mile delivery optimization with ML-powered route planning and live driver tracking.",
    tech: ["Swift", "Python", "PostgreSQL", "AWS"],
    metrics: ["40% cost reduction", "1,200 fleets", "Real-time GPS"],
    color: "#06b6d4",
    bg: "from-[#0c1a2e] to-[#0a0f1c]",
  },
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "FinTech", "Healthcare", "E-Commerce", "Logistics"];
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-gradient-to-b from-[#050816] to-[#07091a] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Our Work</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Apps That{" "}
            <GradientText>Define Industries</GradientText>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            A selection of transformative mobile products engineered by our team.
          </p>
        </FadeIn>

        {/* Filter */}
        <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                activeCategory === cat
                  ? "bg-[#2563EB] border-[#2563EB] text-white"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <div className={cn("group relative overflow-hidden rounded-2xl border border-white/8 hover:border-white/15 bg-gradient-to-br transition-all duration-300 cursor-pointer", project.bg)}>
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
                        style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}30` }}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/8 rounded-md text-xs text-slate-300" style={{ fontFamily: "Geist Mono, monospace" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/8">
                    {project.metrics.map((m) => (
                      <div key={m} className="text-center">
                        <div className="text-xs font-semibold text-white">{m}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

function TechStack() {
  const categories = [
    {
      label: "Mobile",
      icon: Smartphone,
      items: ["Flutter", "React Native", "Kotlin", "Swift"],
      color: "#2563EB",
    },
    {
      label: "Backend",
      icon: Server,
      items: ["Node.js", "NestJS", "Python", "Java Spring Boot"],
      color: "#10B981",
    },
    {
      label: "Database",
      icon: Database,
      items: ["PostgreSQL", "MongoDB", "Redis"],
      color: "#f59e0b",
    },
    {
      label: "Cloud",
      icon: Cloud,
      items: ["AWS", "Azure", "Google Cloud"],
      color: "#8b5cf6",
    },
    {
      label: "Security",
      icon: Shield,
      items: ["JWT", "OAuth 2.0", "SSL/TLS", "Firebase Auth", "AWS Cognito"],
      color: "#00D4FF",
    },
  ];

  return (
    <section id="stack" className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Technology</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Our{" "}
            <GradientText>Technology Stack</GradientText>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Best-in-class tools selected for performance, security, and maintainability.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <FadeIn key={cat.label} delay={i * 0.08}>
              <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0f1c] h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}25` }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3" style={{ fontFamily: "Geist Mono, monospace" }}>
                  {cat.label}
                </div>
                <div className="flex flex-col gap-1.5">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: cat.color }} />
                      <span className="text-sm text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO, NovaPay Financial",
    review: "AKAAL NEXUS delivered our FinTech app 3 weeks ahead of schedule with zero security vulnerabilities found in our independent audit. Their security-first approach saved us from a potential $2M compliance penalty.",
    stars: 5,
    avatar: "SM",
  },
  {
    name: "Dr. James Okonkwo",
    role: "CEO, HealthBridge Africa",
    review: "The HIPAA-compliant telemedicine platform they built handles 50,000 consultations per month without a single data breach. The team's dedication to both user experience and technical excellence is unmatched.",
    stars: 5,
    avatar: "JO",
  },
  {
    name: "Priya Sharma",
    role: "VP Product, Retailix",
    review: "After two failed agency partnerships, AKAAL NEXUS finally built the e-commerce app we envisioned. The AR try-on feature alone drove a 320% increase in conversion. Exceptional engineering team.",
    stars: 5,
    avatar: "PS",
  },
  {
    name: "Marcus Reeves",
    role: "Founder, FleetSense Logistics",
    review: "They built our real-time fleet tracking platform from scratch in 14 weeks. The architecture they chose has scaled effortlessly from 50 to 1,200 fleets. Best technical investment we've made.",
    stars: 5,
    avatar: "MR",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-[#07091a] to-[#050816] overflow-hidden">
      <GlowOrb className="w-[500px] h-[300px] bg-[#2563EB]/10 left-0 top-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <SectionLabel>Client Success</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Trusted By{" "}
            <GradientText>Industry Leaders</GradientText>
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 lg:p-10 rounded-3xl border border-[#2563EB]/20 bg-gradient-to-br from-[#0a0f1c] to-[#0d1428]"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                ))}
              </div>
              <blockquote className="text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 italic">
                "{testimonials[current].review}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#00D4FF] flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{testimonials[current].name}</div>
                  <div className="text-sm text-slate-400">{testimonials[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    i === current ? "bg-[#2563EB] w-6" : "bg-white/20 w-1.5"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #2563EB, transparent)" }}
        />
      </div>
      <GlowOrb className="w-[700px] h-[700px] bg-[#2563EB]/15 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 mb-8">
            <Zap className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="text-xs font-medium text-[#00D4FF]">Ready to build?</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready To Build Your{" "}
            <GradientText>Next Mobile App?</GradientText>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Partner with AKAAL NEXUS to create secure, scalable, and beautifully engineered
            mobile applications that drive real business outcomes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563EB] text-white font-bold text-lg transition-all duration-200 shadow-lg shadow-blue-900/40 hover:-translate-y-0.5"
            >
              Book Free Consultation <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 hover:border-white/30 text-white font-bold text-lg transition-all hover:bg-white/5"
            >
              Get Project Estimate
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", projectType: "", budget: "", description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = ["iOS App", "Android App", "Cross-Platform App", "Backend API", "Full-Stack Mobile", "Security Audit", "Other"];
  const budgets = ["$10k–$25k", "$25k–$50k", "$50k–$100k", "$100k–$250k", "$250k+"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#050816] to-[#07091a] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <FadeIn>
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Let's Build Something{" "}
              <GradientText>Extraordinary</GradientText>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Tell us about your project. Our team will review your requirements and
              get back to you within 24 hours with a tailored proposal.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Mail, label: "hello@akaalnexus.com" },
                { icon: Phone, label: "+1 (888) 826-2539" },
                { icon: MapPin, label: "San Francisco · Dubai · Singapore" },
                { icon: MessageCircle, label: "WhatsApp available 24/7" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <span className="text-slate-300 text-sm">{c.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-10 h-10 rounded-xl border border-white/10 hover:border-white/25 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-10 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/5">
                <CheckCircle className="w-16 h-16 text-[#10B981] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-slate-400">
                  Our team will review your project and reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 p-7 rounded-2xl border border-white/8 bg-[#0a0f1c]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/50 focus:bg-white/8 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@acme.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555 0100"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0f1c]">Select type</option>
                      {projectTypes.map((t) => <option key={t} value={t} className="bg-[#0a0f1c]">{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Budget</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm appearance-none"
                    >
                      <option value="" className="bg-[#0a0f1c]">Select budget</option>
                      {budgets.map((b) => <option key={b} value={b} className="bg-[#0a0f1c]">{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Project Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Tell us about your project, target users, key features, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2563EB]/50 transition-all text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563EB] text-white font-bold transition-all duration-200 shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                >
                  Send Project Brief <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press Kit"],
    },
    {
      title: "Services",
      links: ["iOS Development", "Android Development", "Flutter", "React Native", "Backend & APIs", "App Security"],
    },
    {
      title: "Work",
      links: ["Portfolio", "Case Studies", "Client Success", "Industries"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Security"],
    },
  ];

  return (
    <footer className="relative border-t border-[#2563EB]/10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#00D4FF] flex items-center justify-center">
                <Hexagon className="w-4 h-4 text-white fill-white/20" />
              </div>
              <span className="font-bold text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                AKAAL<span className="text-[#00D4FF]"> NEXUS</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Where Innovation Meets Execution. Premium mobile engineering for ambitious companies.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/8 hover:border-white/20 flex items-center justify-center text-slate-500 hover:text-white transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4" style={{ fontFamily: "Geist Mono, monospace" }}>
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} AKAAL NEXUS. All rights reserved.
          </p>
          <p className="text-sm text-slate-600" style={{ fontFamily: "Geist Mono, monospace" }}>
            Built with precision. Secured by design.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Security />
      <Process />
      <WhyChoose />
      <Industries />
      <Portfolio />
      <TechStack />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
