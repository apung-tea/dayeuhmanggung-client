import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artikelService } from '../../services/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await artikelService.getById(id);
        setData(res);
      } catch (err) {
        setError('Data tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error || !data) return <div className="text-center py-16 text-red-500">{error || 'Data tidak ditemukan'}</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[180px] sm:h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
        <img
          src={data.gambar ? data.gambar : '/images/default-article.jpg'}
          alt={data.judul}
          className="w-full h-full object-cover object-center"
        />
        <Link to="/" className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/80 hover:bg-white text-blue-700 font-semibold px-3 sm:px-4 py-2 rounded transition shadow-none border-none">&larr; Kembali</Link>
      </div>
      <div className="w-full max-w-2xl px-4 py-8 mx-auto md:ml-0 md:mr-auto md:pl-12 md:pr-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 text-left">{data.judul}</h1>
        <div className="text-gray-500 text-sm mb-6 text-left">{formatDate(data.created_at)}</div>
        <div className="prose prose-lg max-w-none text-gray-800 text-left" style={{whiteSpace: 'pre-line'}}>{data.konten}</div>
      </div>
    </div>
  );
};

export default ArticleDetail; 