import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HUDCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay: number;
  cardId: string;
  onSelect: () => void;
}

const HUDCard = ({
  title,
  description,
  content,
  position,
  delay,
  cardId,
  onSelect,
}: HUDCardProps) => {
  const positionClasses: Record<string, string> = {
    "top-left": "top-8 left-20 md:top-12 md:left-32 lg:top-16 lg:left-40",
    "top-right": "top-24 right-16 md:top-32 md:right-24 lg:top-40 lg:right-32",
    "bottom-left": "bottom-16 left-32 md:bottom-24 md:left-40 lg:bottom-32 lg:left-48",
    "bottom-right": "bottom-8 right-24 md:bottom-12 md:right-32 lg:bottom-16 lg:right-40",
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} w-56 z-30 cursor-pointer`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      onClick={onSelect}
    >
      <motion.div
        className="bg-gradient-to-br from-blue-950/90 to-purple-950/70 backdrop-blur-md border border-blue-400/30 rounded-lg p-4 shadow-2xl"
        whileHover={{
          boxShadow: "0 0 25px rgba(59, 130, 246, 0.5), 0 0 50px rgba(147, 51, 234, 0.25)",
          borderColor: "rgba(59, 130, 246, 0.5)",
          scale: 1.05,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 20px rgba(59, 130, 246, 0)",
              "inset 0 0 20px rgba(59, 130, 246, 0.3)",
              "inset 0 0 20px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10">
          <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1.5 text-center">
            {title}
          </h3>

          <p className="text-xs text-gray-300 mb-2.5 leading-relaxed text-center">
            {description}
          </p>

          <div className="text-xs text-blue-200 space-y-1">
            {content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DetailModal = ({
  isOpen,
  cardTitle,
  metrics,
  description,
  onClose,
}: {
  isOpen: boolean;
  cardTitle: string;
  metrics: { label: string; value: string }[];
  description: string;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-950/95 to-purple-950/85 backdrop-blur-xl border border-blue-400/40 rounded-xl p-8 shadow-2xl relative"
              animate={{
                boxShadow:
                  "0 0 60px rgba(59, 130, 246, 0.5), 0 0 120px rgba(147, 51, 234, 0.3)",
              }}
            >
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text mb-4">
                  {cardTitle}
                </h2>

                <p className="text-sm text-gray-300 mb-8">
                  {description}
                </p>

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      className="bg-white/5 border border-blue-400/20 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                    >
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {metric.label}
                      </p>
                      <p className="text-sm font-bold text-blue-300">
                        {metric.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function HUD() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const cardData: Record<
    string,
    {
      title: string;
      description: string;
      metrics: { label: string; value: string }[];
      fullDescription: string;
    }
  > = {
    "card-1": {
      title: t("hud.card1.title"),
      description: t("hud.card1.description"),
      metrics: t("hud.metrics.card1", { returnObjects: true }),
      fullDescription: t("hud.card1.fullDescription"),
    },
    "card-2": {
      title: t("hud.card2.title"),
      description: t("hud.card2.description"),
      metrics: t("hud.metrics.card2", { returnObjects: true }),
      fullDescription: t("hud.card2.fullDescription"),
    },
    "card-3": {
      title: t("hud.card3.title"),
      description: t("hud.card3.description"),
      metrics: t("hud.metrics.card3", { returnObjects: true }),
      fullDescription: t("hud.card3.fullDescription"),
    },
    "card-4": {
      title: t("hud.card4.title"),
      description: t("hud.card4.description"),
      metrics: t("hud.metrics.card4", { returnObjects: true }),
      fullDescription: t("hud.card4.fullDescription"),
    },
  };

  const current = selectedCard && cardData[selectedCard];

  return (
    <>
      {/* SVG graphic lines connecting to cards */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
        style={{ opacity: 0.8 }}
      >
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="1" />
          </linearGradient>

          <filter id="lineGlowFilter">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Lines to each card */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="20%"
          y2="12%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          animate={{
            opacity: selectedCard === "card-1" ? 1 : 0.4,
            strokeWidth: selectedCard === "card-1" ? 1.5 : 1,
          }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="24%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          animate={{
            opacity: selectedCard === "card-2" ? 1 : 0.4,
            strokeWidth: selectedCard === "card-2" ? 1.5 : 1,
          }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="20%"
          y2="80%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          animate={{
            opacity: selectedCard === "card-3" ? 1 : 0.4,
            strokeWidth: selectedCard === "card-3" ? 1.5 : 1,
          }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="88%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          animate={{
            opacity: selectedCard === "card-4" ? 1 : 0.4,
            strokeWidth: selectedCard === "card-4" ? 1.5 : 1,
          }}
        />
      </svg>

      {/* Geometric labyrinth background lines */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: 0.3 }}
      >
        <defs>
          <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>

        <motion.line
          x1="50%"
          y1="50%"
          x2="20%"
          y2="10%"
          stroke="url(#glowLineGrad)"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="20%"
          stroke="url(#glowLineGrad)"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="25%"
          y2="85%"
          stroke="url(#glowLineGrad)"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="92%"
          stroke="url(#glowLineGrad)"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        />
      </svg>

      {/* Cards */}
      <HUDCard
        cardId="card-1"
        position="top-left"
        delay={0.1}
        title={t("hud.card1.title")}
        description={t("hud.card1.description")}
        onSelect={() => setSelectedCard(selectedCard === "card-1" ? null : "card-1")}
        content={
          <div className="space-y-1">
            <p><span className="text-blue-300 font-semibold">{t("hud.card1.biomimicry")}</span></p>
            <p className="text-gray-400">{t("hud.card1.inspiredBy")}</p>
            <p><span className="text-purple-300 font-semibold">{t("hud.card1.thor")}</span></p>
            <p className="text-gray-400">{t("hud.card1.goldenRatio")}</p>
          </div>
        }
      />

      <HUDCard
        cardId="card-2"
        position="top-right"
        delay={0.2}
        title={t("hud.card2.title")}
        description={t("hud.card2.description")}
        onSelect={() => setSelectedCard(selectedCard === "card-2" ? null : "card-2")}
        content={
          <div className="space-y-1">
            <p><span className="text-blue-300 font-semibold">{t("hud.card2.cleanTech")}</span></p>
            <p className="text-gray-400">{t("hud.card2.thermalContraception")}</p>
            <p className="text-green-300 text-xs font-semibold">{t("hud.card2.reversible")}</p>
          </div>
        }
      />

      <HUDCard
        cardId="card-3"
        position="bottom-left"
        delay={0.3}
        title={t("hud.card3.title")}
        description={t("hud.card3.description")}
        onSelect={() => setSelectedCard(selectedCard === "card-3" ? null : "card-3")}
        content={
          <div className="space-y-1">
            <p><span className="text-blue-300 font-semibold">{t("hud.card3.france2030")}</span></p>
            <p className="text-gray-400">{t("hud.card3.funding")}</p>
            <p className="text-green-300 text-xs">{t("hud.card3.globalPartners")}</p>
          </div>
        }
      />

      <HUDCard
        cardId="card-4"
        position="bottom-right"
        delay={0.4}
        title={t("hud.card4.title")}
        description={t("hud.card4.description")}
        onSelect={() => setSelectedCard(selectedCard === "card-4" ? null : "card-4")}
        content={
          <div className="space-y-1">
            <p><span className="text-blue-300 font-semibold">{t("hud.card4.womensEquity")}</span></p>
            <p className="text-gray-400">{t("hud.card4.seekingInnovation")}</p>
            <p><span className="text-purple-300 font-semibold">{t("hud.card4.mensInterest")}</span></p>
          </div>
        }
      />

      {/* Modal */}
      {current && (
        <DetailModal
          isOpen={!!selectedCard}
          cardTitle={current.title}
          metrics={current.metrics}
          description={current.fullDescription}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}