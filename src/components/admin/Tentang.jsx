import React from 'react';

const Tentang = ({ 
  tentangData, 
  tentangEdit, 
  setTentangEdit, 
  tentangLoading, 
  tentangMsg, 
  tentangFile, 
  setTentangFile, 
  tentangPreview, 
  setTentangPreview, 
  onSave 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 sm:p-6 max-w-full">
      <h2 className="text-xl font-semibold mb-4 text-green-800">Kelola Halaman Tentang</h2>
      <form onSubmit={onSave}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-green-700 mb-2">Deskripsi</label>
          <textarea
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
            rows="6"
            value={tentangEdit.deskripsi}
            onChange={e => setTentangEdit({ ...tentangEdit, deskripsi: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-green-700 mb-2">Gambar</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <input
              type="file"
              accept="image/*"
              className="w-auto border border-green-200 rounded-lg px-3 py-2 bg-green-50"
              onChange={e => {
                setTentangFile(e.target.files[0]);
                setTentangPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <div className="flex-1 w-full flex justify-center items-center min-h-[180px]">
              {tentangPreview && (
                <img src={tentangPreview} alt="Preview" className="max-w-full max-h-72 object-contain rounded-xl shadow border border-green-100" />
              )}
              {!tentangPreview && tentangData.file_foto && (
                <img src={`/images/${tentangData.file_foto}`} alt="Tentang" className="max-w-full max-h-72 object-contain rounded-xl shadow border border-green-100" />
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow"
          disabled={tentangLoading}
        >
          {tentangLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        {tentangMsg && <div className="mt-2 text-sm">{tentangMsg}</div>}
      </form>
    </div>
  );
};

export default Tentang; 