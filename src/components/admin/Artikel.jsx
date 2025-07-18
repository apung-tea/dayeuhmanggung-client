import React, { useState } from 'react';

const Artikel = ({ artikelData, loading, onAdd, onEdit, onDelete }) => {
  // Tambahkan state untuk pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(artikelData.length / pageSize);
  const pagedData = artikelData.slice((page - 1) * pageSize, page * pageSize);

  // Reset ke halaman 1 jika data berubah
  React.useEffect(() => { setPage(1); }, [artikelData]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Kelola Artikel</h2>
        <button 
          onClick={onAdd} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Tambah Artikel Baru
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">Gambar</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pagedData.length > 0 ? (
                pagedData.map((artikel, index) => (
                  <tr key={artikel.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 border-b border-gray-200">{artikel.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate border-r border-gray-200 border-b border-gray-200">{artikel.judul}</td>
                    <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200 border-b border-gray-200">
                      <img 
                          src={artikel.gambar ? `/images/${artikel.gambar}` : '/images/default-article.jpg'} 
                           
                           
                        alt={artikel.judul} 
                        className="w-16 h-12 object-cover rounded-md border" 
                        onError={e => {e.target.src = '/images/default-article.jpg';}} 
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 border-b border-gray-200">
                      {new Date(artikel.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onEdit(artikel)} 
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => onDelete(artikel.id)} 
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-xs"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 border-b border-gray-200">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <p>Tidak ada data artikel</p>
                      <p className="text-sm text-gray-400">Klik "Tambah Artikel Baru" untuk menambahkan artikel</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Sebelumnya
            </button>
            <span className="text-sm text-gray-600 font-medium">Halaman {page} dari {totalPages}</span>
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Berikutnya
            </button>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default Artikel; 