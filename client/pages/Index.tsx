import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-display font-bold text-xl text-gray-900">
            Andro-Switch
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Accueil
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              À propos
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Investissez
              <br />
              dans le futur
              <br />
              de la contraception
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Découvrez l'innovation révolutionnaire qui change la donne
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
              En savoir plus
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Lambrio-Switch: Une innovation révolutionnaire
            </p>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Révolutionner la contraception
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                2027
              </h3>
              <p className="text-gray-600 text-sm">
                Lancement commercial prévu
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                1.2B
              </h3>
              <p className="text-gray-600 text-sm">Marché potentiel estimé</p>
            </div>

            <div className="text-center">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-green-500 mb-2">
                0
              </h3>
              <p className="text-gray-600 text-sm">
                Effets secondaires significatifs
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-green-500 mb-2">
                70%
              </h3>
              <p className="text-gray-600 text-sm">
                Acceptabilité chez les femmes
              </p>
            </div>
          </div>

          {/* Feature Points */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">
                  Technologie brevetée
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Solution novatrice protégée par brevets internationaux
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">
                  Études cliniques complètes
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Validation scientifique rigoureuse et transparente
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">Impact sociétal</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Améliore la santé et l'autonomie des femmes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Autotest Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              L'autotest est
              <br />
              déjà rentable !
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Notre solution d'autodiagnostic révolutionne le modèle économique
              de la contraception en le rendant immédiatement viable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-8 text-gray-950">
              <h3 className="font-display text-xl font-bold mb-4">
                LA CONTRACEPTION
                <br />
                MASCULINE,
                <br />
                ON EN EST OÙ ?
              </h3>
              <p className="text-sm opacity-90">
                Découvrez l'état actuel des solutions contraceptives pour hommes
              </p>
            </div>

            {/* Card 2 - Tech illustration placeholder */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold mb-4">
                  Technologie
                  <br />
                  Avancée
                </h3>
                <p className="text-sm opacity-90">
                  Une solution moderne et efficace pour le contrôle natal
                </p>
              </div>
              <div className="w-32 h-32 bg-white/10 rounded-xl mt-4"></div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-orange-300 to-orange-500 rounded-2xl p-8 text-gray-950">
              <h3 className="font-display text-xl font-bold mb-4">
                RESPONSABILITÉ
                <br />
                PARTAGÉE
              </h3>
              <p className="text-sm opacity-90">
                Vers une égalité dans la charge contraceptive
              </p>
            </div>

            {/* Card 4 - Clinical image */}
            <div className="bg-gray-800 rounded-2xl p-8 text-white overflow-hidden">
              <div className="bg-gradient-to-br from-amber-100 to-amber-300 w-full h-48 rounded-lg mb-4"></div>
              <h3 className="font-display text-lg font-bold">
                Essais Cliniques
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                Résultats prometteurs et sécurité validée
              </p>
            </div>

            {/* Card 5 - Yellow banner */}
            <div className="bg-yellow-300 rounded-2xl p-8 text-gray-950 flex items-center">
              <div>
                <h3 className="font-display text-lg font-bold mb-2">
                  J'ai décidé de
                  <br />
                  prendre le relais.
                  <br />
                  Cette responsabilité
                  <br />
                  ma semblait évident.
                </h3>
                <p className="text-xs opacity-75">Témoignage utilisateur</p>
              </div>
            </div>

            {/* Card 6 - Testimonial */}
            <div className="bg-purple-600 rounded-2xl p-8 text-white">
              <h3 className="font-display text-lg font-bold mb-4">
                LA CONTRACEPTION
                <br />
                MASCULINE,
                <br />
                ON EN EST OÙ ?
              </h3>
              <div className="space-y-2 text-sm">
                <p>✓ Acceptabilité élevée</p>
                <p>✓ Efficacité prouvée</p>
                <p>✓ Réversible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Vision long-terme:
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl">
            Ouvrir Andro-Switch aux marchés de l'Europe,
            <br />
            des USA, du Canada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Phase 1: Europe
              </h3>
              <p className="text-gray-600 text-sm">
                Lancement initial sur les marchés européens avec partenaires
                locaux
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Phase 2: Amérique du Nord
              </h3>
              <p className="text-gray-600 text-sm">
                Expansion vers les États-Unis et le Canada
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Phase 3: Global
              </h3>
              <p className="text-gray-600 text-sm">
                Présence mondiale et impact de santé publique majeur
              </p>
            </div>
          </div>

          {/* FAQ-style boxes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Quels sont les obstacles ?
              </h4>
              <p className="text-gray-600 text-sm">
                Régulation, acceptabilité sociale, et accès aux marchés
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Comment les surmonter ?
              </h4>
              <p className="text-gray-600 text-sm">
                Études cliniques robustes et partenariats stratégiques
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Quel impact ?
              </h4>
              <p className="text-gray-600 text-sm">
                Révolutionner l'accès à la contraception masculine sûre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold mb-12">
            Ils nous font confiance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/10 rounded-lg h-20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <div className="text-gray-400 text-sm font-semibold">
                  Client {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
                Collaborons
                <br />
                au futur
                <br />
                ensemble.
              </h2>
              <p className="text-gray-600 mb-8">
                Nous recherchons des partenaires visionnaires pour accélérer
                l'adoption de solutions contraceptives innovantes et
                accessibles.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                Nous rejoindre
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-12 text-white">
              <h3 className="font-display text-2xl font-bold mb-4">
                Partenaires et Investisseurs
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Accès à une technologie révolutionnaire
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Marché en croissance rapide
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Impact sociétal positif
                </li>
              </ul>
            </div>
          </div>
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
