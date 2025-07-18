import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bestOfService } from '../../services/api';

const BestOfDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bestOfService.getById(id);
        setData(res);
      } catch (err) {
        setError('Data tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error || !data) return <div className="text-center py-16 text-red-500">{error || 'Data tidak ditemukan'}</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[180px] sm:h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
        <img
          src={data.gambar ? `/images/${data.gambar}` : '/images/default-bestof.jpg'}
          alt={data.judul}
          className="w-full h-full object-cover object-center"
        />
        <Link to="/" className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/80 hover:bg-white text-blue-700 font-semibold px-3 sm:px-4 py-2 rounded transition shadow-none border-none">&larr; Kembali</Link>
      </div>
      <div className="w-full max-w-2xl px-4 py-8 mx-auto md:ml-0 md:mr-auto md:pl-12 md:pr-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-6 text-left">{data.judul}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Tiket */}
          <div className="flex items-center gap-3">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-yellow-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 21V8a2 2 0 012-2h2a2 2 0 012 2v13M9 21h6' /></svg>
            <span className="font-semibold text-sm text-gray-700">Tiket:</span>
            <span className="text-gray-900 text-base">{data.harga_tiket ? `Rp${data.harga_tiket.toLocaleString('id-ID')}` : '-'}</span>
          </div>
          {/* Waktu */}
          <div className="flex items-center gap-3">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
            <span className="font-semibold text-sm text-gray-700">Waktu:</span>
            <span className="text-gray-900 text-base">{data.durasi || '-'}</span>
          </div>
          {/* Lokasi */}
          <div className="flex items-center gap-3">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a4 4 0 11-8 0 4 4 0 018 0z' /></svg>
            <span className="font-semibold text-sm text-gray-700">Lokasi:</span>
            <span className="text-gray-900 text-base">{data.lokasi || '-'}</span>
          </div>
          {/* Jam Buka */}
          <div className="flex items-center gap-3">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-purple-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3' /></svg>
            <span className="font-semibold text-sm text-gray-700">Jam Buka:</span>
            <span className="text-gray-900 text-base">{data.jam_buka || '-'}</span>
          </div>
        </div>
        <div className="text-lg text-gray-700 mb-2 text-left max-w-2xl">{data.deskripsi}</div>
      </div>
    </div>
  );
};

export default BestOfDetail; 