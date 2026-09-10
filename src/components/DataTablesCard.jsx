import { useState } from 'react';

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #eaeaea',
  },
  // Desain Tab Navigasi
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #eaeaea',
    marginBottom: '20px',
    gap: '16px'
  },
  tabBtn: (isActive) => ({
    padding: '10px 16px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
    color: isActive ? '#2563eb' : '#64748b',
    fontWeight: isActive ? '600' : '400',
    fontSize: '15px',
    transition: 'all 0.2s'
  }),
  // Desain ala DataTables (Toolbar Pencarian)
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    width: '250px',
    outline: 'none'
  },
  infoText: {
    fontSize: '14px',
    color: '#64748b'
  },
  // Desain Tabel
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '12px 16px',
    background: '#f8fafc',
    color: '#475569',
    fontSize: '13px',
    textTransform: 'uppercase',
    borderBottom: '2px solid #eaeaea'
  },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9'
  }
};

export default function DataTablesCard({ dataFood, dataQris }) {
  // State untuk Tab Aktif ('food' atau 'qris')
  const [activeTab, setActiveTab] = useState('food');
  // State untuk Kotak Pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Logika Pencarian Data Food (Berdasarkan Merchant atau Tanggal)
  const filteredFood = dataFood.filter(item => 
    item.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal_order.includes(searchTerm)
  );

  // Logika Pencarian Data QRIS (Berdasarkan Tipe atau Tanggal)
  const filteredQris = dataQris.filter(item => 
    item.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal.includes(searchTerm)
  );

  return (
    <div style={styles.card}>
      
      {/* 1. Area Tab Navigasi */}
      <div style={styles.tabContainer}>
        <button 
          style={styles.tabBtn(activeTab === 'food')} 
          onClick={() => { setActiveTab('food'); setSearchTerm(''); }}
        >
          🍔 Penjualan Makanan
        </button>
        <button 
          style={styles.tabBtn(activeTab === 'qris')} 
          onClick={() => { setActiveTab('qris'); setSearchTerm(''); }}
        >
          📱 Transaksi QRIS
        </button>
      </div>

      {/* 2. Area Toolbar DataTables (Pencarian & Info) */}
      <div style={styles.toolbar}>
        <div style={styles.infoText}>
          Menampilkan <b>{activeTab === 'food' ? filteredFood.length : filteredQris.length}</b> data
        </div>
        <input 
          type="text" 
          placeholder="Cari tanggal atau merchant/tipe..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. Area Tabel Dinamis */}
      <div style={styles.tableContainer}>
        {activeTab === 'food' ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Merchant</th>
                <th style={styles.th}>Pendapatan Bersih</th>
                <th style={styles.th}>Kasir</th>
              </tr>
            </thead>
            <tbody>
              {filteredFood.length > 0 ? filteredFood.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.tanggal_order}</td>
                  <td style={{...styles.td, fontWeight: '600', color: '#2563eb'}}>{item.merchant}</td>
                  <td style={styles.td}>Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}</td>
                  <td style={styles.td}>{item.diinput_oleh}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" style={{...styles.td, textAlign: 'center'}}>Data tidak ditemukan</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Tipe QRIS</th>
                <th style={styles.th}>Nominal Masuk</th>
                <th style={styles.th}>Kasir</th>
              </tr>
            </thead>
            <tbody>
              {filteredQris.length > 0 ? filteredQris.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.tanggal}</td>
                  <td style={{...styles.td, fontWeight: '600', color: '#10b981'}}>{item.tipe}</td>
                  <td style={styles.td}>Rp {parseInt(item.nominal).toLocaleString('id-ID')}</td>
                  <td style={styles.td}>{item.diinput_oleh}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" style={{...styles.td, textAlign: 'center'}}>Data tidak ditemukan</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
