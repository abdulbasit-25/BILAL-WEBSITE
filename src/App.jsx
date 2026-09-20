import React, { useState, useEffect, useRef, useMemo } from "react";
import emailjs from "@emailjs/browser";
import truckImage from "./assets/truck.jpg";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Search,
  DollarSign,
  MessageSquare,
  Route,
  FileText,
  Headphones,
  ArrowRight,
  Star,
  Truck,
  Snowflake,
  Container,
  Layers,
  Package,
  Zap,
  Gauge,
  ShieldCheck,
  Users,
  MapPin,
  Radio,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  BadgeCheck,
  Globe,
  ClipboardCheck,
  ArrowUp,
  Copy,
  Check,
  Cookie,
  Quote,
} from "lucide-react";

/* ============================================================
   CENTRAL CONFIG — swap in real business details here
   ============================================================ */
const CONFIG = {
  companyName: "Keep Hauling",
  tagline: "Truck Dispatching & Freight Management",
  phone: "(404) 470-3820",
  phoneRaw: "+14044703820",
  email: "ba6306529@gmail.com",
  address: "3500 Adams St, Apt 2S, Bellwood, IL 60104",
  city: "Bellwood",
  state: "IL",
  zip: "60104",
  dispatchPercentage: "5–8%",
  yearsExperience: "5+",
  loadsBooked: "500+",
  statesCovered: "48",
  supportHours: "24/7",
  siteUrl: "https://www.keephauling.com",
  emailjs: {
    serviceId: "service_rxfgs4l",
    templateId: "template_buy3eag",
    publicKey: "Vpm65oOCm_H0YUDdE",
  },
  social: { facebook: "#", instagram: "#", linkedin: "#" },
};

/* ============================================================
   DESIGN TOKENS
   A freight/highway-driven palette: deep road-night navy, a hot
   dispatch-console red, and a caution-tape amber pulled from
   the industry itself rather than a generic SaaS gradient.
   ============================================================ */
const COLORS = {
  navy: "#0B1D33",
  navyDeep: "#061220",
  steel: "#1F3A5F",
  charcoal: "#12181F",
  white: "#FFFFFF",
  paper: "#EEF1F5",
  ink: "#4B5563",
  red: "#E63946",
  redDark: "#C62B38",
  amber: "#F4A81E",
};

/* Sample lane pricing — illustrative only, not live rate data. */
const LANE_SNAPSHOT = [
  {
    origin: "Atlanta, GA",
    dest: "Dallas, TX",
    equip: "Dry Van",
    rate: "$2.10–2.35/mi",
  },
  {
    origin: "Chicago, IL",
    dest: "Charlotte, NC",
    equip: "Reefer",
    rate: "$2.40–2.65/mi",
  },
  {
    origin: "Houston, TX",
    dest: "Phoenix, AZ",
    equip: "Flatbed",
    rate: "$2.05–2.30/mi",
  },
  {
    origin: "Memphis, TN",
    dest: "Newark, NJ",
    equip: "Power Only",
    rate: "$1.95–2.20/mi",
  },
];

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

/* ============================================================
   EQUIPMENT — each has its own icon treatment + own page
   ============================================================ */
const EQUIPMENT = [
  {
    key: "dry-van",
    name: "Dry Van",
    icon: Container,
    tagline: "Steady freight, dialed-in lanes.",
    desc: "The most common trailer on the road — and the easiest to keep loaded consistently when someone is actively working your lanes.",
    benefits: [
      "Matched to your preferred lanes and home time",
      "Consistent freight between regional and OTR runs",
      "Rate negotiation on every load, not just the big ones",
      "Backhaul planning to cut empty miles",
    ],
    freight: [
      "Palletized goods",
      "Retail & distribution freight",
      "General manufactured goods",
      "Packaged consumer products",
    ],
  },
  {
    key: "reefer",
    name: "Reefer",
    icon: Snowflake,
    tagline: "Temperature-controlled freight, handled right.",
    desc: "Reefer freight leaves less room for error — tighter windows, stricter brokers, and freight that can't sit. Our dispatchers know the difference.",
    benefits: [
      "Freight matched to your reefer's temp range",
      "Appointment-sensitive scheduling handled for you",
      "Broker vetting for food-grade and perishable loads",
      "Rate negotiation that accounts for reefer premiums",
    ],
    freight: [
      "Produce & perishables",
      "Food-grade packaged goods",
      "Pharmaceuticals",
      "Frozen goods",
    ],
  },
  {
    key: "flatbed",
    name: "Flatbed",
    icon: Layers,
    tagline: "Open-deck freight, planned around securement.",
    desc: "Flatbed work rewards dispatchers who understand tarping, securement, and permit requirements — not just who can find a load board listing.",
    benefits: [
      "Loads matched to your tarps, chains, and straps",
      "Oversize/permit coordination where needed",
      "Steady construction and industrial freight",
      "Rate negotiation that reflects flatbed labor",
    ],
    freight: [
      "Steel & coils",
      "Lumber & building materials",
      "Machinery",
      "Pipe & roofing materials",
    ],
  },
  {
    key: "step-deck",
    name: "Step Deck",
    icon: Gauge,
    tagline: "Taller loads, planned the right way.",
    desc: "Step deck freight often means oversized or height-restricted loads. We plan routes and permits around the load, not the other way around.",
    benefits: [
      "Freight matched to deck length and capacity",
      "Route planning around height and permit restrictions",
      "Access to specialized/oversized freight opportunities",
      "Rate negotiation reflecting specialized equipment",
    ],
    freight: [
      "Tall machinery & equipment",
      "Construction equipment",
      "Oversized industrial loads",
      "Agricultural equipment",
    ],
  },
  {
    key: "box-truck",
    name: "Box Truck",
    icon: Package,
    tagline: "Regional and local freight, kept full.",
    desc: "Box truck operators need tighter, more local freight — we focus on regional lanes and quick-turn loads instead of forcing you into OTR runs.",
    benefits: [
      "Regional and local freight prioritized",
      "Faster load turnaround for smaller freight",
      "Home-time-friendly lane planning",
      "Rate negotiation sized to box truck freight",
    ],
    freight: [
      "Last-mile deliveries",
      "Regional distribution",
      "Smaller commercial loads",
      "Expedited local freight",
    ],
  },
  {
    key: "power-only",
    name: "Power Only",
    icon: Zap,
    tagline: "Your tractor, matched to trailers that pay.",
    desc: "Power-only freight moves fast and can leave you guessing on trailer pools and drop yards. We keep you matched to freight that actually works.",
    benefits: [
      "Drop-and-hook freight matched to your tractor",
      "Trailer pool and yard coordination",
      "Flexible capacity freight prioritized",
      "Rate negotiation on every power-only load",
    ],
    freight: [
      "Drop & hook trailers",
      "Yard/spotting moves",
      "Retail distribution trailers",
      "Flexible capacity freight",
    ],
  },
  {
    key: "hotshot",
    name: "Hotshot",
    icon: Truck,
    tagline: "Time-sensitive freight, moved fast.",
    desc: "Hotshot freight lives and dies on speed and communication. Our dispatchers prioritize fast-turn loads that fit your rig and timeline.",
    benefits: [
      "Time-sensitive loads matched to your rig",
      "Fast confirmations so you're not sitting idle",
      "Smaller, expedited freight prioritized",
      "Rate negotiation reflecting expedited service",
    ],
    freight: [
      "Expedited freight",
      "Construction equipment parts",
      "Smaller LTL-style loads",
      "Emergency/rush shipments",
    ],
  },
];

/* ============================================================
   OTHER STATIC DATA
   ============================================================ */
const TRUST_STATS = [
  { value: CONFIG.loadsBooked, label: "Loads Booked" },
  { value: CONFIG.statesCovered, label: "States Covered" },
  { value: CONFIG.supportHours, label: "Dispatch Support" },
  { value: CONFIG.yearsExperience, label: "Years in the Industry" },
];

const PROBLEMS = [
  { icon: Search, text: "Spending hours a day scrolling load boards" },
  { icon: DollarSign, text: "Getting handed low-ball rate offers" },
  { icon: Phone, text: "Chasing brokers down for confirmations" },
  { icon: Route, text: "Eating deadhead miles that kill your margin" },
  { icon: FileText, text: "Doing paperwork after a full day of driving" },
  { icon: Clock, text: "Freight that dries up between good lanes" },
];

const SERVICES = [
  {
    icon: Search,
    title: "Load Searching",
    desc: "We continuously search available freight matching your equipment, location, and preferred lanes.",
  },
  {
    icon: DollarSign,
    title: "Rate Negotiation",
    desc: "We negotiate with brokers and shippers to help secure competitive rates on every load.",
  },
  {
    icon: MessageSquare,
    title: "Broker Communication",
    desc: "We handle the calls, emails, and confirmations that come with every broker relationship.",
  },
  {
    icon: Route,
    title: "Route & Lane Planning",
    desc: "We plan profitable routes, weighing deadhead, mileage, and the lanes you actually want to run.",
  },
  {
    icon: FileText,
    title: "Documentation & Paperwork",
    desc: "Rate confirmations, carrier packets, setup documents, and dispatch paperwork — handled for you.",
  },
  {
    icon: Headphones,
    title: "24/7 Dispatch Support",
    desc: "Our dispatch team stays available to help manage your loads and resolve issues on the road.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Tell Us About Your Truck",
    desc: "Share your equipment type, home base, and the lanes you want to run.",
  },
  {
    n: "02",
    title: "Get Connected With Your Dispatcher",
    desc: "You're matched with a dedicated dispatcher who learns how you operate.",
  },
  {
    n: "03",
    title: "We Search & Negotiate Loads",
    desc: "We work the boards and broker relationships to find and negotiate freight.",
  },
  {
    n: "04",
    title: "You Drive. We Handle the Rest.",
    desc: "Paperwork, confirmations, and support are covered while you're on the road.",
  },
];

const WHY_US = [
  { icon: Users, text: "Experienced Dispatchers" },
  { icon: DollarSign, text: "Aggressive Rate Negotiation" },
  { icon: ShieldCheck, text: "Personalized Dispatching" },
  { icon: MapPin, text: "Nationwide Freight Coverage" },
  { icon: MessageSquare, text: "Transparent Communication" },
  { icon: Truck, text: "Carrier-Focused Service" },
];

const VALUES = [
  {
    icon: BadgeCheck,
    title: "Carrier-First",
    desc: "You're the client. Every decision starts with what's good for your truck and your bottom line.",
  },
  {
    icon: Globe,
    title: "Always Working",
    desc: "Our dispatchers are searching and negotiating while you're driving, not waiting for you to call.",
  },
  {
    icon: ClipboardCheck,
    title: "No Surprises",
    desc: "Transparent rates, transparent fees, and a dispatcher who tells you what's actually happening.",
  },
];

/* Placeholder testimonials shown for layout — swap for verified
   customer feedback (with permission) before launch. */
const TESTIMONIALS = [
  {
    name: "Marcus R.",
    company: "Sample Owner-Operator",
    equipment: "Dry Van",
    rating: 5,
    quote: `Since switching to ${CONFIG.companyName}, I spend a lot less time searching for loads and more time driving.`,
  },
  {
    name: "Denise T.",
    company: "Sample Carrier, 3 Trucks",
    equipment: "Reefer",
    rating: 5,
    quote:
      "My dispatcher actually calls me back. Rate confirmations show up before I've finished my coffee.",
  },
  {
    name: "Isaiah W.",
    company: "Sample Owner-Operator",
    equipment: "Flatbed",
    rating: 4,
    quote:
      "Communication is the biggest difference. I always know what's coming next.",
  },
  {
    name: "Priya K.",
    company: "Sample Fleet, 8 Trucks",
    equipment: "Step Deck",
    rating: 5,
    quote:
      "Onboarding a new truck used to be a headache. Now it's a phone call.",
  },
];

const PRICING_FEATURES = [
  "Load Search",
  "Rate Negotiation",
  "Broker Communication",
  "Paperwork & Documentation",
  "Load Tracking",
  "Dispatch Support",
];

const FAQS = [
  {
    q: "What does a truck dispatcher do?",
    a: "A dispatcher finds available freight matching your equipment and lanes, negotiates rates with brokers and shippers, handles confirmations and paperwork, and stays available to solve problems while you're on the road.",
  },
  {
    q: "How much does dispatching cost?",
    a: `Our dispatch service runs ${CONFIG.dispatchPercentage} per load, depending on lane and equipment type.`,
  },
  {
    q: "Do you work with owner-operators?",
    a: "Yes. Owner-operators are a core part of who we dispatch for, alongside small carriers and fleets.",
  },
  {
    q: "Do you dispatch multiple trucks?",
    a: "Yes, we work with fleets of multiple trucks and can assign dedicated dispatchers as you scale.",
  },
  {
    q: "What equipment do you dispatch?",
    a: "Dry van, reefer, flatbed, step deck, box truck, power only, and hotshot.",
  },
  {
    q: "Do you negotiate rates?",
    a: "Yes — rate negotiation with brokers and shippers is a core part of the service.",
  },
  {
    q: "Do you work nationwide?",
    a: `Yes, we cover freight across ${CONFIG.statesCovered} contiguous states.`,
  },
  {
    q: "Do you provide 24/7 support?",
    a: "Our dispatch team is available around the clock to help manage loads and resolve issues.",
  },
  {
    q: "Do I need my own MC authority?",
    a: "Yes, you'll need your own active MC authority — we dispatch under your operating authority, not ours.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the form on our Contact page or call our dispatch team directly.",
  },
];

/* ============================================================
   SEO — per-route title/description, used to update <head>
   ============================================================ */
const SEO_META = {
  "/": {
    title: `${CONFIG.companyName} | Nationwide Truck Dispatch Service`,
    description: `${CONFIG.companyName} finds loads, negotiates rates, and handles broker paperwork for owner-operators and small fleets nationwide. ${CONFIG.supportHours} dispatch support.`,
  },
  "/services": {
    title: `Dispatch Services | ${CONFIG.companyName}`,
    description:
      "Load searching, rate negotiation, broker communication, and paperwork — full-service truck dispatching for every trailer type.",
  },
  "/how-it-works": {
    title: `How It Works | ${CONFIG.companyName}`,
    description:
      "See exactly how our dispatch process works, from onboarding your truck to your first negotiated load.",
  },
  "/about": {
    title: `About Us | ${CONFIG.companyName}`,
    description: `Meet the dispatch team behind ${CONFIG.companyName} and the carrier-first approach we bring to every load.`,
  },
  "/coverage": {
    title: `Nationwide Coverage | ${CONFIG.companyName}`,
    description: `${CONFIG.companyName} dispatches freight across all ${CONFIG.statesCovered} contiguous states with dispatchers who know regional lane patterns.`,
  },
  "/faq": {
    title: `Dispatch FAQ | ${CONFIG.companyName}`,
    description:
      "Answers to the most common questions carriers ask before signing up for dispatch service.",
  },
  "/contact": {
    title: `Get Started | ${CONFIG.companyName}`,
    description:
      "Tell us about your truck and lanes — a dispatcher follows up the same business day.",
  },
};

/* ============================================================
   ROUTER
   ============================================================ */
function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname || "/");
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });
  }, [path]);
  return path;
}
function navigate(path) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/* ============================================================
   SEO HEAD MANAGEMENT
   Updates document title / meta description / canonical / JSON-LD
   on every route change. No external head-management library needed.
   ============================================================ */
function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setLinkCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
function setJSONLD(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
function useSEO(route) {
  useEffect(() => {
    document.documentElement.lang = "en";
    const base = route.split("/").slice(0, 2).join("/") || "/";
    const meta = SEO_META[base] || SEO_META["/"];
    const canonicalUrl =
      route === "/" ? `${CONFIG.siteUrl}/` : `${CONFIG.siteUrl}${route}`;
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("robots", "index, follow");
    setMeta("og:title", meta.title, "property");
    setMeta("og:description", meta.description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", CONFIG.companyName, "property");
    setMeta("og:locale", "en_US", "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", `${CONFIG.siteUrl}/og-image.jpg`, "property");
    setMeta(
      "og:image:alt",
      "Keep Hauling truck dispatching services",
      "property",
    );
    setMeta("og:image:type", "image/jpeg", "property");
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", `${CONFIG.siteUrl}/og-image.jpg`);
    setMeta("twitter:image:alt", "Keep Hauling truck dispatching services");
    setLinkCanonical(canonicalUrl);

    setJSONLD("ld-org", {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${CONFIG.siteUrl}/#business`,
      name: CONFIG.companyName,
      description: SEO_META["/"].description,
      telephone: CONFIG.phoneRaw,
      email: CONFIG.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3500 Adams St, Apt 2S",
        addressLocality: CONFIG.city,
        addressRegion: CONFIG.state,
        postalCode: CONFIG.zip,
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      serviceType: "Truck dispatching and freight management",
      url: CONFIG.siteUrl,
      priceRange: "$$",
    });
  }, [route]);
}

/* ============================================================
   SHARED UI PRIMITIVES
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-sm font-bold mb-3"
      style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}
    >
      <span
        style={{
          width: 28,
          height: 2,
          background: COLORS.red,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function Headline({
  children,
  dark = false,
  className = "",
  size = "text-4xl md:text-5xl",
  as = "h2",
}) {
  const Tag = as;
  return (
    <Tag
      className={`${size} leading-[1.05] mb-4 ${className}`}
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "0.01em",
        color: dark ? COLORS.white : COLORS.navy,
      }}
    >
      {children}
    </Tag>
  );
}
function PrimaryButton({
  children,
  href = "#/contact",
  className = "",
  onClick,
  isRoute = true,
}) {
  const handle = (e) => {
    if (isRoute) {
      e.preventDefault();
      navigate(href.replace(/^#/, ""));
    }
    if (onClick) onClick(e);
  };
  return (
    <a
      href={href}
      onClick={handle}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm tracking-wide transition-all duration-200 ${className}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        background: COLORS.red,
        color: COLORS.white,
        clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.redDark)}
      onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.red)}
    >
      {children}
    </a>
  );
}
function SecondaryButton({ children, href, className = "", dark = false }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm tracking-wide border-2 transition-colors duration-200 ${className}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        borderColor: dark ? COLORS.white : COLORS.navy,
        color: dark ? COLORS.white : COLORS.navy,
      }}
    >
      {children}
    </a>
  );
}
function RouteLink({
  to,
  children,
  className = "",
  style = {},
  onNavigate,
  active,
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      style={style}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        if (onNavigate) onNavigate();
      }}
    >
      {children}
    </a>
  );
}

/* Reusable truck image backdrop for hero and interior page headers. */
function RouteBackdrop({ variant = "hero" }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <img
        src={truckImage}
        alt=""
        className="h-full w-full object-cover"
        decoding="async"
        style={{ opacity: variant === "hero" ? 0.5 : 0.38 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,18,32,0.96) 0%, rgba(11,29,51,0.72) 52%, rgba(11,29,51,0.34) 100%)",
        }}
      />
    </div>
  );
}

/* Truck image panel used for equipment cards until dedicated photos are added. */
function EquipmentPanel({ Icon, size = 40, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: COLORS.navy }}
    >
      <img
        src={truckImage}
        alt="Truck used for freight dispatching"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        style={{ opacity: 0.62 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(6,18,32,0.46)" }}
        aria-hidden="true"
      />
      <Icon
        size={size}
        color={COLORS.white}
        strokeWidth={1.5}
        className="relative"
      />
    </div>
  );
}

function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden"
      style={{ background: COLORS.navy }}
    >
      <RouteBackdrop variant="page" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Headline
          as="h1"
          dark
          size="text-4xl md:text-6xl"
          className="max-w-3xl"
        >
          {title}
        </Headline>
        {subtitle && (
          <p
            className="text-base md:text-lg max-w-2xl"
            style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
function Breadcrumb({ items }) {
  const crumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: it.to ? `${CONFIG.siteUrl}${it.to}` : undefined,
    })),
  };
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs mb-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={12} style={{ color: "#8A94A0" }} />}
          {it.to ? (
            <RouteLink to={it.to} style={{ color: "#6B7280" }}>
              {it.label}
            </RouteLink>
          ) : (
            <span
              style={{ color: COLORS.navy, fontWeight: 700 }}
              aria-current="page"
            >
              {it.label}
            </span>
          )}
        </span>
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }}
      />
    </nav>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => route === to || (to !== "/" && route.startsWith(to));

  const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services", dropdown: EQUIPMENT },
    { label: "How It Works", to: "/how-it-works" },
    { label: "About", to: "/about" },
    { label: "Coverage", to: "/coverage" },
    { label: "FAQ", to: "/faq" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? COLORS.navy : "rgba(11,31,51,0.94)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <RouteLink to="/" className="flex items-center gap-2">
            <div style={{ width: 10, height: 28, background: COLORS.red }} />
            <span
              className="text-xl md:text-2xl"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: COLORS.white,
                letterSpacing: "0.03em",
              }}
            >
              {CONFIG.companyName}
            </span>
          </RouteLink>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((l) => (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => l.dropdown && setServicesOpen(true)}
                onMouseLeave={() => l.dropdown && setServicesOpen(false)}
              >
                <RouteLink
                  to={l.to}
                  active={isActive(l.to)}
                  className="flex items-center gap-1 text-sm font-semibold py-2"
                  style={{
                    color: isActive(l.to) ? COLORS.white : "#B8C1CC",
                    fontFamily: "'Inter', sans-serif",
                    borderBottom: isActive(l.to)
                      ? `2px solid ${COLORS.red}`
                      : "2px solid transparent",
                  }}
                >
                  {l.label} {l.dropdown && <ChevronDown size={14} />}
                </RouteLink>
                {l.dropdown && servicesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div
                      className="bg-white shadow-xl py-2"
                      style={{ borderTop: `3px solid ${COLORS.red}` }}
                    >
                      {l.dropdown.map((eq) => (
                        <RouteLink
                          key={eq.key}
                          to={`/services/${eq.key}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                          style={{
                            color: COLORS.navy,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          <eq.icon size={16} style={{ color: COLORS.red }} />{" "}
                          {eq.name}
                        </RouteLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <SiteSearch />
            <a
              href={`tel:${CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-bold"
              style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}
            >
              <Phone size={16} style={{ color: COLORS.red }} /> {CONFIG.phone}
            </a>
            <PrimaryButton href="/contact">GET STARTED</PrimaryButton>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ color: COLORS.white }}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div
            className="lg:hidden px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto"
            style={{ background: COLORS.navy }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <div
                  key={l.to}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <RouteLink
                      to={l.to}
                      active={isActive(l.to)}
                      onNavigate={() => setOpen(false)}
                      className="py-3 text-base font-semibold flex-1"
                      style={{
                        color: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {l.label}
                    </RouteLink>
                    {l.dropdown && (
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        style={{ color: COLORS.white }}
                        className="p-2"
                        aria-label="Toggle services submenu"
                        aria-expanded={mobileServicesOpen}
                      >
                        <ChevronDown
                          size={18}
                          style={{
                            transform: mobileServicesOpen
                              ? "rotate(180deg)"
                              : "none",
                            transition: "transform 0.2s ease",
                          }}
                        />
                      </button>
                    )}
                  </div>
                  {l.dropdown && mobileServicesOpen && (
                    <div className="pb-3 pl-3 flex flex-col gap-1">
                      {l.dropdown.map((eq) => (
                        <RouteLink
                          key={eq.key}
                          to={`/services/${eq.key}`}
                          onNavigate={() => setOpen(false)}
                          className="py-2 text-sm font-semibold"
                          style={{
                            color: "#B8C1CC",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {eq.name}
                        </RouteLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-5">
              <a
                href={`tel:${CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 font-bold border-2"
                style={{
                  color: COLORS.white,
                  borderColor: COLORS.white,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Phone size={16} /> {CONFIG.phone}
              </a>
              <PrimaryButton href="/contact" onClick={() => setOpen(false)}>
                GET STARTED
              </PrimaryButton>
            </div>
          </div>
        )}
      </header>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.15)" }}
      >
        <a
          href={`tel:${CONFIG.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm"
          style={{
            background: COLORS.navy,
            color: COLORS.white,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Phone size={16} /> CALL NOW
        </a>
        <a
          href="#/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate("/contact");
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm"
          style={{
            background: COLORS.red,
            color: COLORS.white,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          GET STARTED
        </a>
      </div>
    </>
  );
}

/* ============================================================
   REUSABLE SECTIONS
   ============================================================ */
function TrustBar() {
  return (
    <section className="py-10 md:py-14" style={{ background: COLORS.charcoal }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p
          className="text-center text-sm font-bold mb-8"
          style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}
        >
          Trusted by owner-operators &amp; carriers across the USA
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-4xl md:text-5xl mb-1"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: COLORS.red,
                }}
              >
                {s.value}
              </div>
              <div
                className="text-xs md:text-sm font-semibold"
                style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* A "load-board" style strip of sample lanes, grounding the design
   in the actual subject matter instead of generic decoration. */
function LaneSnapshot() {
  return (
    <section className="py-8" style={{ background: COLORS.steel }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <Radio size={14} style={{ color: COLORS.amber }} />
          <span
            className="text-xs font-bold"
            style={{ color: COLORS.amber, fontFamily: "'Inter', sans-serif" }}
          >
            SAMPLE LANE SNAPSHOT — illustrative pricing, not live rates
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LANE_SNAPSHOT.map((l) => (
            <div
              key={`${l.origin}-${l.dest}`}
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Route
                  size={15}
                  style={{ color: COLORS.white, flexShrink: 0 }}
                />
                <span
                  className="text-xs font-semibold truncate"
                  style={{
                    color: COLORS.white,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {l.origin} → {l.dest}
                </span>
              </div>
              <span
                className="text-xs font-bold flex-shrink-0"
                style={{
                  color: COLORS.amber,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {l.rate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ limit }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((s, i) => (
        <Reveal key={s.title} delay={i * 50}>
          <div className="p-8 h-full" style={{ background: COLORS.navy }}>
            <div
              className="w-12 h-12 flex items-center justify-center mb-6"
              style={{ background: COLORS.red }}
            >
              <s.icon size={22} color="#fff" />
            </div>
            <h3
              className="text-xl mb-3"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: COLORS.white,
                letterSpacing: "0.01em",
              }}
            >
              {s.title.toUpperCase()}
            </h3>
            <p
              className="text-sm"
              style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}
            >
              {s.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function EquipmentGrid({ limit }) {
  const list = limit ? EQUIPMENT.slice(0, limit) : EQUIPMENT;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((e, i) => (
        <Reveal key={e.key} delay={i * 50}>
          <RouteLink
            to={`/services/${e.key}`}
            className="block bg-white h-full overflow-hidden group"
          >
            <EquipmentPanel
              Icon={e.icon}
              size={40}
              className="h-40 group-hover:scale-[1.02] transition-transform duration-200"
            />
            <div className="p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-lg"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                    letterSpacing: "0.02em",
                  }}
                >
                  {e.name.toUpperCase()}
                </span>
              </div>
              <p
                className="text-sm mb-5"
                style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}
              >
                {e.tagline}
              </p>
              <span
                className="text-sm font-bold inline-flex items-center gap-1"
                style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}
              >
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </RouteLink>
        </Reveal>
      ))}
    </div>
  );
}
function StepsRow() {
  return (
    <div className="relative">
      <div
        className="hidden lg:block absolute top-6 left-0 right-0"
        style={{ height: 2, background: "#E5E7EB" }}
      />
      <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 80}>
            <div className="relative flex lg:flex-col gap-5 lg:gap-0">
              <div
                className="relative z-10 w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold lg:mb-6"
                style={{
                  background: COLORS.red,
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {s.n}
              </div>
              <div>
                <h3
                  className="text-xl mb-2"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.title.toUpperCase()}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#4B5563",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
function Testimonials() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 60}>
          <div
            className="p-6 h-full flex flex-col"
            style={{ background: COLORS.paper }}
          >
            <Quote size={20} style={{ color: COLORS.red, marginBottom: 10 }} />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  fill={idx < t.rating ? COLORS.red : "none"}
                  style={{ color: COLORS.red }}
                />
              ))}
            </div>
            <p
              className="text-sm mb-6 flex-1"
              style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}
            >
              "{t.quote}"
            </p>
            <div>
              <div
                className="text-sm font-bold"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {t.name}
              </div>
              <div
                className="text-xs"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                {t.company} · {t.equipment}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {items.map((f, i) => (
        <div key={f.q} style={{ borderBottom: "1px solid #E5E7EB" }}>
          <h3 className="m-0">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className="text-base font-bold"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {f.q}
              </span>
              <ChevronDown
                size={20}
                style={{
                  color: COLORS.red,
                  flexShrink: 0,
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>
          </h3>
          <div
            style={{
              maxHeight: open === i ? 200 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <p
              className="text-sm pb-5 pr-8"
              style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}
            >
              {f.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "Services", to: "/services" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "About", to: "/about" },
      { label: "Coverage", to: "/coverage" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      ...EQUIPMENT.map((e) => ({
        label: `${e.name} Dispatching`,
        to: `/services/${e.key}`,
      })),
    ],
    [],
  );

  const results = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Search the website"
        title="Search the website"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: COLORS.white }}
      >
        <Search size={16} />
      </button>

      {open && (
        <div
          className="site-search absolute right-0 top-full mt-3 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-2xl"
          style={{ zIndex: 70 }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the site..."
            autoFocus
            className="w-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <div className="mt-3 max-h-64 overflow-y-auto">
            {!query.trim() && (
              <p
                className="text-xs text-slate-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Type to search pages and services.
              </p>
            )}
            {query.trim() && results.length === 0 && (
              <p
                className="text-xs text-slate-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                No results found.
              </p>
            )}
            {results.map((item) => (
              <RouteLink
                key={item.to}
                to={item.to}
                onNavigate={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="block rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-100"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item.label}
              </RouteLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: COLORS.red,
          transition: "width 0.15s ease-out",
        }}
      />
    </div>
  );
}

function TopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      title="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-[75] flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 bottom-44 right-5 md:bottom-8 md:right-28"
      style={{ background: COLORS.charcoal, color: COLORS.white }}
    >
      <ArrowUp size={20} />
    </button>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const consent = window.localStorage.getItem("cookieConsent");
    setVisible(!consent);
  }, []);
  if (!visible) return null;
  const accept = () => {
    window.localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[90] rounded-xl border border-slate-200 bg-white p-4 shadow-2xl md:left-auto md:right-6 md:w-[420px]">
      <div className="flex items-start gap-3">
        <Cookie
          size={22}
          style={{ color: COLORS.red, marginTop: 2, flexShrink: 0 }}
        />
        <div className="flex-1">
          <p
            className="text-sm font-bold"
            style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}
          >
            We use cookies to improve your experience.
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}
          >
            This site uses cookies for analytics and a smoother browsing
            experience.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={accept}
              className="rounded-md px-3 py-2 text-xs font-bold"
              style={{ background: COLORS.red, color: COLORS.white }}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold"
              style={{ color: COLORS.navy }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingContactButton() {
  return (
    <button
      type="button"
      onClick={() => navigate("/contact")}
      aria-label="Get a dispatch consultation"
      title="Get a dispatch consultation"
      className="fixed z-[70] flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105 bottom-24 right-5 md:bottom-8 md:right-8"
      style={{ background: COLORS.red, color: COLORS.white }}
    >
      <Phone size={20} />
    </button>
  );
}

function CopyTextButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="ml-2 inline-flex items-center justify-center"
      aria-label={`Copy ${text}`}
      title={`Copy ${text}`}
      style={{ color: copied ? COLORS.amber : "#9CA6B2" }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function TeamWarehouseSection() {
  const items = [
    { icon: Headphones, text: "A dedicated point of contact for your truck" },
    {
      icon: MessageSquare,
      text: "Direct communication, no call centers or scripts",
    },
    { icon: FileText, text: "Paperwork tracked from pickup to POD" },
  ];
  return (
    <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div
            className="relative h-72 md:h-96 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.steel} 100%)`,
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              aria-hidden="true"
            >
              <pattern
                id="dots2"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.4" fill={COLORS.white} />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots2)" />
            </svg>
            <div className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
              <Headphones size={56} color={COLORS.white} strokeWidth={1.2} />
              <span
                className="text-2xl text-center"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: COLORS.white,
                  letterSpacing: "0.02em",
                }}
              >
                THE DISPATCH DESK
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Eyebrow>Behind the Dispatch Desk</Eyebrow>
          <Headline size="text-3xl md:text-4xl">
            REAL DISPATCHERS. REAL COMMUNICATION.
          </Headline>
          <p
            className="text-sm md:text-base mb-6"
            style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}
          >
            Behind every load is a dispatcher working the phones, checking in
            with receivers, and keeping your paperwork straight — not an
            algorithm that disappears once you're loaded.
          </p>
          <div className="flex flex-col gap-3">
            {items.map((t) => (
              <div key={t.text} className="flex items-center gap-3">
                <t.icon
                  size={18}
                  style={{ color: COLORS.red, flexShrink: 0 }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: COLORS.navy,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function FinalCTA() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: COLORS.charcoal }}
    >
      <RouteBackdrop variant="page" />
      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <h2
            className="text-4xl md:text-6xl mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: COLORS.white,
              letterSpacing: "0.01em",
            }}
          >
            READY TO STOP CHASING LOADS?
          </h2>
          <p
            className="text-base md:text-lg mb-9"
            style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}
          >
            Let our dispatch team handle the freight while you focus on the
            road.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton href="/contact">GET STARTED</PrimaryButton>
            <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark>
              <Phone size={16} /> CALL NOW
            </SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
function HomePage() {
  return (
    <>
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "92vh", background: COLORS.navy }}
      >
        <RouteBackdrop variant="hero" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16 md:py-32 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Nationwide Truck Dispatching</Eyebrow>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl leading-[0.98] mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: COLORS.white,
                  letterSpacing: "0.01em",
                }}
              >
                MORE LOADS.
                <br />
                BETTER RATES.
                <br />
                <span style={{ color: COLORS.red }}>
                  LESS TIME ON THE PHONE.
                </span>
              </h1>
              <p
                className="text-lg mb-9"
                style={{
                  color: "#CBD5E0",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: "42ch",
                }}
              >
                We handle the load search, rate negotiations, broker
                communication, paperwork, and dispatch coordination — so you can
                focus on driving and growing your trucking business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <PrimaryButton href="/contact">
                  GET A FREE DISPATCH CONSULTATION
                </PrimaryButton>
                <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark>
                  <Phone size={16} /> CALL OUR DISPATCH TEAM
                </SecondaryButton>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  "Nationwide Dispatching",
                  "Rate Negotiation",
                  `${CONFIG.supportHours} Dispatch Support`,
                  "No Long-Term Contracts",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={18} style={{ color: COLORS.red }} />
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LaneSnapshot />
      <TrustBar />

      <section className="py-20 md:py-28" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>The Problem</Eyebrow>
              <Headline size="text-4xl md:text-5xl" className="leading-[1.05]">
                STOP WASTING HOURS SEARCHING FOR LOADS.
              </Headline>
              <p
                className="text-base"
                style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}
              >
                Running your own dispatch eats the hours you should be spending
                behind the wheel — or with your family.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.text} delay={i * 50}>
                <div
                  className="flex items-start gap-4 p-6 bg-white h-full"
                  style={{ borderLeft: `3px solid ${COLORS.red}` }}
                >
                  <p.icon
                    size={22}
                    style={{ color: COLORS.navy, flexShrink: 0, marginTop: 2 }}
                  />
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: COLORS.navy,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p
              className="text-2xl md:text-3xl text-center"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: COLORS.navy,
                letterSpacing: "0.01em",
              }}
            >
              YOU DRIVE. WE HANDLE THE FREIGHT.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <Eyebrow>What We Do</Eyebrow>
                <Headline
                  size="text-4xl md:text-5xl"
                  className="leading-[1.05] mb-0"
                >
                  FULL-SERVICE TRUCK DISPATCHING
                </Headline>
              </div>
              <RouteLink
                to="/how-it-works"
                className="text-sm font-bold inline-flex items-center gap-1"
                style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}
              >
                See How It Works <ArrowRight size={14} />
              </RouteLink>
            </div>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <Eyebrow>Equipment We Dispatch</Eyebrow>
                <Headline
                  size="text-4xl md:text-5xl"
                  className="leading-[1.05] mb-0"
                >
                  SEVEN TRAILER TYPES. ONE DISPATCH TEAM.
                </Headline>
              </div>
              <RouteLink
                to="/services"
                className="text-sm font-bold inline-flex items-center gap-1"
                style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}
              >
                View All Services <ArrowRight size={14} />
              </RouteLink>
            </div>
          </Reveal>
          <EquipmentGrid limit={6} />
        </div>
      </section>

      <TeamWarehouseSection />

      <section className="py-20 md:py-28" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <Eyebrow>The Process</Eyebrow>
              <Headline
                size="text-4xl md:text-5xl"
                className="leading-[1.05] mb-0"
              >
                HOW IT WORKS
              </Headline>
            </div>
          </Reveal>
          <StepsRow />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Why Choose Us</Eyebrow>
              <Headline
                size="text-4xl md:text-5xl"
                className="leading-[1.05] mb-0"
              >
                BUILT AROUND YOUR TRUCKING BUSINESS
              </Headline>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.text} delay={i * 50}>
                <div
                  className="flex items-center gap-4 p-6"
                  style={{ background: COLORS.paper }}
                >
                  <w.icon
                    size={24}
                    style={{ color: COLORS.red, flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: COLORS.navy,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {w.text}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" style={{ background: COLORS.navy }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: COLORS.white,
                letterSpacing: "0.01em",
              }}
            >
              YOUR TRUCK SHOULDN'T SIT.
              <br />
              <span style={{ color: COLORS.red }}>
                YOUR DISPATCHER SHOULDN'T EITHER.
              </span>
            </h2>
            <p
              className="text-base md:text-lg mb-10"
              style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}
            >
              Most dispatchers wait for freight to come to them. Our team
              actively works load boards and broker relationships all day, every
              day.
            </p>
            <PrimaryButton href="/contact">
              LET'S GET YOUR TRUCK MOVING
            </PrimaryButton>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Sample Content</Eyebrow>
              <Headline
                size="text-4xl md:text-5xl"
                className="leading-[1.05] mb-3"
              >
                WHAT CARRIERS SAY
              </Headline>
              <p
                className="text-sm"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                Placeholder testimonials shown for layout — swap in real
                customer feedback before launch.
              </p>
            </div>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14 mx-auto text-center">
              <Eyebrow>
                <span className="mx-auto">Pricing</span>
              </Eyebrow>
              <Headline
                size="text-4xl md:text-5xl"
                className="leading-[1.05] mb-0"
              >
                SIMPLE, TRANSPARENT DISPATCHING
              </Headline>
            </div>
          </Reveal>
          <Reveal>
            <div
              className="max-w-md mx-auto bg-white p-10"
              style={{ borderTop: `4px solid ${COLORS.red}` }}
            >
              <div
                className="text-sm font-bold mb-2"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                DISPATCH SERVICE
              </div>
              <div
                className="text-6xl mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: COLORS.navy,
                }}
              >
                {CONFIG.dispatchPercentage}
                <span
                  className="text-lg ml-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#6B7280",
                  }}
                >
                  per load
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {PRICING_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      style={{ color: COLORS.red, flexShrink: 0 }}
                    />
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: COLORS.navy,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <PrimaryButton href="/contact" className="w-full">
                GET STARTED
              </PrimaryButton>
              <p
                className="text-xs text-center mt-4"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                No hidden fees.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: SERVICES OVERVIEW
   ============================================================ */
function ServicesOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="FULL-SERVICE TRUCK DISPATCHING"
        subtitle="Everything between finding a load and getting paid for it — handled by a dispatcher who knows your equipment."
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[{ label: "Home", to: "/" }, { label: "Services" }]}
          />
          <Headline size="text-3xl md:text-4xl">
            WHAT WE HANDLE, EVERY DAY
          </Headline>
          <div className="mb-16 mt-6">
            <ServicesGrid />
          </div>
          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Equipment</Eyebrow>
              <Headline size="text-3xl md:text-4xl">
                DISPATCHED BY TRAILER TYPE
              </Headline>
              <p
                className="text-sm"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                Each equipment type has its own freight patterns, brokers, and
                rate expectations — pick yours below for details.
              </p>
            </div>
          </Reveal>
          <EquipmentGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: SERVICE / EQUIPMENT DETAIL
   ============================================================ */
function ServiceDetailPage({ eqKey }) {
  const eq = EQUIPMENT.find((e) => e.key === eqKey) || EQUIPMENT[0];
  const others = EQUIPMENT.filter((e) => e.key !== eq.key).slice(0, 3);

  useEffect(() => {
    setJSONLD("ld-service", {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: `${eq.name} Truck Dispatching`,
      provider: { "@type": "LocalBusiness", name: CONFIG.companyName },
      areaServed: "United States",
      description: eq.desc,
    });
  }, [eq]);

  return (
    <>
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden"
        style={{ background: COLORS.navy }}
      >
        <RouteBackdrop variant="page" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: eq.name },
            ]}
          />
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 flex items-center justify-center"
              style={{ background: COLORS.red }}
            >
              <eq.icon size={26} color="#fff" />
            </div>
            <Eyebrow>Dispatch Service</Eyebrow>
          </div>
          <Headline
            as="h1"
            dark
            size="text-4xl md:text-6xl"
            className="max-w-3xl"
          >
            {eq.name.toUpperCase()} DISPATCHING
          </Headline>
          <p
            className="text-base md:text-lg max-w-2xl mb-8"
            style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}
          >
            {eq.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton href="/contact">
              DISPATCH MY {eq.name.toUpperCase()}
            </PrimaryButton>
            <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark>
              <Phone size={16} /> CALL OUR TEAM
            </SecondaryButton>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow>What You Get</Eyebrow>
            <Headline size="text-3xl md:text-4xl">
              DISPATCHING BUILT FOR {eq.name.toUpperCase()}
            </Headline>
            <div className="flex flex-col gap-4 mt-6">
              {eq.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    style={{ color: COLORS.red, flexShrink: 0, marginTop: 1 }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: COLORS.navy,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden">
              <EquipmentPanel Icon={eq.icon} size={52} className="h-52" />
              <div className="p-8" style={{ background: COLORS.paper }}>
                <Eyebrow>Typical Freight</Eyebrow>
                <h3
                  className="text-2xl mb-5"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                  }}
                >
                  WHAT WE MOVE ON {eq.name.toUpperCase()}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {eq.freight.map((f) => (
                    <div
                      key={f}
                      className="bg-white px-4 py-3 text-sm font-semibold"
                      style={{
                        color: COLORS.navy,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <Headline size="text-3xl md:text-4xl">
              HOW IT WORKS FOR {eq.name.toUpperCase()} OPERATORS
            </Headline>
          </Reveal>
          <div className="mt-10">
            <StepsRow />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Other Equipment</Eyebrow>
              <Headline size="text-3xl md:text-4xl">WE ALSO DISPATCH</Headline>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((o, i) => (
              <Reveal key={o.key} delay={i * 60}>
                <RouteLink
                  to={`/services/${o.key}`}
                  className="block bg-white overflow-hidden"
                >
                  <EquipmentPanel Icon={o.icon} size={28} className="h-28" />
                  <div
                    className="p-5"
                    style={{ borderLeft: `3px solid ${COLORS.red}` }}
                  >
                    <div
                      className="text-lg mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: COLORS.navy,
                      }}
                    >
                      {o.name.toUpperCase()}
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "#6B7280",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {o.tagline}
                    </div>
                  </div>
                </RouteLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: HOW IT WORKS
   ============================================================ */
function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="FROM YOUR FIRST CALL TO YOUR NEXT LOAD"
        subtitle="A straightforward onboarding, then a dispatcher who works your lanes every single day."
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[{ label: "Home", to: "/" }, { label: "How It Works" }]}
          />
          <StepsRow />
        </div>
      </section>
      <section className="py-20 md:py-24" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>What We Do</Eyebrow>
              <Headline size="text-3xl md:text-4xl">
                EVERY DAY, ON EVERY LOAD
              </Headline>
            </div>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="DISPATCHERS WHO ACTUALLY WORK YOUR FREIGHT"
        subtitle={`${CONFIG.companyName} was built around one idea: your truck makes money when it's loaded and moving, not when someone is waiting for freight to fall into their lap.`}
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[{ label: "Home", to: "/" }, { label: "About" }]}
          />
          <div className="grid lg:grid-cols-3 gap-6 mb-20">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div
                  className="p-8 h-full"
                  style={{ background: COLORS.paper }}
                >
                  <v.icon
                    size={26}
                    style={{ color: COLORS.red, marginBottom: 16 }}
                  />
                  <h3
                    className="text-xl mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: COLORS.navy,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {v.title.toUpperCase()}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "#4B5563",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamWarehouseSection />

      <section className="py-20 md:py-24" style={{ background: COLORS.paper }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Why Choose Us</Eyebrow>
              <Headline size="text-3xl md:text-4xl">
                BUILT AROUND YOUR TRUCKING BUSINESS
              </Headline>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.text} delay={i * 50}>
                <div className="flex items-center gap-4 p-6 bg-white">
                  <w.icon
                    size={24}
                    style={{ color: COLORS.red, flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: COLORS.navy,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {w.text}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <TrustBar />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Sample Content</Eyebrow>
              <Headline size="text-3xl md:text-4xl">WHAT CARRIERS SAY</Headline>
            </div>
          </Reveal>
          <Testimonials />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: COVERAGE
   ============================================================ */
function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="NATIONWIDE COVERAGE. FULL U.S. REACH."
        subtitle={`Freight coverage across all ${CONFIG.statesCovered} contiguous states, with dispatchers who know regional lane patterns as well as coast-to-coast runs.`}
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[{ label: "Home", to: "/" }, { label: "Coverage" }]}
          />
          <Reveal>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 mb-16">
              {US_STATES.map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-center py-3 text-xs font-bold"
                  style={{
                    background: COLORS.navy,
                    color: COLORS.white,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            <Reveal>
              <div className="p-6" style={{ background: COLORS.paper }}>
                <Globe
                  size={24}
                  style={{ color: COLORS.red, marginBottom: 12 }}
                />
                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                  }}
                >
                  NATIONWIDE LANES
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#4B5563",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Coast-to-coast and regional freight, matched to where you want
                  to run.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="p-6" style={{ background: COLORS.paper }}>
                <MapPin
                  size={24}
                  style={{ color: COLORS.red, marginBottom: 12 }}
                />
                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                  }}
                >
                  REGIONAL EXPERTISE
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#4B5563",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Dispatchers who know seasonal freight patterns in your home
                  region.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="p-6" style={{ background: COLORS.paper }}>
                <Route
                  size={24}
                  style={{ color: COLORS.red, marginBottom: 12 }}
                />
                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                  }}
                >
                  LANE PLANNING
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#4B5563",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Routes planned around your preferred operating area and home
                  time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: FAQ
   ============================================================ */
function FAQPage() {
  useEffect(() => {
    setJSONLD("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }, []);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="QUESTIONS, ANSWERED"
        subtitle="Everything carriers usually ask before getting started."
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
          <FAQAccordion items={FAQS} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   HELPER COMPONENTS
   ============================================================ */
const fieldClass =
  "w-full px-4 py-3 text-sm border bg-white outline-none transition-colors";

function Field({
  label,
  k,
  type = "text",
  placeholder,
  half,
  form,
  handleChange,
  errors,
  required,
  colors,
}) {
  return (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label
        className="block text-xs font-bold mb-2"
        style={{ color: colors.navy, fontFamily: "'Inter', sans-serif" }}
      >
        {label}{" "}
        {required.includes(k) && <span style={{ color: colors.red }}>*</span>}
      </label>
      <input
        type={type}
        value={form[k]}
        onChange={handleChange(k)}
        placeholder={placeholder}
        className={fieldClass}
        aria-invalid={!!errors[k]}
        style={{
          borderColor: errors[k] ? colors.red : "#D1D5DB",
          fontFamily: "'Inter', sans-serif",
          color: colors.navy,
        }}
      />
      {errors[k] && (
        <p
          className="text-xs mt-1 font-semibold"
          style={{ color: colors.red, fontFamily: "'Inter', sans-serif" }}
        >
          {errors[k]}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
function ContactPage() {
  const initial = {
    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    truckType: "",
    numTrucks: "",
    location: "",
    operatingArea: "",
    yearsInBusiness: "",
    mcNumber: "",
    source: "",
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const required = [
    "fullName",
    "phone",
    "email",
    "truckType",
    "numTrucks",
    "mcNumber",
  ];

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const errs = {};
    required.forEach((k) => {
      if (!form[k] || !form[k].trim()) errs[k] = "This field is required.";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (form.phone && !/^[\d\s()+-]{7,}$/.test(form.phone))
      errs.phone = "Enter a valid phone number.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setConfirmOpen(true);
  };

  const confirmSubmit = () => {
    setIsSending(true);
    setSendError("");

    emailjs
      .send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        {
          ...form,
          reply_to: form.email,
          submitted_at: new Date().toLocaleString(),
        },
        { publicKey: CONFIG.emailjs.publicKey },
      )
      .then(() => {
        setSubmitted(true);
        setConfirmOpen(false);
      })
      .catch(() => {
        setSendError(
          "We could not send your request. Please try again or call us directly.",
        );
      })
      .finally(() => setIsSending(false));
  };

  const fieldProps = { form, handleChange, errors, required, colors: COLORS };

  return (
    <>
      <PageHero
        eyebrow="Get Started"
        title="LET'S GET YOUR TRUCK MOVING"
        subtitle="Tell us about your truck and lanes — a dispatcher will follow up the same business day."
      />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <Breadcrumb
            items={[{ label: "Home", to: "/" }, { label: "Contact" }]}
          />

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <a
              href={`tel:${CONFIG.phoneRaw}`}
              className="p-5 block"
              style={{ background: COLORS.paper }}
            >
              <Phone size={18} style={{ color: COLORS.red, marginBottom: 8 }} />
              <div
                className="text-sm font-bold"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {CONFIG.phone}
              </div>
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="p-5 block"
              style={{ background: COLORS.paper }}
            >
              <Mail size={18} style={{ color: COLORS.red, marginBottom: 8 }} />
              <div
                className="text-sm font-bold"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {CONFIG.email}
              </div>
            </a>
            <div className="p-5" style={{ background: COLORS.paper }}>
              <MapPin
                size={18}
                style={{ color: COLORS.red, marginBottom: 8 }}
              />
              <div
                className="text-sm font-bold"
                style={{
                  color: COLORS.navy,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {CONFIG.address}
              </div>
            </div>
          </div>

          {submitted ? (
            <div
              className="p-12 text-center"
              style={{ background: COLORS.paper }}
              role="status"
            >
              <CheckCircle2
                size={44}
                style={{ color: COLORS.red, margin: "0 auto 16px" }}
              />
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: COLORS.navy,
                  letterSpacing: "0.01em",
                }}
              >
                THANKS! OUR DISPATCH TEAM WILL CONTACT YOU SHORTLY.
              </h3>
              <p
                className="text-sm"
                style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
              >
                In the meantime, feel free to call us directly at {CONFIG.phone}
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-10 grid sm:grid-cols-2 gap-5"
              style={{ background: COLORS.paper }}
              noValidate
            >
              <Field
                label="Full Name"
                k="fullName"
                placeholder="John Smith"
                {...fieldProps}
              />
              <Field
                label="Phone Number"
                k="phone"
                type="tel"
                placeholder="(555) 123-4567"
                half
                {...fieldProps}
              />
              <Field
                label="Email"
                k="email"
                type="email"
                placeholder="john@example.com"
                half
                {...fieldProps}
              />
              <Field
                label="Company Name"
                k="companyName"
                placeholder="Smith Trucking LLC"
                half
                {...fieldProps}
              />
              <Field
                label="Truck Type"
                k="truckType"
                placeholder="Dry Van, Reefer, Flatbed..."
                half
                {...fieldProps}
              />
              <Field
                label="Number of Trucks"
                k="numTrucks"
                placeholder="1"
                half
                {...fieldProps}
              />
              <Field
                label="Current Location"
                k="location"
                placeholder="City, State"
                half
                {...fieldProps}
              />
              <Field
                label="Preferred Operating Area"
                k="operatingArea"
                placeholder="Southeast, Nationwide..."
                half
                {...fieldProps}
              />
              <Field
                label="Years in Business"
                k="yearsInBusiness"
                placeholder="2"
                half
                {...fieldProps}
              />
              <Field
                label="MC Number"
                k="mcNumber"
                placeholder="MC-123456"
                half
                {...fieldProps}
              />
              <Field
                label="How did you hear about us?"
                k="source"
                placeholder="Referral, Google, Facebook..."
                {...fieldProps}
              />
              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 px-7 py-4 font-bold text-sm tracking-wide transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: COLORS.red,
                    color: COLORS.white,
                    clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
                  }}
                >
                  REQUEST FREE CONSULTATION
                </button>
              </div>
            </form>
          )}

          {confirmOpen && (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
            >
              <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <h3
                  id="confirm-title"
                  className="text-2xl mb-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: COLORS.navy,
                  }}
                >
                  Confirm Submission
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: "#4B5563",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Please confirm you want to send this consultation request.
                </p>
                {sendError && (
                  <p
                    className="mb-4 text-sm font-semibold"
                    style={{ color: COLORS.red }}
                    role="alert"
                  >
                    {sendError}
                  </p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(false)}
                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold"
                    style={{ color: COLORS.navy }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmSubmit}
                    disabled={isSending}
                    className="rounded-md px-4 py-2 text-sm font-bold"
                    style={{
                      background: isSending ? "#9CA3AF" : COLORS.red,
                      color: COLORS.white,
                      cursor: isSending ? "wait" : "pointer",
                    }}
                  >
                    {isSending ? "Sending..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ background: COLORS.navy }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 8, height: 22, background: COLORS.red }} />
            <span
              className="text-lg"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: COLORS.white,
                letterSpacing: "0.02em",
              }}
            >
              {CONFIG.companyName}
            </span>
          </div>
          <p
            className="text-sm mb-5"
            style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}
          >
            {CONFIG.tagline}
          </p>
          <div className="flex gap-3">
            {[
              {
                Icon: Facebook,
                href: CONFIG.social.facebook,
                label: "Facebook",
              },
              {
                Icon: Instagram,
                href: CONFIG.social.instagram,
                label: "Instagram",
              },
              {
                Icon: Linkedin,
                href: CONFIG.social.linkedin,
                label: "LinkedIn",
              },
            ]
              .filter(({ href }) => href && href !== "#")
              .map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <Icon size={16} color="#fff" />
                </a>
              ))}
          </div>
        </div>
        <div>
          <h2
            className="text-sm font-bold mb-4"
            style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}
          >
            COMPANY
          </h2>
          <ul className="flex flex-col gap-2">
            {[
              ["Home", "/"],
              ["How It Works", "/how-it-works"],
              ["About", "/about"],
              ["Coverage", "/coverage"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <RouteLink
                  to={to}
                  className="text-sm"
                  style={{
                    color: "#9CA6B2",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {label}
                </RouteLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2
            className="text-sm font-bold mb-4"
            style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}
          >
            SERVICES
          </h2>
          <ul className="flex flex-col gap-2">
            {EQUIPMENT.map((e) => (
              <li key={e.key}>
                <RouteLink
                  to={`/services/${e.key}`}
                  className="text-sm"
                  style={{
                    color: "#9CA6B2",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {e.name}
                </RouteLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2
            className="text-sm font-bold mb-4"
            style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}
          >
            CONTACT
          </h2>
          <ul className="flex flex-col gap-3">
            <li
              className="flex items-start gap-2 text-sm"
              style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}
            >
              <Phone size={15} className="mt-0.5 flex-shrink-0" />
              <span>{CONFIG.phone}</span>
              <CopyTextButton text={CONFIG.phone} />
            </li>
            <li
              className="flex items-start gap-2 text-sm"
              style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}
            >
              <Mail size={15} className="mt-0.5 flex-shrink-0" />
              <span>{CONFIG.email}</span>
              <CopyTextButton text={CONFIG.email} />
            </li>
            <li
              className="flex items-start gap-2 text-sm"
              style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}
            >
              <MapPin size={15} className="mt-0.5 flex-shrink-0" />{" "}
              {CONFIG.address}
            </li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} {CONFIG.companyName}. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <span
              className="text-xs"
              style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}
            >
              Privacy Policy
            </span>
            <span
              className="text-xs"
              style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}
            >
              Terms &amp; Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP / ROUTE SWITCH
   ============================================================ */
function PageSwitch({ route }) {
  const parts = route.split("/").filter(Boolean);
  if (parts.length === 0) return <HomePage />;
  if (parts[0] === "services" && parts.length === 1)
    return <ServicesOverviewPage />;
  if (parts[0] === "services" && parts.length === 2)
    return <ServiceDetailPage eqKey={parts[1]} />;
  if (parts[0] === "how-it-works") return <HowItWorksPage />;
  if (parts[0] === "about") return <AboutPage />;
  if (parts[0] === "coverage") return <CoveragePage />;
  if (parts[0] === "faq") return <FAQPage />;
  if (parts[0] === "contact") return <ContactPage />;
  return <HomePage />;
}

export default function App() {
  const route = useRoute();
  useSEO(route);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      [...params.entries()].filter(([key]) =>
        key.toLowerCase().startsWith("utm_"),
      ),
    );
    if (Object.keys(utm).length > 0)
      sessionStorage.setItem("utmParams", JSON.stringify(utm));
  }, [route]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        a, button { cursor: pointer; }
        input:focus { outline: 2px solid #E63946; outline-offset: 1px; }
        a:focus-visible, button:focus-visible { outline: 2px solid #E63946; outline-offset: 2px; }
        .skip-link {
          position: absolute; left: -9999px; top: 0; z-index: 100;
          background: #fff; color: #0B1D33; padding: 10px 16px;
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 13px;
        }
        .skip-link:focus { left: 12px; top: 12px; }
      `}</style>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar route={route} />
      <main id="main-content">
        <PageSwitch route={route} />
      </main>
      <Footer />
      <TopButton />
      <FloatingContactButton />
      <CookieBanner />
      <div className="lg:hidden" style={{ height: 60 }} />
    </div>
  );
}
