import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function FAQ() {
  const { isDark } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What makes PGD furniture different?',
      answer: 'Every piece is handcrafted by skilled artisans in Jepara, using traditional techniques passed down through generations. We use only premium, sustainably sourced materials and never compromise on quality. Each item carries the unique touch of human hands and the soul of true craftsmanship.',
    },
    {
      question: 'How long does custom furniture take?',
      answer: 'Custom pieces typically take 6-12 weeks, depending on complexity and current orders. We believe great furniture cannot be rushed. Each phase - from design approval to final finishing - receives the time and attention it deserves. We keep you updated throughout the entire journey.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide with professional packing and secure logistics partners. We have extensive experience shipping delicate furniture internationally and ensure every piece arrives in perfect condition. Shipping times and costs vary by destination.',
    },
    {
      question: 'What wood types do you use?',
      answer: 'We primarily work with premium teak, mahogany, and rosewood, all sourced from certified sustainable forests. Each wood type offers unique grain patterns, durability, and character. We can guide you in selecting the perfect wood for your specific needs and aesthetic preferences.',
    },
    {
      question: 'Is there a warranty?',
      answer: 'All our furniture comes with a comprehensive 5-year warranty covering structural integrity and craftsmanship. We stand behind every piece we create. Normal wear and tear is expected, but any defects in materials or workmanship are fully covered.',
    },
    {
      question: 'Can I visit your workshop?',
      answer: 'Absolutely! We welcome visitors to our Jepara workshop by appointment. Witness the creation process firsthand, meet our artisans, and see the care that goes into each piece. It is an experience that deepens appreciation for handcrafted furniture.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-16 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-[#111133] dark:to-[#111133] section-transition faq-transition ${isDark ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <HelpCircle className="w-12 h-12 text-amber-900 dark:text-white" strokeWidth={1.5} />
          </div>
          <h2
            className="text-4xl md:text-5xl text-amber-900 dark:text-white mb-4"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            Here to Help
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clear, honest answers to support every step of your journey with us.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2a2a2a] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <h3
                  className="text-lg md:text-xl text-amber-900 dark:text-white pr-4"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-amber-900 dark:text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-amber-900 dark:text-white" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
