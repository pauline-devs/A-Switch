import { ArrowRight, MoreVertical, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="relative h-32 overflow-hidden">
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
  const [investment, setInvestment] = useState(100000);

  const impactMetrics = [
    {
      label: "Femmes éduquées",
      value: Math.floor(investment / 10),
      unit: "",
      color: "from-pink-400 to-pink-600"
    },
    {
      label: "Professionnels formés",
      value: Math.floor(investment / 50),
      unit: "",
      color: "from-blue-400 to-blue-600"
    },
    {
      label: "Appareils accessibles",
      value: Math.floor(investment / 500),
      unit: "",
      color: "from-purple-400 to-purple-600"
    },
    {
      label: "Potentiel de marché",
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
            Montant d'investissement
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
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                ((investment - 10000) / (10000000 - 10000)) * 100
              }%, #374151 ${((investment - 10000) / (10000000 - 10000)) * 100}%, #374151 100%)`
            }}
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>10 K€</span>
            <span>10 M€</span>
          </div>
        </motion.div>

        {/* Quick amount buttons */}
        <motion.div className="flex gap-3 flex-wrap" variants={itemVariants}>
          {[100000, 500000, 1000000, 5000000].map((amount) => (
            <motion.button
              key={amount}
              onClick={() => setInvestment(amount)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                investment === amount
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
            className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${metric.color} shadow-lg`}
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
                {metric.label === "Femmes éduquées" && "bénéficiaires"}
                {metric.label === "Professionnels formés" && "en santé"}
                {metric.label === "Appareils accessibles" && "projections"}
                {metric.label === "Potentiel de marché" && "génération"}
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
          Votre investissement de{" "}
          <span className="font-bold text-blue-400">{formatNumber(investment)} €</span> crée un
          impact direct de{" "}
          <span className="font-bold text-green-400">
            {formatNumber(
              Math.floor(investment / 10) +
              Math.floor(investment / 50) +
              Math.floor(investment / 500)
            )}
          </span>{" "}
          bénéficiaires et acteurs du changement.
        </motion.p>
      </motion.div>
    </div>
  );
};


export default function Index() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("andro-switch-authenticated");
    navigate("/password");
  };


  const navigationLinks = [
    { label: "Accueil", href: "#hero" },
    { label: "Innovation", href: "#innovation" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Contact", href: "#collaboration" }
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
      {/* Back Button */}
      <motion.button
        onClick={handleLogout}
        className="hidden lg:block fixed lg:top-3 left-3 z-[60] p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Back"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>

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
          </div>

          {/* Mobile Menu Toggle Button - Three Dots */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
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
          className="md:hidden overflow-hidden border-t border-gray-200"
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
              Investissez
              <br />
              dans le futur
              <br />
              de la contraception
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg mb-8"
              variants={itemVariants}
            >
              Découvrez l'innovation révolutionnaire qui change la donne
            </motion.p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              variants={itemVariants}
            >
              En savoir plus
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
              L'innovation Andro-Switch
            </motion.p>
            <motion.h2
              className="font-display text-3xl font-bold text-gray-900"
              variants={itemVariants}
            >
              <TextReveal>Révolutionner la contraception</TextReveal>
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
                Lancement commercial prévu
              </motion.p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-blue-600 mb-2"
                variants={itemVariants}
              >
                1.2B
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>Marché potentiel estimé</motion.p>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <motion.h3
                className="font-display text-3xl lg:text-4xl font-bold text-green-500 mb-2"
                variants={itemVariants}
              >
                0
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Effets secondaires significatifs
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
                Acceptabilité chez les femmes
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
                  <TextReveal>Technologie brevetée</TextReveal>
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                Solution novatrice protégée par brevets internationaux
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <motion.h3
                  className="font-semibold text-gray-900"
                  variants={itemVariants}
                >
                  <TextReveal>Études cliniques complètes</TextReveal>
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                Validation scientifique rigoureuse et transparente
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <motion.h3
                  className="font-semibold text-gray-900"
                  variants={itemVariants}
                ><TextReveal>Impact sociétal</TextReveal></motion.h3>
              </div>
              <motion.p
                className="text-gray-600 text-sm"
                variants={itemVariants}
              >
                Améliore la santé et l'autonomie des femmes
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
              <TextReveal>L'autotest est</TextReveal>
              <br />
              <TextReveal>déjà rentable !</TextReveal>
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl"
              variants={itemVariants}
            >
              Notre solution d'autodiagnostic révolutionne le modèle économique
              de la contraception en le rendant immédiatement viable.
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
                title: "LA CONTRACEPTION MASCULINE, ON EN EST OÙ ?",
                subtitle: "Découvrez l'état actuel des solutions contraceptives",
                detail: "Explorez le paysage actuel de la contraception masculine, ses avancées et les défis à surmonter pour une meilleure accessibilité.",
                imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-pink-400 to-pink-600",
                textColor: "text-gray-950",
                articleUrl: "/articles/contraception-masculine",
              },
              {
                id: "card2",
                title: "TECHNOLOGIE AVANCÉE",
                subtitle: "Une solution moderne et efficace",
                detail: "Découvrez notre technologie révolutionnaire qui combine efficacité, sécurité et accessibilité pour le contrôle naturel de la fertilité.",
                imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-purple-500 to-purple-700",
                textColor: "text-white",
                articleUrl: "/articles/technologie",
              },
              {
                id: "card3",
                title: "RESPONSABILITÉ PARTAGÉE",
                subtitle: "Vers une égalité dans la charge",
                detail: "Comprendre comment la contraception masculine redéfinit l'équilibre des responsabilités reproductives dans les couples modernes.",
                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
                bgGradient: "bg-gradient-to-br from-orange-300 to-orange-500",
                textColor: "text-gray-950",
                articleUrl: "/articles/responsabilite-partagee",
              },
              {
                id: "card4",
                title: "ESSAIS CLINIQUES",
                subtitle: "Résultats prometteurs et sécurité",
                detail: "Découvrez les résultats de nos essais cliniques rigoureux qui démontrent l'efficacité et la sécurité de notre solution.",
                imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5f3f2bbbb?w=500&h=300&fit=crop",
                bgGradient: "bg-gray-800",
                textColor: "text-white",
                articleUrl: "/articles/essais-cliniques",
              },
              {
                id: "card5",
                title: "TÉMOIGNAGES",
                subtitle: "Histoires inspirantes d'utilisateurs",
                detail: "Découvrez les témoignages authentiques de ceux qui ont choisi de prendre responsabilité de leur contraception.",
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
                bgGradient: "bg-yellow-300",
                textColor: "text-gray-950",
                articleUrl: "/articles/temoignages",
              },
              {
                id: "card6",
                title: "IMPACT SOCIÉTAL",
                subtitle: "Vers une révolution contraceptive",
                detail: "Explorez comment l'innovation en contraception masculine peut transformer la santé reproductive et l'égalité des genres.",
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
              <TextReveal>Vision long-terme:</TextReveal>
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-12 max-w-3xl"
              variants={itemVariants}
            >
              Ouvrir Andro-Switch aux marchés de l'Europe,
              <br />
              des USA, du Canada.
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
                <TextReveal>Phase 1: Europe</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Lancement initial sur les marchés européens avec partenaires
                locaux
              </motion.p>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-xl p-8" variants={itemVariants}>
              <motion.h3
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                <TextReveal>Phase 2: Amérique du Nord</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Expansion vers les États-Unis et le Canada
              </motion.p>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-xl p-8" variants={itemVariants}>
              <motion.h3
                className="font-semibold text-gray-900 mb-3"
                variants={itemVariants}
              >
                <TextReveal>Phase 3: Global</TextReveal>
              </motion.h3>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Présence mondiale et impact de santé publique majeur
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
                Quels sont les obstacles ?
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Régulation, acceptabilité sociale, et accès aux marchés
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
                Comment les surmonter ?
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Études cliniques robustes et partenariats stratégiques
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
                Quel impact ?
              </motion.h4>
              <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
                Révolutionner l'accès à la contraception masculine sûre
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

{false && (
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
              <TextReveal>Your AI Partner for Smarter</TextReveal>
              <br />
              <TextReveal>Faster Solutions</TextReveal>
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
                    Workflow With Custom AI Tools
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed mb-6"
                    variants={itemVariants}
                  >
                    Our cutting-edge AI solutions empower healthcare professionals and organizations to streamline workflows, enhance decision-making, and drive innovation across reproductive health technologies and patient care management.
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
                    <div className="text-4xl font-bold text-white">4</div>
                    <div className="text-gray-400 text-sm">Strategic Phases</div>
                  </motion.div>
                  <motion.div
                    className="text-gray-400 text-sm leading-relaxed"
                    variants={itemVariants}
                  >
                    From current initiatives through worldwide availability, our roadmap spans 2024-2030+ delivering integrated AI solutions, clinical validation, market expansion, and global accessibility.
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
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#roadmap-details"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
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
                      title: "Vision AI Technology",
                      description: "Our Technology AI Generator enables advanced analysis and intelligence generation.",
                      color: "purple"
                    },
                    {
                      icon: "●",
                      title: "AI For Everyone",
                      description: "Our Technology AI Generator website empowers individuals and organizations.",
                      color: "blue"
                    },
                    {
                      icon: "●",
                      title: "Integrated Solutions",
                      description: "AI-powered tools for healthcare professionals and medical training.",
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
                          className={`text-lg mt-0.5 ${
                            feature.color === "purple" ? "text-purple-400" : "text-blue-400"
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
                <TextReveal>Strategic Roadmap Phases</TextReveal>
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
                    year: "2024-2025",
                    title: "Phase actuelle",
                    description: "Campagne de sensibilisation mondiale • Développement d'outils IA",
                    highlight: true
                  },
                  {
                    year: "2026-2027",
                    title: "Expansion clinique",
                    description: "Essais de phase final • Approbations réglementaires",
                    highlight: false
                  },
                  {
                    year: "2028-2029",
                    title: "Préparation marché",
                    description: "Mise en place distribution • Formation professionnels",
                    highlight: false
                  },
                  {
                    year: "2030+",
                    title: "Disponibilité",
                    description: "Produit en pharmacies • Impact ODD atteint",
                    highlight: true
                  }
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    className={`relative px-6 py-8 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer ${
                      phase.highlight
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
                      className={`font-display text-lg font-bold mb-2 ${
                        phase.highlight ? "text-blue-300" : "text-gray-500"
                      }`}
                      variants={itemVariants}
                    >
                      {phase.year}
                    </motion.h4>
                    <motion.h5
                      className={`font-semibold mb-2 transition-colors ${
                        phase.highlight
                          ? "text-white group-hover:text-blue-200"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                      variants={itemVariants}
                    >
                      {phase.title}
                    </motion.h5>
                    <motion.p
                      className={`text-sm transition-colors ${
                        phase.highlight
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
              Calculateur d'impact investisseur
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Visualisez l'impact direct de votre investissement sur la révolution contraceptive
            </motion.p>

            <InvestorTool />
          </motion.div>
        </div>
      </section>
)}

      {/* Trust Section */}
      <section id="trust" className="py-20 bg-gray-950 text-white rounded-br-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2"
            variants={itemVariants}
          >
              <TextReveal>Nos Partenaires</TextReveal>
          </motion.h3>
          <motion.h2
            className="font-display text-4xl font-bold mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <TextReveal>Ils nous font confiance</TextReveal>
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
                      // Fallback to text if image fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-400 text-sm text-center px-4">${partner.name}</span>`;
                      }
                    }}
                  />
                </motion.div>
              ))}
              {/* Duplicate logos for seamless loop */}
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
                <TextReveal>Collaborons</TextReveal>
                <br />
                <TextReveal>au futur</TextReveal>
                <br />
                <TextReveal>ensemble.</TextReveal>
              </motion.h2>
              <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
                Nous recherchons des partenaires visionnaires pour accélérer
                l'adoption de solutions contraceptives innovantes et
                accessibles.
              </motion.p>
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                variants={itemVariants}
              >
                Nous rejoindre
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
                Partenaires et Investisseurs
              </motion.h3>
              <ul className="space-y-3 text-sm">
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Accès à une technologie révolutionnaire
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Marché en croissance rapide
                </motion.li>
                <motion.li
                  className="flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Impact sociétal positif
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
                Andro-Switch
              </h3>
              <p className="text-sm">
                Révolutionner la contraception masculine pour un avenir meilleur
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Technologie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Études
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    CGU
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 Andro-Switch. Tous droits réservés.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
