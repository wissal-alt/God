import { Shield, Flame, Users, Hammer, Leaf, Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { GlowingEffect } from './GlowingEffect';

export default function About() {
  const { isDark } = useTheme();

  const cards = [
    {
      icon: Shield,
      title: 'Trust in Every Detail',
      description: 'Our promise is simple: honesty in process, integrity in every delivery, and care in every interaction. We build relationships that last by staying true to our word and letting our work speak for itself.',
    },
    {
      icon: Flame,
      title: 'Driven by Passion',
      description: 'Passion fuels every sketch, every join, and every finish. It\'s what turns ordinary materials into extraordinary designs and gives each creation the warmth and authenticity that define our craft.',
    },
    {
      icon: Users,
      title: 'A Community of Makers',
      description: 'We believe furniture connects people in more ways than one. From the artisans who shape each piece to the homes they enter, our work is built on collaboration, pride, and shared purpose.',
    },
    {
      icon: Hammer,
      title: 'Crafted with Intention',
      description: 'Each creation begins with purpose and patience. Our craftsmen shape every line and curve with thought and precision, ensuring each piece holds meaning beyond its function.',
    },
    {
      icon: Leaf,
      title: 'Materials that Matter',
      description: 'We choose our materials for their story, strength, and spirit. From solid woods to fine textures, every element is selected to age gracefully and carry the mark of enduring quality.',
    },
    {
      icon: Lightbulb,
      title: 'The Vision Behind the Form',
      description: 'Our design philosophy bridges timeless elegance with modern innovation. Each piece blends artistry with practicality, creating furniture that feels familiar yet endlessly inspiring.',
    },
  ];

  return (
    <section id="about" className={`py-16 ${isDark ? 'bg-[#111133]' : 'bg-white'} section-transition about-transition ${isDark ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl ${isDark ? 'text-white' : 'text-amber-900'} mb-4`}
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            About PGD Wooden House
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Where tradition meets innovation, and craftsmanship speaks louder than words.
          </p>
        </div>

        <div className={`relative ${isDark ? 'bg-[#1a1a2a]' : 'bg-stone-50'} rounded-2xl p-8 mb-16 shadow-lg max-w-4xl mx-auto`}>
          <GlowingEffect
            borderWidth={6}
            proximity={100}
            spread={20}
            disabled={false}
            glow={true}
          />
          <p className={`text-lg text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            style={{ lineHeight: '1.6' }}>
            PGD Wooden House was born from a simple belief: furniture should be more than functional,<br />
            it should inspire, comfort, and endure. Our workshop is where tradition meets innovation,<br />
            where craftsmanship and creativity shape pieces that speak to the soul.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative ${isDark ? 'bg-[#1a1a2a]' : 'bg-white'} rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center`}
              style={{ minHeight: '320px', maxWidth: '340px', margin: '0 auto' }}
            >
              <GlowingEffect
                borderWidth={6}
                proximity={100}
                spread={20}
                disabled={false}
                glow={true}
              />
              <div className={`inline-flex items-center justify-center w-14 h-14 ${isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-900'} rounded-xl mb-4`}>
                <card.icon size={28} strokeWidth={1.5} />
              </div>
              <h3
                className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-amber-900'} mb-3 leading-tight`}
                style={{ fontFamily: "'DM Serif Text', serif" }}
              >
                {card.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed text-[15px]`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
