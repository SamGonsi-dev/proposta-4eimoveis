"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";
import {
  Check,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Smartphone,
  Lock,
  MessageSquare,
  HelpCircle,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Send,
  Building2,
  BarChart3,
  RefreshCw,
  Sliders,
  DollarSign,
  UserCheck,
  CheckCircle2,
  FileText,
  BadgeCheck,
  PhoneCall,
  Sparkles,
  ArrowUpRight,
  Zap,
  ArrowDown,
  UserPlus,
  Briefcase,
  RotateCcw
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

// Componente de Revelação Suave (Scroll Reveal)
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up"
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "fade";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-y-0 opacity-100 scale-100";
    if (direction === "up") return "translate-y-8 opacity-0 scale-[0.98]";
    if (direction === "down") return "-translate-y-8 opacity-0 scale-[0.98]";
    return "opacity-0 scale-[0.98]";
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}

// Card Executivo com Borda Translúcida e Efeito Glow Touch
function ExecutiveCard({
  children,
  className = "",
  glowColor = "rgba(16, 185, 129, 0.25)"
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos(null)}
      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:shadow-emerald-950/30 bg-gradient-to-b from-white/[0.06] to-[#0c1017]/95 border border-white/[0.09] backdrop-blur-2xl overflow-hidden group ${className}`}
    >
      {mousePos && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 65%)`
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Proposta4eImoveisPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [leadsMes, setLeadsMes] = useState(450);
  const [approved, setApproved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Estados dos Accordions / Sanfonas Expansíveis
  const [showSetupDetails, setShowSetupDetails] = useState(false);
  const [showMonthlyDetails, setShowMonthlyDetails] = useState(false);
  const [showPaybackDetails, setShowPaybackDetails] = useState(false);

  // Estado para efeito de surgimento e indicador de slide ativo
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState("slide-1");

  // Script Interativo Guiado (100% Local / Sem IA / Sem Custo de API)
  type DialogStep = "initial" | "moradia_detalhes" | "investimento_detalhes" | "finished";
  const [dialogStep, setDialogStep] = useState<DialogStep>("initial");

  const initialAssistantMessage: ChatMessage = {
    id: "init-1",
    role: "assistant",
    content: "Olá! Aqui é a Sofia, consultora da 4E Imóveis. Vi seu interesse em nossos imóveis e passei para te ajudar a encontrar a melhor opção. Me conta: você busca um imóvel para morar com a família ou para investimento?",
    time: "Agora"
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Canvas Three.js Orgânico e Fluido
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Disparo do efeito de surgimento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 70);
    return () => clearTimeout(timer);
  }, []);

  // Monitoramento de Scroll para atualizar o Slide Ativo
  useEffect(() => {
    const handleScroll = () => {
      const slides = ["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const slide of slides) {
        const el = document.getElementById(slide);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSlide(slide);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 180 : 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x10b981);
    const cyanColor = new THREE.Color(0x06b6d4);
    const deepBlueColor = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 35;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      const mixed = emeraldColor.clone().lerp(i % 3 === 0 ? cyanColor : deepBlueColor, Math.random() * 0.7);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.30 : 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const initY = initialPositions[i3 + 1];
        const initX = initialPositions[i3];

        arr[i3 + 1] = initY + Math.sin(elapsed * 0.6 + initX * 0.2) * 1.3;
        arr[i3] = initX + Math.cos(elapsed * 0.4 + initY * 0.2) * 0.6;
      }
      posAttr.needsUpdate = true;

      particleSystem.rotation.y = elapsed * 0.02 + mouseX * 0.03;
      particleSystem.rotation.x = elapsed * 0.01 + mouseY * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // Rolagem Interna Isolada do Chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  // Função para executar a árvore de decisão do script interativo (Sem IA)
  const handleScriptChoice = (userText: string, nextStep: DialogStep, botResponse: string) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      time: "Agora"
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botResponse,
        time: "Agora"
      };
      setMessages((prev) => [...prev, botMsg]);
      setDialogStep(nextStep);
      setIsTyping(false);
    }, 850);
  };

  // Envio de mensagem livre com resposta consultiva imediata
  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText,
      time: "Agora"
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Entendi perfeitamente sua mensagem! Já registrei essas preferências e acionei nosso corretor especialista da 4E Imóveis para te apresentar as melhores opções disponíveis e agendar sua visita.",
        time: "Agora"
      };
      setMessages((prev) => [...prev, botMsg]);
      setDialogStep("finished");
      setIsTyping(false);
    }, 850);
  };

  const handleResetChat = () => {
    setMessages([initialAssistantMessage]);
    setDialogStep("initial");
    setIsTyping(false);
    setInputValue("");
  };

  const handleApprove = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#3b82f6", "#ffffff"]
    });
    setApproved(true);
    setShowModal(true);
  };

  // Cálculos do simulador de eficiência operacional
  const taxaPerdaSemAtendimentoImediato = 0.35;
  const leadsSalvosDaPerdaMes = Math.round(leadsMes * taxaPerdaSemAtendimentoImediato);
  const taxaConversaoEmVisita = 0.024;
  const visitasAdicionaisMes = Math.max(3, Math.round(leadsMes * taxaConversaoEmVisita));
  const minutosPorTriagemManual = 12;
  const horasEconomizadasMes = Math.round((leadsMes * minutosPorTriagemManual) / 60);
  const custoTotalAnoStarter = 750 + (680 * 12);

  // Parâmetros comerciais do Plano Starter
  const precoMensalRecorrente = billingCycle === "annual" ? 680 : 790;
  const precoSetup = billingCycle === "annual" ? 750 : 1500;
  const economiaSetup = 1500 - 750;
  const economiaMensalidadeAno = (790 - 680) * 12;
  const economiaTotalAno = economiaSetup + economiaMensalidadeAno;

  const slidesNav = [
    { id: "slide-1", num: "1", title: "Início" },
    { id: "slide-2", num: "2", title: "Jornada" },
    { id: "slide-3", num: "3", title: "WhatsApp" },
    { id: "slide-4", num: "4", title: "Retorno" },
    { id: "slide-5", num: "5", title: "Valores" }
  ];

  return (
    <div className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#07090e] text-[#f1f5f9] font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Google Fonts Plus Jakarta Sans e JetBrains Mono */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        body, div, h1, h2, h3, h4, p, span, button, a {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-mono-numbers {
          font-family: 'JetBrains Mono', monospace;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.32; transform: scale(1.04); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Canvas Three.js */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Iluminação Volumétrica */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-emerald-600/15 via-cyan-600/10 to-transparent rounded-full blur-[130px] animate-pulse-slow" />
      </div>

      {/* Header Institucional Fixo */}
      <header
        className={`relative z-40 border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-2xl sticky top-0 pt-[env(safe-area-inset-top)] transition-all duration-700 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10 flex-shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white truncate">4E IMÓVEIS</span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold flex-shrink-0">
                  Exclusivo
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Apresentação Executiva</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#slide-5"
              className="py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <span>Ver Valores</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Dock Flutuante de Paginação de Slides no Mobile */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex sm:hidden items-center gap-1.5 p-1.5 rounded-full bg-[#0c1017]/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {slidesNav.map((s) => {
          const isActive = activeSlide === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 flex items-center gap-1 ${
                isActive
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-bold scale-105"
                  : "text-slate-400 hover:text-white bg-transparent"
              }`}
            >
              <span>{s.num}.</span>
              <span>{s.title}</span>
            </a>
          );
        })}
      </div>

      {/* Conteúdo Principal em Slides Verticais */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pb-20">
        
        {/* ======================================================== */}
        {/* SLIDE 1 · CAPA EXECUTIVA: O DESAFIO & OBJETIVO DA 4E */}
        {/* ======================================================== */}
        <section
          id="slide-1"
          className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col justify-center items-center text-center space-y-6 sm:space-y-8 pt-4 sm:pt-8"
        >
          {/* Badge Executivo */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.12)] transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Documento Confidencial · Exclusivo 4E Imóveis</span>
          </div>

          {/* Título de Alto Impacto */}
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-3xl transition-all duration-700 delay-150 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Atendimento Imediato &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              Gestão de Plantão
            </span>
          </h1>

          {/* Subtítulo Direto */}
          <p
            className={`text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-2 transition-all duration-700 delay-300 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Como a 4E Imóveis garante o primeiro contato no WhatsApp Oficial em menos de 5 segundos, sem fila de espera e com distribuição justa para os corretores.
          </p>

          {/* Trio de Métricas em Pílulas Horizontais Arejadas */}
          <div
            className={`w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-2 transition-all duration-700 delay-[450ms] ease-out ${
              mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-left">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono-numbers text-lg sm:text-xl font-extrabold text-white">&lt; 5s</div>
                <div className="text-[11px] text-slate-300 font-medium">Resposta Imediata</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-left">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono-numbers text-lg sm:text-xl font-extrabold text-white">24/7</div>
                <div className="text-[11px] text-slate-300 font-medium">Sem Fila de Espera</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-left">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono-numbers text-lg sm:text-xl font-extrabold text-white">100%</div>
                <div className="text-[11px] text-slate-300 font-medium">Roleta Automática</div>
              </div>
            </div>
          </div>

          {/* Seta Guia para Próximo Slide */}
          <div className="pt-4">
            <a
              href="#slide-2"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <span>Conheça a Jornada Operacional</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </a>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2 · A JORNADA OPERACIONAL DA 4E IMÓVEIS */}
        {/* ======================================================== */}
        <section
          id="slide-2"
          className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col justify-center space-y-6 sm:space-y-8 pt-6 sm:pt-10"
        >
          <Reveal>
            <div className="text-center space-y-1.5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <Layers className="h-3.5 w-3.5" />
                Operação na Prática
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Como a Operação Funciona no Dia a Dia
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Do primeiro clique do cliente até a visita com o corretor, sem gargalos e sem perder negócios.
              </p>
            </div>
          </Reveal>

          {/* 4 Passos da Jornada Operacional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 max-w-4xl mx-auto w-full">
            
            {/* Passo 1 */}
            <Reveal delay={100}>
              <ExecutiveCard className="p-4 sm:p-6 space-y-3 h-full">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    01
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono-numbers">Entrada do Lead</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white">Chegada Multicanal</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O cliente se interessa por um imóvel nos portais (Zap, VivaReal) ou redes sociais e chama no WhatsApp da 4E Imóveis.
                </p>
                <div className="pt-2 border-t border-white/5 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Meta Cloud API oficial sem risco de banimento</span>
                </div>
              </ExecutiveCard>
            </Reveal>

            {/* Passo 2 */}
            <Reveal delay={200}>
              <ExecutiveCard className="p-4 sm:p-6 space-y-3 h-full" glowColor="rgba(6, 182, 212, 0.25)">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
                    02
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono-numbers">&lt; 5 segundos</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white">Recepção Acolhedora</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sofia responde imediatamente, dá as boas-vindas com o padrão 4E Imóveis e investiga se o objetivo é moradia familiar ou investimento.
                </p>
                <div className="pt-2 border-t border-white/5 text-[11px] text-cyan-400 flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Atendimento consultivo e humanizado</span>
                </div>
              </ExecutiveCard>
            </Reveal>

            {/* Passo 3 */}
            <Reveal delay={300}>
              <ExecutiveCard className="p-4 sm:p-6 space-y-3 h-full" glowColor="rgba(59, 130, 246, 0.25)">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
                    03
                  </div>
                  <span className="text-[10px] text-blue-400 font-mono-numbers">Divisão Justa</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white">Roleta de Plantão</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O contato qualificado é distribuído de forma equitativa para o corretor da vez com notificação instantânea e ficha pronta.
                </p>
                <div className="pt-2 border-t border-white/5 text-[11px] text-blue-400 flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Sem disputa interna de clientes no plantão</span>
                </div>
              </ExecutiveCard>
            </Reveal>

            {/* Passo 4 */}
            <Reveal delay={400}>
              <ExecutiveCard className="p-4 sm:p-6 space-y-3 h-full" glowColor="rgba(168, 85, 247, 0.25)">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold text-xs">
                    04
                  </div>
                  <span className="text-[10px] text-purple-400 font-mono-numbers">Fechamento</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-white">Visita & Negociação</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  O corretor especialista assume a conversa quente no próprio WhatsApp, apresenta as opções de imóveis e agenda a visita presencial.
                </p>
                <div className="pt-2 border-t border-white/5 text-[11px] text-purple-400 flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Lead aquecido pronto para apresentação</span>
                </div>
              </ExecutiveCard>
            </Reveal>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 3 · DEMONSTRAÇÃO PRÁTICA: SCRIPT GUIADO SEM IA */}
        {/* ======================================================== */}
        <section
          id="slide-3"
          className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col justify-center space-y-5 sm:space-y-7 pt-6 sm:pt-10"
        >
          <Reveal>
            <div className="text-center space-y-1.5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <Smartphone className="h-3.5 w-3.5" />
                Demonstração Prática
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Experimente o Fluxo do WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Veja na prática como a recepção acolhe, qualifica e transfere o lead em instantes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="max-w-md mx-auto w-full">
              <div className="rounded-3xl bg-[#0c1017] border border-white/15 shadow-2xl overflow-hidden flex flex-col h-[480px] sm:h-[540px]">
                
                {/* Header do WhatsApp */}
                <div className="bg-[#111722] px-4 py-3 flex items-center justify-between border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center font-bold text-white text-xs border border-emerald-400/30">
                        4E
                      </div>
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#111722]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-white">Sofia · 4E Imóveis</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Consultora Imobiliária · WhatsApp Oficial
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-[10px]"
                    title="Reiniciar conversa"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reiniciar</span>
                  </button>
                </div>

                {/* Mensagens do Chat com Rolagem Interna Isolada */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-[#080b10] overscroll-contain"
                >
                  <div className="text-center my-1">
                    <span className="text-[10px] text-slate-400 bg-white/[0.04] px-3 py-0.5 rounded-full border border-white/[0.06]">
                      Cadência Oficial 4E Imóveis · Demonstração Interativa
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-emerald-600 text-white rounded-tr-none shadow-md"
                            : "bg-[#141b26] text-slate-200 rounded-tl-none border border-white/[0.08]"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <div
                          className={`text-[9px] mt-0.5 text-right ${
                            msg.role === "user" ? "text-emerald-200" : "text-slate-500"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#141b26] rounded-2xl rounded-tl-none border border-white/[0.08] px-3.5 py-2 text-xs text-slate-400 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span>Sofia está digitando...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões do Script Interativo Guiado (Sem IA) */}
                <div className="p-2.5 bg-[#111722] border-t border-white/[0.08] space-y-1.5">
                  <div className="text-[10px] text-slate-400 px-1 font-medium">
                    {dialogStep === "initial" && "Escolha uma opção para testar a resposta:"}
                    {dialogStep === "moradia_detalhes" && "Selecione o perfil desejado:"}
                    {dialogStep === "investimento_detalhes" && "Selecione o tipo de investimento:"}
                    {dialogStep === "finished" && "Atendimento qualificado e transferido!"}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {/* Opções Iniciais */}
                    {dialogStep === "initial" && (
                      <>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Busco para morar com a família em Curitiba.",
                              "moradia_detalhes",
                              "Excelente! Curitiba tem regiões fantásticas. Para eu direcionar com exatidão para o corretor especialista da região, qual bairro você prefere e de quantos dormitórios precisa?"
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all active:scale-95"
                        >
                          Morar com a família
                        </button>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Busco para investimento com rentabilidade em Curitiba.",
                              "investimento_detalhes",
                              "Excelente visão! Nosso foco em investimento imobiliário busca valorização sólida e liquidez de locação. Você tem interesse em lançamentos na planta ou imóveis prontos já com renda?"
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all active:scale-95"
                        >
                          Investimento patrimonial
                        </button>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Gostaria de falar direto com o corretor responsável.",
                              "finished",
                              "Com certeza! Já estou acionando a Roleta de Plantão da 4E Imóveis. O corretor especialista disponível assumirá este atendimento em instantes no seu WhatsApp."
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs transition-all active:scale-95"
                        >
                          Falar com corretor
                        </button>
                      </>
                    )}

                    {/* Opções de Moradia */}
                    {dialogStep === "moradia_detalhes" && (
                      <>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Preferência por 3 ou 4 dormitórios no Ecoville.",
                              "finished",
                              "Perfeito! Já registrei suas preferências na ficha. Estou transferindo agora para o nosso corretor especialista do Ecoville para te apresentar as melhores opções disponíveis e agendar sua visita!"
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all active:scale-95"
                        >
                          3 ou 4 quartos no Ecoville
                        </button>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Apartamento amplo na região do Batel.",
                              "finished",
                              "Excelente escolha! Já registrei sua solicitação. Nosso corretor especialista no Batel entrará em contato em instantes com os imóveis disponíveis nessa linha."
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all active:scale-95"
                        >
                          Apartamento no Batel
                        </button>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Casa em condomínio fechado com boa segurança.",
                              "finished",
                              "Perfeito! As casas em condomínio têm alta procura em Curitiba. O corretor de plantão especialista em condomínios fechados já recebeu seus dados e vai te chamar agora!"
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all active:scale-95"
                        >
                          Casa em condomínio
                        </button>
                      </>
                    )}

                    {/* Opções de Investimento */}
                    {dialogStep === "investimento_detalhes" && (
                      <>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Lançamentos na planta com potencial de valorização.",
                              "finished",
                              "Excelente! Nossos estudos de mercado mostram ótimo potencial de rentabilidade na planta em Curitiba. Nosso consultor de investimentos entrará em contato com a apresentação completa dos projetos!"
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all active:scale-95"
                        >
                          Lançamentos na planta
                        </button>
                        <button
                          type="button"
                          disabled={isTyping}
                          onClick={() =>
                            handleScriptChoice(
                              "Imóveis prontos já gerando renda de locação.",
                              "finished",
                              "Perfeito! Temos carteira com yield atrativo e inquilinos já alocados. O corretor especialista em locação comercial e residencial já vai te enviar as opções com cálculo de retorno."
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all active:scale-95"
                        >
                          Imóveis prontos com renda
                        </button>
                      </>
                    )}

                    {/* Estado Final */}
                    {dialogStep === "finished" && (
                      <div className="w-full flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          <span>Handoff concluído com sucesso para o corretor</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleResetChat}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[11px] hover:bg-emerald-400 active:scale-95 transition-all flex-shrink-0"
                        >
                          Testar de novo
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input com 16px no mobile contra zoom forçado do Safari */}
                <form
                  onSubmit={handleCustomSend}
                  className="bg-[#111722] p-2.5 flex items-center gap-2 border-t border-white/[0.06]"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ou digite uma mensagem livre..."
                    disabled={isTyping}
                    className="flex-1 bg-[#080b10] border border-white/10 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors min-h-[44px]"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-30 text-slate-950 transition-all font-bold min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0 shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Nota de Esclarecimento Executivo */}
              <div className="mt-3.5 text-center px-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c1017]/90 border border-white/[0.08] text-[11px] sm:text-xs text-slate-300 backdrop-blur-xl shadow-lg">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>
                    <strong className="text-white font-semibold">Simulação demonstrativa:</strong> A versão original em produção é conectada à IA com cérebro e comportamento consultivo da 4E Imóveis.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4 · DIAGNÓSTICO OPERACIONAL & PAYBACK REALISTA */}
        {/* ======================================================== */}
        <section
          id="slide-4"
          className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col justify-center space-y-6 sm:space-y-8 pt-6 sm:pt-10"
        >
          <Reveal>
            <div className="text-center space-y-1.5 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                Diagnóstico & Retorno
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                O Impacto no seu Plantão de Vendas
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Veja quantos contatos deixam de ser perdidos quando o atendimento ocorre no primeiro minuto.
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto w-full space-y-4">
            
            {/* Bloco do Slider Touch */}
            <Reveal delay={100}>
              <ExecutiveCard className="p-5 sm:p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Novos Leads Recebidos / Mês:</span>
                    <span className="font-bold text-emerald-400 font-mono-numbers text-base">{leadsMes} leads</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1500}
                    step={50}
                    value={leadsMes}
                    onChange={(e) => setLeadsMes(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono-numbers">
                    <span>100 leads</span>
                    <span>750 leads</span>
                    <span>1.500 leads</span>
                  </div>
                </div>

                {/* 3 Métricas de Impacto */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#080b10] border border-white/[0.06] text-left">
                    <div className="text-[11px] text-slate-400">Leads Salvos da Perda:</div>
                    <div className="text-lg font-bold font-mono-numbers text-emerald-400 mt-0.5">+{leadsSalvosDaPerdaMes} / mês</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">35% evitados do abandono</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080b10] border border-white/[0.06] text-left">
                    <div className="text-[11px] text-slate-400">Horas Poupadas da Equipe:</div>
                    <div className="text-lg font-bold font-mono-numbers text-cyan-400 mt-0.5">~{horasEconomizadasMes}h / mês</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Foco em visitas presenciais</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080b10] border border-white/[0.06] text-left">
                    <div className="text-[11px] text-slate-400">Visitas Adicionais:</div>
                    <div className="text-lg font-bold font-mono-numbers text-purple-400 mt-0.5">+{visitasAdicionaisMes} reuniões/mês</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Leads com perfil alinhado</div>
                  </div>
                </div>
              </ExecutiveCard>
            </Reveal>

            {/* Cartão de Payback Realista */}
            <Reveal delay={200}>
              <ExecutiveCard className="p-5 sm:p-6 space-y-3 border-emerald-500/35" glowColor="rgba(16, 185, 129, 0.35)">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                    Ponto de Equilíbrio Imobiliário
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                    1 Único Fechamento no Ano Quita 100% da Plataforma
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium pt-1 leading-relaxed">
                    O custo total de 12 meses no Plano Starter é de R$ {custoTotalAnoStarter.toLocaleString("pt-BR")}/ano. A comissão de uma única venda média ou contrato de locação já cobre integralmente a ferramenta.
                  </p>
                </div>

                {/* Botão Sanfona Expansível */}
                <button
                  type="button"
                  onClick={() => setShowPaybackDetails(!showPaybackDetails)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold pt-1 focus:outline-none"
                >
                  <span>{showPaybackDetails ? "Ocultar detalhamento matemático" : "Ver detalhamento desse cálculo"}</span>
                  {showPaybackDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {showPaybackDetails && (
                  <div className="p-3.5 rounded-xl bg-[#080b10] border border-white/[0.06] text-xs text-slate-300 space-y-2 mt-2 leading-relaxed animate-in fade-in duration-200">
                    <div className="flex justify-between text-slate-300">
                      <span>Investimento Anual Total (Starter Anual):</span>
                      <span className="font-bold text-white font-mono-numbers">R$ 8.910,00</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Considerando o ticket médio de imóveis em Curitiba e a taxa de comissão imobiliária padrão, viabilizar apenas 1 negócio extra entre as centenas de leads atendidos ao longo de 12 meses torna o investimento autossustentável desde o primeiro ano.
                    </p>
                  </div>
                )}
              </ExecutiveCard>
            </Reveal>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5 · PROPOSTA COMERCIAL & CONDIÇÕES DE PARCERIA */}
        {/* ======================================================== */}
        <section
          id="slide-5"
          className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col justify-center space-y-6 sm:space-y-8 pt-6 sm:pt-10"
        >
          <Reveal>
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                <Award className="h-3.5 w-3.5" />
                Condições Comerciais
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Investimento no Plano Starter
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Implementação Turnkey, acompanhamento de 12 meses e infraestrutura oficial inclusos.
              </p>

              {/* Seletor Anual vs Mensal */}
              <div className="pt-2 flex justify-center">
                <div className="inline-flex p-1 rounded-2xl bg-white/[0.06] border border-white/10 max-w-full">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("annual")}
                    className={`py-2 px-4 sm:px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      billingCycle === "annual"
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Anual</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                      billingCycle === "annual" ? "bg-slate-950/20 text-slate-950" : "bg-emerald-500/20 text-emerald-300"
                    }`}>
                      Setup -50%
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`py-2 px-4 sm:px-5 rounded-xl text-xs font-bold transition-all ${
                      billingCycle === "monthly"
                        ? "bg-white text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Mensal (3 meses)
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Bloco 1: Setup / Implementação */}
            <Reveal delay={100}>
              <ExecutiveCard className="p-5 sm:p-7 space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-bold tracking-wider">Etapa 1</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">Implementação Turnkey</h3>
                    </div>
                    {billingCycle === "annual" && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        50% OFF
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-extrabold font-mono-numbers text-white">
                        R$ {precoSetup.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">taxa única</span>
                    </div>
                    {billingCycle === "annual" && (
                      <div className="text-xs text-slate-500 line-through font-mono-numbers">De R$ 1.500 por R$ 750</div>
                    )}
                  </div>

                  <div className="border-t border-white/[0.08] pt-3 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>Conexão oficial Meta Cloud API</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>Parametrização do atendimento da 4E Imóveis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span><strong>15 dias</strong> para entrega completa</span>
                    </div>
                  </div>

                  {/* Accordion para Itens Extras */}
                  <button
                    type="button"
                    onClick={() => setShowSetupDetails(!showSetupDetails)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold pt-1 focus:outline-none"
                  >
                    <span>{showSetupDetails ? "Ocultar detalhes extras" : "+ Ver todos os itens inclusos"}</span>
                    {showSetupDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {showSetupDetails && (
                    <div className="pt-2 space-y-2 text-xs text-slate-300 border-t border-white/5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>Configuração dos funis e Roleta de Corretores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>Passo a passo completo integrado na plataforma (sem videochamadas)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>12 meses de acompanhamento próximo</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-[#080b10] text-[11px] text-slate-400 text-center border border-white/[0.04] mt-2">
                  Tudo configurado para uso imediato da equipe.
                </div>
              </ExecutiveCard>
            </Reveal>

            {/* Bloco 2: Mensalidade Starter */}
            <Reveal delay={200}>
              <ExecutiveCard className="p-5 sm:p-7 space-y-4 flex flex-col justify-between border-emerald-500/35 shadow-xl h-full" glowColor="rgba(16, 185, 129, 0.45)">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-emerald-400 uppercase font-bold tracking-wider">Etapa 2</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">Mensalidade Starter</h3>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 shadow-sm">
                      Recomendado
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-extrabold font-mono-numbers text-white">
                        R$ {precoMensalRecorrente.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ mês (Pix / Boleto)</span>
                    </div>
                    {billingCycle === "annual" ? (
                      <div className="space-y-1 pt-0.5">
                        <div className="text-xs text-slate-300 flex items-center gap-1.5">
                          <span className="text-slate-400">Cartão de Crédito (12x):</span>
                          <span className="font-bold font-mono-numbers text-white">R$ 730</span>
                          <span className="text-[11px] text-slate-400">/ mês (c/ taxas da operadora)</span>
                        </div>
                        <div className="text-xs text-emerald-400 font-mono-numbers font-medium">
                          Economia anual de R$ {economiaTotalAno.toLocaleString("pt-BR")} no plano anual
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400">Fidelidade contratual de 3 meses</div>
                    )}
                  </div>

                  <div className="border-t border-white/[0.08] pt-3 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span>Até <strong>4 corretores / usuários</strong> no painel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span><strong>1 número WhatsApp Oficial</strong> multiatendente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span><strong>Grupo no WhatsApp nos 12 meses</strong> em horário comercial</span>
                    </div>
                  </div>

                  {/* Accordion para Itens Extras */}
                  <button
                    type="button"
                    onClick={() => setShowMonthlyDetails(!showMonthlyDetails)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold pt-1 focus:outline-none"
                  >
                    <span>{showMonthlyDetails ? "Ocultar detalhes extras" : "+ Ver todos os itens inclusos"}</span>
                    {showMonthlyDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {showMonthlyDetails && (
                    <div className="pt-2 space-y-2 text-xs text-slate-300 border-t border-white/5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>800 atendimentos qualificados/mês inclusos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>Roleta de corretores automatizada ativa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                        <span>Excedente transparente de R$ 0,45 por conversa</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nota de Intermediação pelo Marketing */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center space-y-1">
                  <div className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Proposta Executiva Confidencial</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Fechamento e ativação operacional intermediados diretamente pela assessoria de marketing da 4E Imóveis.
                  </p>
                </div>
              </ExecutiveCard>
            </Reveal>

          </div>
        </section>

      </main>

      {/* Rodapé Limpo e Institucional */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 space-y-1 px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <p>4E Imóveis · Apresentação Comercial Executiva</p>
        <p className="text-[11px] text-slate-600">Documento confidencial · Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
