import { useState, useRef, FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import TorusScene from "@/components/TorusScene";
import HUD from "@/components/HUD";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface GateProps {
  onUnlock: () => void;
  onLogout?: () => void;
}

export default function Gate({ onUnlock, onLogout }: GateProps) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

    const [showHUD, setShowHUD] = useState(window.innerWidth >= 900);

    useEffect(() => {
      const handleResize = () => {
        setShowHUD(window.innerWidth >= 900);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (password.toLowerCase() === "thoreme") {
        onUnlock();
        navigate("/");
      } else {
        setError("Code d'accès incorrect");
        setPassword("");
        inputRef.current?.focus();
      }
      setIsLoading(false);
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("andro-switch-authenticated");
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center overflow-hidden relative font-display">

      {/* 3D Torus - Wireframe, Circling Title */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} style={{ pointerEvents: "auto" }}>
            <TorusScene />
          </Canvas>
        </Suspense>

        {/* HUD Elements - Smart positioning around torus */}
        {/* HUD Overlay - Hidden on mobile */}
        {showHUD && (
          <div className="absolute inset-0 z-5 pointer-events-none">
            <HUD />
          </div>
        )}
      </div>
      

         {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Content Overlay - Centered Content */}
      <motion.div
        className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Center Container - Title, Description, and Form */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Title Container - Centered, Torus Circles It */}
          <div className="flex flex-col items-center justify-center space-y-0 mb-2">
            {/* thoreme-core Label - positioned above title */}
            <motion.span
              className="text-xs text-blue-600 font-bold tracking-widest ml-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               {t("gate.thorem")}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
               {t("gate.title")}
            </motion.h1>
          </div>

          {/* Descriptive Text Below Torus and Title */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-xs text-gray-400 font-light">
              {t("gate.description1")}
              <br />
             {t("gate.description2")}
            </p>
          </motion.div>

          {/* Password Form Section - Below Title/Description */}
          <motion.div
            className="w-full max-w-sm flex flex-col items-center space-y-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="w-full space-y-4"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="password"
                  placeholder={t("gate.inputPlaceholder")}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-center font-display focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  className="text-red-400 text-xs text-center font-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isLoading || !password}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-full font-display transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? t("gate.verifying") : t("gate.submitButton")}
              </motion.button>
            </motion.form>

            {/* Hint Text */}
            <motion.p
              className="text-xs text-blue-600 text-center font-display bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                filter: [
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))",
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))",
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))"
                ]
              }}
              transition={{
                duration: 3,
                delay: 0.9,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                textShadow: "0 0 20px rgba(221, 231, 248, 0.8), 0 0 40px rgba(164, 164, 164, 0.76)"
              }}
            >
              {t("gate.accessNote")}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
