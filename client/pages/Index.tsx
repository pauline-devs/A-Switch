import { ArrowRight, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.03,
    },
  },
};

const TextReveal = ({ children }: { children: string }) => {
  const letters = children.split("");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        staggerChildren: 0.03,
        delayChildren: 0.1,
      }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  imageUrl: string;
  bgGradient: string;
  textColor: string;
  articleUrl: string;
}

const HoverCard = ({ card }: { card: CardData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`${card.bgGradient} rounded-2xl ${card.textColor} cursor-pointer h-full flex flex-col overflow-hidden relative transition-all duration-2000`}
      variants={itemVariants}
      whileHover={{ y: -3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Content area with title, subtitle, and button */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <motion.h3
            className="font-display text-lg font-bold mb-1"
            variants={itemVariants}
          >
            <TextReveal>{card.title}</TextReveal>
          </motion.h3>
          <motion.p className="text-sm opacity-90 mb-4" variants={itemVariants}>
            <TextReveal>{card.subtitle}</TextReveal>
          </motion.p>
        </div>

        <motion.a
          href={card.articleUrl}
          className="inline-flex items-center gap-2 font-semibold px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs transition-all duration-200 w-fit"
        >
          <span>En savoir plus</span>
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </div>

      {/* Image area - fills bottom portion with detail text overlay on hover */}
      <div className="relative h-32">
        <motion.img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
          loading="lazy"
          decoding="async"
        />

        {/* Detail text - appears above image on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm leading-relaxed text-center font-medium">
            {card.detail}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InvestorTool = () => {
  const { t } = useTranslation();
  const [investment, setInvestment] = useState(100000);

  const impactMetrics = [
    {
      label: t("investorTool.educatedWomen"),
      value: Math.floor(investment / 10),
      unit: "",
      color: "from-pink-400 to-pink-600"
    },
    {
      label: t("investorTool.trainedProfessionals"),
      value: Math.floor(investment / 50),
      unit: "",
      color: "from-blue-400 to-blue-600"
    },
    {
      label: t("investorTool.accessibleDevices"),
      value: Math.floor(investment / 500),
      unit: "",
      color: "from-purple-400 to-purple-600"
    },
    {
      label: t("investorTool.marketPotential"),
      value: Math.floor((investment * 120) / 1000),
      unit: "K€",
      color: "from-green-400 to-green-600"
    }

  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="space-y-8">
      {/* Slider */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <label className="text-lg font-semibold text-white mb-2 block">
            {t("investorTool.investmentLabel")}
          </label>
          <div className="text-3xl font-bold text-blue-400 mb-6">
            {formatNumber(investment)} €
          </div>

          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((investment - 10000) / (10000000 - 10000)) * 100
                }%, #374151 ${((investment - 10000) / (10000000 - 10000)) * 100}%, #374151 100%)`
            }}
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{t("investorTool.minAmount")}</span>
            <span>{t("investorTool.maxAmount")}</span>
          </div>
        </motion.div>

        {/* Quick amount buttons */}
        <motion.div className="flex gap-3 flex-wrap" variants={itemVariants}>
          {[100000, 500000, 1000000, 5000000].map((amount) => (
            <motion.button
              key={amount}
              onClick={() => setInvestment(amount)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${investment === amount
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {amount / 1000}K€
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Impact Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {impactMetrics.map((metric, idx) => (
          <motion.div
            key={idx}
            className={`relative rounded-xl p-6 bg-gradient-to-br ${metric.color} shadow-lg`}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-10 bg-white"
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10">
              <motion.p className="text-white/80 text-sm mb-2 font-medium">
                {metric.label}
              </motion.p>
              <motion.div
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.span
                  animate={{
                    scale: investment !== undefined ? 1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {formatNumber(metric.value)}
                </motion.span>
                {metric.unit && <span className="text-2xl ml-1">{metric.unit}</span>}
              </motion.div>
              <motion.p className="text-white/60 text-xs mt-2">
                {metric.label === t("investorTool.educatedWomen") && t("investorTool.beneficiaries")}
                {metric.label === t("investorTool.trainedProfessionals") && t("investorTool.healthSector")}
                {metric.label === t("investorTool.accessibleDevices") && t("investorTool.projections")}
                {metric.label === t("investorTool.marketPotential") && t("investorTool.generation")}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Impact Message */}
      <motion.div
        className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center"
        variants={itemVariants}
        whileHover={{ borderColor: "rgb(59, 130, 246)" }}
      >
        <motion.p className="text-white/80">
          {t("investorTool.impactMessagePrefix")}{" "}
          <span className="font-bold text-blue-400">{formatNumber(investment)} €</span> {t("investorTool.impactMessageMiddle")}{" "}
          <span className="font-bold text-green-400">
            {formatNumber(
              Math.floor(investment / 10) +
              Math.floor(investment / 50) +
              Math.floor(investment / 500)
            )}
          </span>{" "}
          {t("investorTool.impactMessageSuffix")}
        </motion.p>
      </motion.div>
    </div>
  );
};


export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("andro-switch-authenticated");
    navigate("/password");
  };


  const navigationLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.innovation"), href: "#innovation" },
    { label: t("nav.roadmap"), href: "#roadmap" },
    { label: t("nav.contact"), href: "#collaboration" }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-display font-bold text-xl text-gray-900">
            Andro-Switch
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle Button - Three Dots */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={t("misc.toggleMenu")}
          >
            <MoreVertical className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-3 bg-white">
            {navigationLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{
                  duration: 0.3,
                  delay: isMobileMenuOpen ? idx * 0.05 : 0
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 bg-gradient-to-b from-gray-950 to-gray-900 text-white rounded-tl-[60px] rounded-br-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              variants={itemVariants}
            >
              {t("heroTitle.line1")}
              <br />
              {t("heroTitle.line2")}
              <br />
              {t("heroTitle.line3")}
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg mb-8"
              variants={itemVariants}
            >
              {t("heroDescription")}
            </motion.p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              variants={itemVariants}
            >
              {t("heroButton")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2"
              variants={itemVariants}
            >
              {t("innovationSubtitle")}
            </motion.p>
            <motion.h2
              className="font-display text-3xl font-bold text-gray-900"
              variants={itemVariants}
            >
              <TextReveal>{t("innovationTitle")}</TextReveal>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-blue-600 mb-2"
                variants={itemVariants}
              >
                2027
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("innovationStats.yearDesc")}
              </motion.p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-blue-600 mb-2"
                variants={itemVariants}
              >
                1.2B
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>{t("innovationStats.marketDesc")}</motion.p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-green-500 mb-2"
                variants={itemVariants}
              >
                0
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("innovationStats.sideEffectsDesc")}
              </motion.p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-green-500 mb-2"
                variants={itemVariants}
              >
                70%
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("innovationStats.willingnessDesc")}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Feature Points */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <motion.h3
                  className="font-semibold text-gray-900"
                  variants={itemVariants}
                >
                  <TextReveal>{t("innovationFeatures.title1")}</TextReveal>
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                {t("innovationFeatures.desc1")}
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <motion.h3
                  className="font-semibold text-gray-900"
                  variants={itemVariants}
                >
                  <TextReveal>{t("innovationFeatures.title2")}</TextReveal>
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                {t("innovationFeatures.desc2")}
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <motion.h3
                  className="font-semibold text-gray-900"
                  variants={itemVariants}
                ><TextReveal>{t("innovationFeatures.title3")}</TextReveal></motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                {t("innovationFeatures.desc3")}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Autotest Section */}
      <section id="autotest" className="py-20 bg-gray-950 text-white rounded-tl-[60px] rounded-br-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="font-display text-4xl sm:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              <TextReveal>{t("autotest.title1")}</TextReveal>
              <br />
              <TextReveal>{t("autotest.title2")}</TextReveal>
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl"
              variants={itemVariants}
            >
              {t("autotest.description")}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {[
              {
                id: "card1",
                title: t("cardsSection.card1Title"),
                subtitle: t("cardsSection.card1Subtitle"),
                detail: t("cardsSection.card1Detail"),
                imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-pink-400 to-pink-600",
                textColor: "text-gray-950",
                articleUrl: "/articles/contraception-masculine",
              },
              {
                id: "card2",
                title: t("cardsSection.card2Title"),
                subtitle: t("cardsSection.card2Subtitle"),
                detail: t("cardsSection.card2Detail"),
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-purple-500 to-purple-700",
                textColor: "text-white",
                articleUrl: "/articles/technologie",
              },
              {
                id: "card3",
                title: t("cardsSection.card3Title"),
                subtitle: t("cardsSection.card3Subtitle"),
                detail: t("cardsSection.card3Detail"),
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-orange-300 to-orange-500",
                textColor: "text-gray-950",
                articleUrl: "/articles/responsabilite-partagee",
              },
              {
                id: "card4",
                title: t("cardsSection.card4Title"),
                subtitle: t("cardsSection.card4Subtitle"),
                detail: t("cardsSection.card4Detail"),
                imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5f3f2bbbb?w=500&h=300&fit=crop",
                bgGradient: "bg-gray-800",
                textColor: "text-white",
                articleUrl: "/articles/essais-cliniques",
              },
              {
                id: "card5",
                title: t("cardsSection.card5Title"),
                subtitle: t("cardsSection.card5Subtitle"),
                detail: t("cardsSection.card5Detail"),
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
                bgGradient: "bg-yellow-300",
                textColor: "text-gray-950",
                articleUrl: "/articles/temoignages",
              },
              {
                id: "card6",
                title: t("cardsSection.card6Title"),
                subtitle: t("cardsSection.card6Subtitle"),
                detail: t("cardsSection.card6Detail"),
                imageUrl: "https://images.unsplash.com/photo-1543269865-cbdf26cecb46?w=500&h=300&fit=crop",
                bgGradient: "bg-purple-600",
                textColor: "text-white",
                articleUrl: "/articles/impact-societal",
              },

            ].map((card) => (
              <HoverCard key={card.id} card={card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              className="font-display text-4xl font-bold text-gray-900 mb-4"
              variants={itemVariants}
            >
              <TextReveal>{t("visionSection.title")}</TextReveal>
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-12 max-w-3xl"
              variants={itemVariants}
            >
              {t("visionSection.description")}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div className="bg-gray-50 rounded-xl p-8" variants={itemVariants}>
              <motion.h3
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                <TextReveal>{t("visionSection.phase1")}</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.phase1Desc")}
              </motion.p>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-xl p-8" variants={itemVariants}>
              <motion.h3
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                <TextReveal>{t("visionSection.phase2")}</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.phase2Desc")}
              </motion.p>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-xl p-8" variants={itemVariants}>
              <motion.h3
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                <TextReveal>{t("visionSection.phase3")}</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.phase3Desc")}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* FAQ-style boxes */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div
              className="border border-gray-200 rounded-lg p-6"
              variants={itemVariants}
            >
              <motion.h4
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                {t("visionSection.faqTitle1")}
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.faqAns1")}
              </motion.p>
            </motion.div>

            <motion.div
              className="border border-gray-200 rounded-lg p-6"
              variants={itemVariants}
            >
              <motion.h4
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                {t("visionSection.faqTitle2")}
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.faqAns2")}
              </motion.p>
            </motion.div>

            <motion.div
              className="border border-gray-200 rounded-lg p-6"
              variants={itemVariants}
            >
              <motion.h4
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                {t("visionSection.faqTitle3")}
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                {t("visionSection.faqAns3")}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* {false && ( */}
      <section id="roadmap" className="py-20 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-tl-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Roadmap & Investor Impact Section */}
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Main Heading */}
            <motion.h2
              className="font-display text-5xl sm:text-6xl font-bold mb-16 text-center"
              variants={itemVariants}
            >
              <TextReveal>{t("roadmapSection.title")}</TextReveal>
              <br />
              <TextReveal>{t("roadmapSection.subtitle")}</TextReveal>
            </motion.h2>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left Column */}
              <motion.div
                className="space-y-8"
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6 }
                  }
                }}
              >
                <div>
                  <motion.h3
                    className="font-display text-2xl sm:text-3xl font-bold mb-4"
                    variants={itemVariants}
                  >
                    {t("roadmapSection.visionTitle")}
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed mb-6"
                    variants={itemVariants}
                  >
                    {t("roadmapSection.visionDesc")}
                  </motion.p>
                </div>

                {/* Large Box - Visual Element */}
                <motion.div
                  className="w-full aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Stats */}
                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <div className="text-4xl font-bold text-white">{t("roadmapSection.statsCount")}</div>
                    <div className="text-gray-400 text-sm">{t("roadmapSection.statsDesc")}</div>
                  </motion.div>
                  <motion.div
                    className="text-gray-400 text-sm leading-relaxed"
                    variants={itemVariants}
                  >
                    {t("roadmapSection.statsFullDesc")}
                  </motion.div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  className="flex gap-4 pt-4"
                  variants={containerVariants}
                >
                  <motion.a
                    href="#contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("roadmapSection.readMore")}
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#roadmap-details"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("roadmapSection.learnMore")}
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right Column - Overlaid Cards */}
              <motion.div
                className="relative min-h-96 lg:min-h-[600px]"
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6 }
                  }
                }}
              >
                {/* Large Background Box */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl"
                  variants={itemVariants}
                />

                {/* Overlaid Feature Cards */}
                <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 lg:p-8">
                  {[
                    {
                      icon: "●",
                      title: t("roadmapSection.timeline1"),
                      description: t("roadmapSection.timeline1Desc"),
                      color: "purple"
                    },
                    {
                      icon: "●",
                      title: t("roadmapSection.timeline2"),
                      description: t("roadmapSection.timeline2Desc"),
                      color: "blue"
                    },
                    {
                      icon: "●",
                      title: t("roadmapSection.timeline3"),
                      description: t("roadmapSection.timeline3Desc"),
                      color: "purple"
                    },
                    {
                      icon: "●",
                      title: t("roadmapSection.timeline4"),
                      description: t("roadmapSection.timeline4Desc"),
                      color: "purple"
                    },
                    {
                      icon: "●",
                      title: t("roadmapSection.timeline5"),
                      description: t("roadmapSection.timeline5Desc"),
                      color: "purple"
                    }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all"
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: idx * 0.1 + 0.3,
                            duration: 0.5
                          }
                        }
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)"
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.span
                          className={`text-lg mt-0.5 ${feature.color === "purple" ? "text-purple-400" : "text-blue-400"
                            }`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {feature.icon}
                        </motion.span>
                        <div className="flex-1">
                          <motion.h4 className="text-white font-semibold text-sm mb-1">
                            {feature.title}
                          </motion.h4>
                          <motion.p className="text-gray-300 text-xs leading-relaxed">
                            {feature.description}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Roadmap Phases Below */}
            <motion.div
              className="mt-20 pt-12 border-t border-white/10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                className="font-display text-3xl font-bold mb-8"
                variants={itemVariants}
              >
                <TextReveal>Phases stratégiques de la feuille de route</TextReveal>
              </motion.h3>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                  {
                    year: t("roadmapSection.phase1Year"),
                    title: t("roadmapSection.phase1Title"),
                    description: t("roadmapSection.phase1Desc"),
                    highlight: true
                  },
                  {
                    year: t("roadmapSection.phase2Year"),
                    title: t("roadmapSection.phase2Title"),
                    description: t("roadmapSection.phase2Desc"),
                    highlight: false
                  },
                  {
                    year: t("roadmapSection.phase3Year"),
                    title: t("roadmapSection.phase3Title"),
                    description: t("roadmapSection.phase3Desc"),
                    highlight: false
                  },
                  {
                    year: t("roadmapSection.phase4Year"),
                    title: t("roadmapSection.phase4Title"),
                    description: t("roadmapSection.phase4Desc"),
                    highlight: true
                  }

                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    className={`relative px-6 py-8 rounded-xl transition-all duration-300 group cursor-pointer ${phase.highlight
                        ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50"
                        : "bg-gray-800/30 border border-gray-700/50"
                      }`}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.95
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }
                      }
                    }}
                    whileHover={{
                      y: phase.highlight ? -8 : 0,
                      boxShadow: phase.highlight
                        ? "0 20px 40px rgba(59, 130, 246, 0.3)"
                        : "0 10px 20px rgba(255, 255, 255, 0.05)"
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <motion.h4
                      className={`font-display text-lg font-bold mb-2 ${phase.highlight ? "text-blue-300" : "text-gray-500"
                        }`}
                      variants={itemVariants}
                    >
                      {phase.year}
                    </motion.h4>
                    <motion.h5
                      className={`font-semibold mb-2 transition-colors ${phase.highlight
                          ? "text-white group-hover:text-blue-200"
                          : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      variants={itemVariants}
                    >
                      {phase.title}
                    </motion.h5>
                    <motion.p
                      className={`text-sm transition-colors ${phase.highlight
                          ? "text-gray-400 group-hover:text-gray-300"
                          : "text-gray-500 group-hover:text-gray-400"
                        }`}
                      variants={itemVariants}
                    >
                      {phase.description}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Investor Impact Tool */}
          <motion.div
            className="mt-20 bg-white/5 border border-white/10 rounded-2xl p-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              className="font-display text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              {t("roadmapSection.calculatorTitle")}
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-8 max-w-2xl"
              variants={itemVariants}
            >
              {t("roadmapSection.calculatorDesc")}
            </motion.p>

            <InvestorTool />
          </motion.div>

        </div>
      </section>
      {/* )} */}

      {/* Trust Section */}
      <section id="trust" className="py-20 bg-gray-950 text-white rounded-br-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2"
            variants={itemVariants}
          >
            <TextReveal>{t("trustSection.subtitle")}</TextReveal>
          </motion.h3>
          <motion.h2
            className="font-display text-4xl font-bold mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <TextReveal>{t("trustSection.title")}</TextReveal>
          </motion.h2>

          {/* Logo Carousel */}
          <div
            className="relative overflow-hidden bg-white/5 rounded-2xl p-8"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <motion.div
              className="flex gap-12"
              animate={{ x: isCarouselHovered ? 0 : [0, -2000] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[
                {
                  name: "Santé Publique France",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sante-publique-France-logo.svg/1024px-Sante-publique-France-logo.svg.png"
                },
                {
                  name: "Collège Médecine Générale",
                  logo: "https://www.cmg.fr/wp-content/uploads/2023/10/Logo-CMG-2023.png"
                },
                {
                  name: "AFU",
                  logo: "https://www.urofrance.org/wp-content/uploads/2023/01/logo-afu.png"
                },
                {
                  name: "Le Monde",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Le_Monde_logo.svg/1024px-Le_Monde_logo.svg.png"
                },
                {
                  name: "Arte",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/ARTE_logo_2020.svg/1024px-ARTE_logo_2020.svg.png"
                },
                {
                  name: "Libération",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lib%C3%A9ration_logo.svg/1024px-Lib%C3%A9ration_logo.svg.png"
                }
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-[90%] max-h-[90%] object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-400 text-sm text-center px-4">${partner.name}</span>`;
                      }
                    }}
                  />
                </motion.div>
              ))}
              {[
                {
                  name: "Santé Publique France",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sante-publique-France-logo.svg/1024px-Sante-publique-France-logo.svg.png"
                },
                {
                  name: "Collège Médecine Générale",
                  logo: "https://www.cmg.fr/wp-content/uploads/2023/10/Logo-CMG-2023.png"
                },
                {
                  name: "AFU",
                  logo: "https://www.urofrance.org/wp-content/uploads/2023/01/logo-afu.png"
                },
                {
                  name: "Le Monde",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Le_Monde_logo.svg/1024px-Le_Monde_logo.svg.png"
                },
                {
                  name: "Arte",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/ARTE_logo_2020.svg/1024px-ARTE_logo_2020.svg.png"
                },
                {
                  name: "Libération",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lib%C3%A9ration_logo.svg/1024px-Lib%C3%A9ration_logo.svg.png"
                }
              ].map((partner, idx) => (
                <motion.div
                  key={`duplicate-${idx}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-[90%] max-h-[90%] object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-400 text-sm text-center px-4">${partner.name}</span>`;
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient overlays for smooth scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaboration" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={itemVariants}>
              <motion.h2
                className="font-display text-4xl font-bold text-gray-900 mb-4"
                variants={itemVariants}
              >
                <TextReveal>{t("collaborationSection.title")}</TextReveal>
                <br />
                <TextReveal>{t("collaborationSection.subtitle")}</TextReveal>
                <br />
                <TextReveal>{t("collaborationSection.subtitle2")}</TextReveal>
              </motion.h2>
              <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
                {t("collaborationSection.description")}
              </motion.p>
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                variants={itemVariants}
              >
                {t("collaborationSection.button")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-12 text-white"
              variants={itemVariants}
            >
              <motion.h3
                className="font-display text-2xl font-bold mb-4"
                variants={itemVariants}
              >
                {t("collaborationSection.partnersTitle")}
              </motion.h3>
              <ul className="space-y-3 text-sm">
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t("collaborationSection.benefit1")}
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t("collaborationSection.benefit2")}
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {t("collaborationSection.benefit3")}
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-display font-bold text-white mb-4">
                {t("footerSection.brandTitle")}
              </h3>
              <p className="text-sm">
                {t("footerSection.tagline")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{t("footerSection.productTitle")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.productAbout")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.productTechnology")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.productStudies")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{t("footerSection.companyTitle")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.companyBlog")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.companyCareers")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.companyContact")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{t("footerSection.legalTitle")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.legalPrivacy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.legalTerms")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footerSection.legalNotice")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              {t("footerSection.copyright")}
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                {t("footerSection.socialTwitter")}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t("footerSection.socialLinkedin")}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t("footerSection.socialFacebook")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
