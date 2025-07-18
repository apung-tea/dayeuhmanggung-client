import React, { useEffect, useState } from 'react';
import { tentangService } from '../../services/api';
import { fasilitasService } from '../../services/api';
import { Link } from 'react-router-dom';

// highlights akan diisi dari API fasilitas

const Tentang = () => {
  const [tentangData, setTentangData] = useState({
    deskripsi: ''
  });
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchTentang = async () => {
      try {
        const res = await tentangService.get();
        setTentangData(res.data || {});
      } catch (error) {
        setTentangData({
          deskripsi: 'Perkebunan Dayeuhmanggung adalah perkebunan kopi premium yang berlokasi di ketinggian 1200-1500 mdpl. Kami mengutamakan kualitas dan keberlanjutan dalam setiap proses produksi.',
        });
      } finally {
        setLoading(false);
      }
    };
    const fetchFasilitas = async () => {
      try {
        const res = await fasilitasService.getAll();
        const aktif = (Array.isArray(res.data) ? res.data : (res.data || [])).filter(f => Number(f.status_aktif) === 1);
        setHighlights(aktif.map(f => ({
          title: f.nama,
          desc: f.deskripsi,
          image: f.gambar ? `/images/${f.gambar}` : '/images/default-article.jpg',
        })));
      } catch {
        setHighlights([]);
      }
    };
    fetchTentang();
    fetchFasilitas();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (highlights.length === 0 ? 0 : (prev === 0 ? highlights.length - 1 : prev - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (highlights.length === 0 ? 0 : (prev === highlights.length - 1 ? 0 : prev + 1)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-8 px-2 md:px-10 relative" style={{backgroundImage: 'url(/images/bg-tentang2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Overlay hitam/transparan agar remang-remang */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 items-stretch relative z-10">
        {/* Kiri: Info utama */}
        <div className="flex flex-col justify-center h-full text-white px-2 md:px-8 relative">
          {/* Overlay motif samar di background kiri */}
        
          <div className="relative z-10 flex flex-col items-start">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 font-raleway" style={{fontFamily: 'Playfair Display, serif', lineHeight: 1.1}}>
              {`Tentang `}Dayeuhmanggung
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-md text-justify" style={{fontFamily: 'Inter, sans-serif'}}>{tentangData.deskripsi || 'Perkebunan Dayeuhmanggung adalah perkebunan kopi premium yang berlokasi di ketinggian 1200-1500 mdpl. Kami mengutamakan kualitas dan keberlanjutan dalam setiap proses produksi.'}</p>
            {/* Lokasi dan Map */}  
            <div className="flex items-center gap-2 mb-3 text-green-300 text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="font-semibold text-white">Lokasi Dayeuhmanggung</span>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-green-300/40 bg-white/10 mb-8 w-full max-w-md">
              <iframe
                title="Peta Dayeuhmanggung"
                src="https://www.google.com/maps?q=Dayeuhmanggung,+Cilawu,+Garut,+Jawa+Barat,+Indonesia&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Link
              to="/tentang-dayeuhmanggung"
              className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg bg-transparent hover:bg-white hover:text-black transition-all text-base md:text-lg shadow-lg mb-8"
            >
              Lihat Selengkapnya
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Kanan: Highlight Dayeuhmanggung Slider */}
        <div className="flex flex-col items-center justify-center relative w-full">
          {/* Keterangan di atas foto */}
          <div className="w-full max-w-[480px] mb-2 flex items-center justify-start">
            <span className="uppercase tracking-widest text-xl md:text-2xl text-white font-bold m-3">Fasilitas</span>
          </div>
          <div className="relative w-full flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-white hover:text-black text-white rounded-full p-2 shadow transition"
              aria-label="Sebelumnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div
              className="relative w-[90vw] md:w-[480px] h-[420px] sm:h-[320px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl group flex-shrink-0 transition-transform duration-300 border border-gray-300"
              style={{ maxWidth: '100%', minWidth: '220px' }}
            >
              {highlights.length > 0 ? (
                <>
                  <img
                    src={highlights[currentIndex].image}
                    alt={highlights[currentIndex].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-7 z-20">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg line-clamp-2">{highlights[currentIndex].title}</h3>
                    <p className="text-gray-100 text-base md:text-lg line-clamp-3 drop-shadow-md">{highlights[currentIndex].desc}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xl">Tidak ada data fasilitas aktif</div>
              )}
            </div>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-white hover:text-black text-white rounded-full p-2 shadow transition"
              aria-label="Selanjutnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-[480px] mt-4 flex flex-col items-center">
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${highlights.length > 0 ? ((currentIndex + 1) / highlights.length) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between w-full mt-2 px-2 text-xs text-gray-300">
              <span>{highlights.length > 0 ? highlights[currentIndex].title : ''}</span>
              <span>{highlights.length > 0 ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(highlights.length).padStart(2, '0')}` : ''}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Custom scrollbar-hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Tentang;
