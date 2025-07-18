import React, { useEffect, useState, useRef } from 'react';
import { bestOfService } from '../../services/api';
import './scrollbar-hide.css';
import { Link } from 'react-router-dom';

const BestOf = () => {
  const [bestOfData, setBestOfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await bestOfService.getAll();
      setBestOfData(res.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const dataLength = bestOfData.length;

  // Scroll ke awal saat mount/ketika data berubah
  useEffect(() => {
    if (!sliderRef.current || dataLength === 0) return;
    sliderRef.current.scrollTo({
      left: 0,
      behavior: 'auto',
    });
  }, [dataLength]);

  // Geser satu card per klik
  const getCardWidth = () => 340 + 32; // minWidth + gap
  const handleScroll = (dir) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = getCardWidth();
    // Geser satu card
    slider.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
    // Setelah animasi selesai, cek dan lompat ke tengah jika perlu
    const checkAndJump = () => {
      if (!slider) return;
      // Jika scroll terlalu kiri
      if (slider.scrollLeft < cardWidth * 0.5) {
        slider.scrollTo({
          left: cardWidth * dataLength + slider.scrollLeft,
          behavior: 'auto',
        });
      }
      // Jika scroll terlalu kanan
      else if (slider.scrollLeft > cardWidth * (dataLength - 1 - 0.5)) {
        slider.scrollTo({
          left: cardWidth * dataLength,
          behavior: 'auto',
        });
      }
    };
    // Gunakan requestAnimationFrame untuk memastikan setelah animasi selesai
    setTimeout(() => {
      requestAnimationFrame(checkAndJump);
    }, 400);
  };

  // Fungsi geser baru
  const goTo = (dir) => {
    let next = currentIndex + dir;
    if (next < 0) next = 0;
    if (next > dataLength - 1) next = dataLength - 1;
    setCurrentIndex(next);
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = getCardWidth();
    slider.scrollTo({ left: cardWidth * (next), behavior: 'smooth' });
  };
  // Update currentIndex saat scroll manual
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onScroll = () => {
      const cardWidth = getCardWidth();
      const idx = Math.round(slider.scrollLeft / cardWidth);
      setCurrentIndex(idx);
    };
    slider.addEventListener('scroll', onScroll);
    return () => slider.removeEventListener('scroll', onScroll);
  }, [dataLength]);

  if (loading) return <div>Loading...</div>;
  if (bestOfData.length === 0) return <div>Data tidak tersedia</div>;

  return (
    <section className="w-full max-w-[1230px] mx-auto px-5 py-4 mb-1 md:mb-2">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-center mb-2 px-1 md:px-0 text-left">
        
        <h2 className="text-3xl md:text-5xl font-raleway font-bold text-gray-900 leading-tight mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
          Destinasi Dayeuhmanggung 
        </h2>
        {/* Progress bar */}
        <div className="w-full mt-1 mb-2">
          <div className="relative w-full h-1 bg-gray-200 rounded">
            <div className="absolute top-0 left-0 h-1 bg-black rounded transition-all duration-300" style={{width: `${dataLength > 1 ? ((currentIndex+1)/dataLength)*100 : 100}%`}}></div>
          </div>
        </div>
        {/* Pagination row */}
        <div className="w-full flex items-center justify-between md:justify-end gap-3 mb-4">
          <div className="flex items-end gap-1">
            <span className="text-2xl leading-none roboto-font">{String(currentIndex+1).padStart(2,'0')}</span>
            <span className="text-xl leading-none roboto-font">/ {String(dataLength).padStart(2,'0')}</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-xl" aria-label="Sebelumnya" onClick={() => goTo(-1)} disabled={currentIndex === 0}><svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
            <button className="text-2xl" aria-label="Selanjutnya" onClick={() => goTo(1)} disabled={currentIndex === dataLength-1}><svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </div>
      {/* Card BestOf dengan scroll horizontal, infinite */}
        <div ref={sliderRef} className="flex gap-3 md:gap-8 items-start overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{scrollbarWidth: 'none', touchAction: 'pan-x'}}>
          {bestOfData.map((item, idx) => (
            <Link
              key={idx + '-' + (item?.id || 'bestof')}
              to={`/bestof/${item?.id}`}
              className="relative flex-shrink-0 min-w-[90vw] max-w-[90vw] md:min-w-[330px] md:max-w-[330px] h-[420px] md:h-[420px] rounded-2xl overflow-hidden bg-white mb-5 snap-start shadow group cursor-pointer transition-transform duration-200 hover:brightness-95"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={item?.gambar ? `/images/${item.gambar}` : '/images/default-bestof.jpg'}
                alt={item?.judul}
                className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Label kategori */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">{item?.kategori || 'Destinasi'}</span>
              </div>
              {/* Overlay bawah untuk judul, waktu, dan harga tiket */}
              <div className="absolute bottom-0 left-0 w-full z-20 p-0">
                <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 md:px-6 pt-8 md:pt-10 pb-4 md:pb-5">
                  <h3 className="text-lg md:text-2xl font-raleway font-bold text-white mb-2 drop-shadow-lg" title={item?.judul}>{item?.judul}</h3>
                  <div className="flex items-center gap-5 text-base text-gray-100">
                    <span className="flex items-center gap-2">
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
                      {item?.durasi ? item.durasi : '-'}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 21V8a2 2 0 012-2h2a2 2 0 012 2v13M9 21h6' /></svg>
                      {item?.harga_tiket ? `Rp${item.harga_tiket.toLocaleString('id-ID')}` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </section>
  );
};

export default BestOf;