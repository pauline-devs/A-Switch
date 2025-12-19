import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface HUDCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay: number;
  isSelected: boolean;
  onSelect: () => void;
  cardId: string;
}

interface CardDetail {
  cardId: string;
  title: string;
  metrics: { label: string; value: string }[];
  description: string;
}

const cardDetails: Record<string, CardDetail> = {
  "card-1": {
    cardId: "card-1",
    title: "Product Storytelling",
    metrics: [
      { label: "Concept", value: "Biomimicry" },
      { label: "Inspiration", value: "Thor - 3D Torus" },
      { label: "Symmetry", value: "Golden Ratio" },
      { label: "Innovation", value: "Thermal Regulation" },
      { label: "Design", value: "Nature-Inspired" },
    ],
    description:
      "A revolutionary approach to contraception inspired by natural thermal principles and the perfect symmetry of the golden ratio.",
  },
  "card-2": {
    cardId: "card-2",
    title: "Composition & Technology",
    metrics: [
      { label: "Type", value: "Clean Tech" },
      { label: "Method", value: "Thermal Contraception" },
      { label: "Reversibility", value: "100%" },
      { label: "Invasiveness", value: "Non-invasive" },
      { label: "Environmental", value: "Eco-friendly" },
    ],
    description:
      "Advanced thermal technology that works with the body's natural processes, completely reversible and non-invasive.",
  },
  "card-3": {
    cardId: "card-3",
    title: "Place in Society",
    metrics: [
      { label: "Government Support", value: "France 2030" },
      { label: "Allocation", value: "€400M" },
      { label: "Focus", value: "Medical Innovation" },
      { label: "Global Alignment", value: "FP2030, UNFPA, WHO" },
      { label: "SDG Target", value: "Universal Access" },
    ],
    description:
      "Aligns with France 2030's strategic priorities for innovative medical devices and global SDG commitments for contraceptive equity.",
  },
  "card-4": {
    cardId: "card-4",
    title: "Market Position",
    metrics: [
      { label: "Women's Interest", value: "High Demand" },
      { label: "Equity Focus", value: "Accessible" },
      { label: "Men's Investment", value: "Growing" },
      { label: "Market Gap", value: "Significant" },
      { label: "Revenue Potential", value: "Substantial" },
    ],
    description:
      "Meeting critical demand for contraceptive equity among women while attracting male investor interest in gender-balanced health solutions.",
  },
};

const DetailModal = ({
  cardDetail,
  onClose,
}: {
  cardDetail: CardDetail | null;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {cardDetail && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            layoutId={`modal-${cardDetail.cardId}`}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-950/95 to-purple-950/85 backdrop-blur-xl border border-blue-400/40 rounded-xl p-8 shadow-2xl relative"
              animate={{
                boxShadow:
                  "0 0 60px rgba(59, 130, 246, 0.5), 0 0 120px rgba(147, 51, 234, 0.3)",
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text mb-2">
                  {cardDetail.title}
                </h2>

                <motion.p
                  className="text-sm text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {cardDetail.description}
                </motion.p>

                {/* Metrics Grid */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {cardDetail.metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      className="bg-white/5 border border-blue-400/20 rounded-lg p-4 hover:border-blue-400/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                      whileHover={{
                        boxShadow:
                          "0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)",
                      }}
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

const HUDCard = ({
  title,
  description,
  content,
  position,
  delay,
  isSelected,
  onSelect,
  cardId,
}: HUDCardProps) => {
  // Varied positioning - different distances and heights
  const positionClasses: Record<string, string> = {
    "top-left": "top-8 left-20 md:top-12 md:left-32 lg:top-16 lg:left-40",
    "top-right": "top-24 right-16 md:top-32 md:right-24 lg:top-40 lg:right-32",
    "bottom-left": "bottom-16 left-32 md:bottom-24 md:left-40 lg:bottom-32 lg:left-48",
    "bottom-right": "bottom-8 right-24 md:bottom-12 md:right-32 lg:bottom-16 lg:right-40",
  };

  return (
    <motion.div
      layoutId={`card-${cardId}`}
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
      {/* HUD Card */}
      <motion.div
        layout
        className={`bg-gradient-to-br from-blue-950/90 to-purple-950/70 backdrop-blur-md border rounded-lg p-4 shadow-2xl transition-all ${
          isSelected
            ? "border-blue-400/80 shadow-blue-500/50"
            : "border-blue-400/30 hover:shadow-blue-500/30"
        }`}
        animate={
          isSelected
            ? {
                scale: 1.05,
                boxShadow:
                  "0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(147, 51, 234, 0.4)",
              }
            : {
                scale: 1,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
              }
        }
        transition={{ duration: 0.4 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isSelected
              ? [
                  "inset 0 0 30px rgba(59, 130, 246, 0.2)",
                  "inset 0 0 30px rgba(59, 130, 246, 0.5)",
                  "inset 0 0 30px rgba(59, 130, 246, 0.2)",
                ]
              : [
                  "inset 0 0 20px rgba(59, 130, 246, 0)",
                  "inset 0 0 20px rgba(59, 130, 246, 0.3)",
                  "inset 0 0 20px rgba(59, 130, 246, 0)",
                ],
          }}
          transition={{
            duration: isSelected ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            layout
            className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1.5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.p
            layout
            className="text-xs text-gray-300 mb-2.5 leading-relaxed text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {description}
          </motion.p>

          <motion.div
            layout
            className="text-xs text-blue-200 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            {content}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function HUD() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const selectedCard = selectedCardId ? cardDetails[selectedCardId] : null;

  return (
    <>
      {/* Animated lines from torus to cards */}
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

          <filter id="lineGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top-Left card line - adjusted endpoint */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="20%"
          y2="12%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: selectedCardId === "card-1" ? 1 : 0.5,
            opacity: selectedCardId === "card-1" ? 1 : 0.4,
            strokeWidth: selectedCardId === "card-1" ? 1.5 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Top-Right card line - adjusted endpoint */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="24%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: selectedCardId === "card-2" ? 1 : 0.5,
            opacity: selectedCardId === "card-2" ? 1 : 0.4,
            strokeWidth: selectedCardId === "card-2" ? 1.5 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Bottom-Left card line - adjusted endpoint */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="20%"
          y2="80%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: selectedCardId === "card-3" ? 1 : 0.5,
            opacity: selectedCardId === "card-3" ? 1 : 0.4,
            strokeWidth: selectedCardId === "card-3" ? 1.5 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Bottom-Right card line - adjusted endpoint */}
        <motion.line
          x1="50%"
          y1="50%"
          x2="80%"
          y2="88%"
          stroke="url(#lineGlow)"
          strokeWidth="1"
          filter="url(#lineGlowFilter)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: selectedCardId === "card-4" ? 1 : 0.5,
            opacity: selectedCardId === "card-4" ? 1 : 0.4,
            strokeWidth: selectedCardId === "card-4" ? 1.5 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Animated glow nodes at center when card selected */}
        {selectedCardId && (
          <motion.circle
            cx="50%"
            cy="50%"
            r="4"
            fill="url(#lineGlow)"
            animate={{
              r: [4, 6, 4],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>

      {/* Geometric Labyrinth Lines with Glow Effect */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: 1 }}
      >
        <defs>
          <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="1" />
          </linearGradient>

          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow layer */}
        <motion.g opacity="0.4" filter="url(#glow2)">
          <motion.path
            d="M 50% 50% L 20% 10%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
          <motion.path
            d="M 20% 10% L 10% 20% L 15% 35%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />

          <motion.path
            d="M 50% 50% L 90% 20%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          />
          <motion.path
            d="M 90% 20% L 95% 35% L 85% 45%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
          />

          <motion.path
            d="M 50% 50% L 25% 85%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          />
          <motion.path
            d="M 25% 85% L 15% 75% L 20% 60%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
          />

          <motion.path
            d="M 50% 50% L 80% 92%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
          />
          <motion.path
            d="M 80% 92% L 90% 78% L 88% 60%"
            stroke="url(#glowLineGrad)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          />
        </motion.g>

        {/* Main line layer */}
        <motion.g opacity="0.9" filter="url(#glow1)">
          <motion.path
            d="M 50% 50% L 20% 10%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 20% 10% L 10% 20% L 15% 35%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 15% 35% L 22% 50%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.95 }}
            strokeLinecap="round"
            opacity="0.6"
          />

          <motion.path
            d="M 50% 50% L 90% 20%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 90% 20% L 95% 35% L 85% 45%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 85% 45% L 78% 55%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.15 }}
            strokeLinecap="round"
            opacity="0.6"
          />

          <motion.path
            d="M 50% 50% L 25% 85%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 25% 85% L 15% 75% L 20% 60%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 20% 60% L 28% 70%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.35 }}
            strokeLinecap="round"
            opacity="0.6"
          />

          <motion.path
            d="M 50% 50% L 80% 92%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 80% 92% L 90% 78% L 88% 60%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            strokeLinecap="round"
          />
          <motion.path
            d="M 88% 60% L 75% 72%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.75"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.55 }}
            strokeLinecap="round"
            opacity="0.6"
          />

          <motion.path
            d="M 22% 50% L 28% 70%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            strokeLinecap="round"
            opacity="0.4"
          />
          <motion.path
            d="M 78% 55% L 75% 72%"
            stroke="url(#glowLineGrad)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.65 }}
            strokeLinecap="round"
            opacity="0.4"
          />
        </motion.g>

        <motion.circle
          cx="50%"
          cy="50%"
          r="3"
          fill="#3b82f6"
          opacity="0.8"
          filter="url(#glow2)"
          animate={{
            r: [3, 5, 3],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* HUD Cards */}
      <HUDCard
        cardId="card-1"
        position="top-left"
        delay={0.1}
        title="Andro-Switch"
        description="Name story"
        isSelected={selectedCardId === "card-1"}
        onSelect={() =>
          setSelectedCardId(selectedCardId === "card-1" ? null : "card-1")
        }
        content={
          <div className="space-y-1">
            <p>
              <span className="text-blue-300 font-semibold">Biomimicry</span>
            </p>
            <p className="text-gray-400">Inspired by nature</p>
            <p>
              <span className="text-purple-300 font-semibold">Thor</span> - 3D Torus
            </p>
            <p className="text-gray-400">Golden Ratio Symmetry</p>
          </div>
        }
      />

      <HUDCard
        cardId="card-2"
        position="top-right"
        delay={0.2}
        title="Technology"
        description="How does it work?"
        isSelected={selectedCardId === "card-2"}
        onSelect={() =>
          setSelectedCardId(selectedCardId === "card-2" ? null : "card-2")
        }
        content={
          <div className="space-y-1">
            <p>
              <span className="text-blue-300 font-semibold">Clean Tech</span>
            </p>
            <p className="text-gray-400">Thermal contraception</p>
            <p className="text-green-300 text-xs font-semibold">
              Reversible & Non-invasive
            </p>
          </div>
        }
      />

      <HUDCard
        cardId="card-3"
        position="bottom-left"
        delay={0.3}
        title="Society"
        description="Strategic alignment"
        isSelected={selectedCardId === "card-3"}
        onSelect={() =>
          setSelectedCardId(selectedCardId === "card-3" ? null : "card-3")
        }
        content={
          <div className="space-y-1">
            <p>
              <span className="text-blue-300 font-semibold">France 2030</span>
            </p>
            <p className="text-gray-400">€400M for medical innovation</p>
            <p className="text-green-300 text-xs">
              FP2030, UNFPA, WHO, SDGs
            </p>
          </div>
        }
      />

      <HUDCard
        cardId="card-4"
        position="bottom-right"
        delay={0.4}
        title="Market"
        description="Contraceptive equity"
        isSelected={selectedCardId === "card-4"}
        onSelect={() =>
          setSelectedCardId(selectedCardId === "card-4" ? null : "card-4")
        }
        content={
          <div className="space-y-1">
            <p>
              <span className="text-blue-300 font-semibold">Women's Equity</span>
            </p>
            <p className="text-gray-400">Seeking innovation</p>
            <p>
              <span className="text-purple-300 font-semibold">Men's Interest</span>
            </p>
            <p className="text-gray-400">Ready to invest</p>
          </div>
        }
      />

      {/* Detail Modal */}
      <DetailModal
        cardDetail={selectedCard}
        onClose={() => setSelectedCardId(null)}
      />
    </>
  );
}