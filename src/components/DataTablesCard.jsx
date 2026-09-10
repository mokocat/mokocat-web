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
    marginBottom: '-2px'
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
  // Gaya dasar untuk semua tipe label/badge
  badgeBase: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
    textAlign: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end', // Meratakan tombol angka ke kanan
    alignItems: 'center',
    marginTop: '20px',
    gap: '8px'
  },
  // Tombol angka paginasi berbentuk kotak membulat
  pageNumberBtn: (isActive) => ({
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: isActive ? 'none' : '1px solid #e2e8f0',
    background: isActive ? '#3b82f6' : '#ffffff',
    color: isActive ? '#ffffff' : '#64748b',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
};

// Fungsi cerdas untuk menentukan warna berdasarkan nama merchant
const getMerchantStyle = (merchant) => {
  switch (merchant) {
    case 'ShopeeFood': 
      return { bg: '#ffedd5', color: '#ea580c' }; // Orange
    case 'GoFood': 
      return { bg: '#fee2e2', color: '#dc2626' }; // Merah
    case 'GrabFood': 
      return { bg: '#dcfce3', color: '#16a34a' }; // Hijau
    default: 
      return { bg: '#f1f5f9', color: '#475569' }; // Abu-abu (opsi aman)
  }
};

export default function DataTablesCard({ dataFood, dataQris }) {
  const [activeTab, setActiveTab] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const filteredFood = dataFood.filter(item => 
    item.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal_order.includes(searchTerm) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQris = dataQris.filter(item => 
    item.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tanggal.includes(searchTerm)
  );

  const activeData = activeTab === 'food' ? filteredFood : filteredQris;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  
  const paginatedData = activeData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Menghitung nomor urut agar tetap berlanjut di halaman 2, 3, dst.
  const startNumber = (currentPage - 1) * itemsPerPage;

  return (
    <div style={styles.card}>
      
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

      <div style={styles.toolbar}>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Menampilkan <b>{paginatedData.length > 0 ? startNumber + 1 : 0}</b> - <b>{startNumber + paginatedData.length}</b> dari total <b>{activeData.length}</b> data
        </div>
        <input 
          type="text" 
          placeholder="Ketik untuk mencari..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            {activeTab === 'food' ? (
              <tr>
                <th style={styles.th}>No</th>
                <th style={styles.th}>Tanggal Order</th>
                <th style={styles.th}>Merchant</th>
                <th style={styles.th}>Pendapatan Kotor</th>
                <th style={styles.th}>Pendapatan Bersih</th>
                <th style={styles.th}>Status</th>
              </tr>
            ) : (
              <tr>
                <th style={styles.th}>No</th>
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
                <td style={styles.td}>{startNumber + index + 1}</td>
                
                {/* Logika Kolom Tabel Makanan (trx_food) */}
                {activeTab === 'food' ? (
                  <>
                    <td style={styles.td}>{item.tanggal_order}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badgeBase, 
                        background: getMerchantStyle(item.merchant).bg, 
                        color: getMerchantStyle(item.merchant).color
                      }}>
                        {item.merchant}
                      </span>
                    </td>
                    <td style={styles.td}>
                      Rp {parseInt(item.pendapatan_kotor).toLocaleString('id-ID')}
                    </td>
                    <td style={{...styles.td, fontWeight: '700', color: '#0f172a'}}>
                      Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badgeBase,
                        // Jika statusnya Transferred, warnanya beda dengan Pending/Checked
                        background: item.status === 'Transferred' ? '#f0fdf4' : '#f8fafc',
                        color: item.status === 'Transferred' ? '#15803d' : '#64748b',
                        border: '1px solid #e2e8f0'
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </>
                ) : (
                /* Logika Kolom Tabel QRIS (trx_qris) */
                  <>
                    <td style={styles.td}>{item.tanggal}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badgeBase,
                        background: '#ecfdf5',
                        color: '#059669'
                      }}>
                        {item.tipe}
                      </span>
                    </td>
                    <td style={{...styles.td, fontWeight: '700', color: '#0f172a'}}>
                      Rp {parseInt(item.nominal).toLocaleString('id-ID')}
                    </td>
                    <td style={styles.td}>{item.diinput_oleh}</td>
                  </>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={activeTab === 'food' ? "6" : "5"} style={{...styles.td, textAlign: 'center', padding: '32px'}}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Area Kontrol Paginasi dengan Nomor */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              style={styles.pageNumberBtn(currentPage === page)}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
