import { useState, useEffect } from 'react';

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid #f1f5f9',
    marginBottom: '24px',
    gap: '24px'
  },
  tabBtn: (isActive) => ({
    padding: '10px 4px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '3px solid #3b82f6' : '3px solid transparent',
    color: isActive ? '#3b82f6' : '#94a3b8',
    fontWeight: isActive ? '600' : '500',
    fontSize: '15px',
    transition: 'all 0.2s',
    marginBottom: '-2px' // Menumpuk di atas border bawah
  }),
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    width: '100%',
    maxWidth: '300px',
    outline: 'none',
    background: '#f8fafc'
  },
  tableWrapper: {
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    whiteSpace: 'nowrap'
  },
  th: {
    padding: '16px',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9'
  },
  badgeFood: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  badgeQris: {
    background: '#ecfdf5',
    color: '#059669',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#64748b'
  },
  pageBtn: (disabled) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: disabled ? '#f8fafc' : '#ffffff',
    color: disabled ? '#94a3b8' : '#0f172a',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s'
  })
};

export default function DataTablesCard({ dataFood, dataQris }) {
  const [activeTab, setActiveTab] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Konfigurasi Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Kembalikan ke halaman 1 setiap kali tab diganti atau sedang mencari data
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  // Logika Filter Data
  const filteredFood = dataFood.filter(item => 
    item.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal_order.includes(searchTerm)
  );

  const filteredQris = dataQris.filter(item => 
    item.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal.includes(searchTerm)
  );

  // Penentuan Data Aktif & Pemotongan Array untuk Pagination
  const activeData = activeTab === 'food' ? filteredFood : filteredQris;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  
  // Mengambil 10 baris spesifik sesuai halaman saat ini
  const paginatedData = activeData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div style={styles.card}>
      
      {/* Area Tab Navigasi */}
      <div style={styles.tabContainer}>
        <button 
          style={styles.tabBtn(activeTab === 'food')} 
          onClick={() => setActiveTab('food')}
        >
          🍔 Penjualan Makanan
        </button>
        <button 
          style={styles.tabBtn(activeTab === 'qris')} 
          onClick={() => setActiveTab('qris')}
        >
          📱 Transaksi QRIS
        </button>
      </div>

      {/* Area Pencarian */}
      <div style={styles.toolbar}>
        <div>
          Menampilkan <b>{paginatedData.length}</b> dari total <b>{activeData.length}</b> data
        </div>
        <input 
          type="text" 
          placeholder="Cari tanggal, merchant, atau tipe..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Area Tabel */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            {activeTab === 'food' ? (
              <tr>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Merchant</th>
                <th style={styles.th}>Pendapatan Bersih</th>
                <th style={styles.th}>Kasir</th>
              </tr>
            ) : (
              <tr>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Tipe QRIS</th>
                <th style={styles.th}>Nominal Masuk</th>
                <th style={styles.th}>Kasir</th>
              </tr>
            )}
          </thead>
          <tbody>
            {paginatedData.length > 0 ? paginatedData.map((item, index) => (
              <tr key={item.id} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={styles.td}>
                  {activeTab === 'food' ? item.tanggal_order : item.tanggal}
                </td>
                <td style={styles.td}>
                  {activeTab === 'food' ? (
                    <span style={styles.badgeFood}>{item.merchant}</span>
                  ) : (
                    <span style={styles.badgeQris}>{item.tipe}</span>
                  )}
                </td>
                <td style={{...styles.td, fontWeight: '700', color: '#0f172a'}}>
                  Rp {parseInt(activeTab === 'food' ? item.pendapatan_bersih : item.nominal).toLocaleString('id-ID')}
                </td>
                <td style={styles.td}>{item.diinput_oleh}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{...styles.td, textAlign: 'center', padding: '32px'}}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Area Kontrol Pagination */}
      <div style={styles.pagination}>
        <button 
          style={styles.pageBtn(currentPage === 1)}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>
        
        <span style={{ fontWeight: '500' }}>
          Halaman {currentPage} dari {totalPages || 1}
        </span>
        
        <button 
          style={styles.pageBtn(currentPage === totalPages || totalPages === 0)}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Selanjutnya
        </button>
      </div>

    </div>
  );
}
