import { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CardStackGallery from './CardStackGallery';
import { parseSignaturePiecesCSV, type SignaturePiece } from '../utils/signaturePiecesParser';

export default function RareFinds() {
  const { isDark } = useTheme();
  const [pieces, setPieces] = useState<SignaturePiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPieces() {
      const data = await parseSignaturePiecesCSV();
      setPieces(data);
      setLoading(false);
    }
    loadPieces();
  }, []);

  return (
    <section
      id="rare-finds"
      className={`py-16 ${isDark ? 'bg-[#111133]' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="flex justify-center mb-6">
            <Gem className={`w-12 h-12 ${isDark ? 'text-white' : 'text-amber-900'}`} strokeWidth={1.5} />
          </div>
          <h2
            className={`text-4xl md:text-5xl mb-4 ${isDark ? 'text-white' : 'text-amber-900'}`}
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            From Hands to Art
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Where nature's raw beauty meets our hands' devotion, every grain shaped, every curve crafted,
            revealing the art and soul behind every PGD masterpiece.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading signature pieces...</p>
          </div>
        ) : (
          <div className="min-h-[700px] flex items-center justify-center mt-8">
            <CardStackGallery pieces={pieces} />
          </div>
        )}
      </div>
    </section>
  );
}
