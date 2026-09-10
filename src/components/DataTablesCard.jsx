import React, { useState, useEffect } from 'react';

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px',
    gap: '24px'
  },
  tabBtn: (isActive) => ({
    padding: '8px 12px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
    color: isActive ? '#2563eb' : '#64748b',
    fontWeight: isActive ? '600' : '500',
    fontSize: '14px',
    transition: 'all 0.2s',
    marginBottom: '-1px'
  }),
  // Desain Toolbar Baru (Sesuai Gambar)
  toolbarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  infoText: {
    fontSize: '13px',
    color: '#64748b'
  },
  searchInput: {
    padding: '12px 16px',
    borderRadius: '8px',
    background: '#3f3f46', // Warna gelap sesuai gambar
    color: '#ffffff',
    border: 'none',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box'
  },
  tableWrapper: {
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: (align = 'left') => ({
    padding: '12px 16px',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: align,
    borderBottom: '1px solid #e2e8f0',
    whiteSpace: 'nowrap'
  }),
  td: (align = 'left') => ({
    padding: '12px 16px',
    fontSize: '13px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9',
    textAlign: align,
    whiteSpace: 'nowrap'
  }),
  trMain: (isExpanded) => ({
    cursor: 'pointer',
    background: isExpanded ? '#f8fafc' : '#ffffff',
    transition: 'background 0.2s',
  }),
  // Area Expand kembali normal agar teks tidak terpotong
  expandedArea: {
    background: '#f8fafc',
    padding: '0 16px 16px 16px',
    borderBottom: '1px solid #e2e8f0',
    whiteSpace: 'normal'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
    background: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    textAlign: 'left'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  detailValue: {
    fontSize: '13px',
    color: '#0f172a',
    fontWeight: '500'
  },
  badgeBase: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  },
  iconRotate: (isExpanded) => ({
    display: 'inline-block',
    transition: 'transform 0.2s',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    color: '#94a3b8',
    fontSize: '10px',
    marginRight: '8px' // Panah berdampingan dengan Nomor
  }),
  // Desain Paginasi Minimalis (Sesuai Gambar RDTC)
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '20px'
  },
  iconBtn: (disabled) => ({
    background: 'transparent',
    border: 'none',
    color: disabled ? '#cbd5e1' : '#94a3b8',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    padding: '4px 8px'
  }),
  pageSelect: {
    padding: '6px 16px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: '14px',
    color: '#0f172a',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none', // Menghilangkan gaya bawaan browser jika memungkinkan
    textAlign: 'center'
  }
};

const getMerchantStyle = (merchant) => {
  switch (merchant) {
    case 'ShopeeFood': return { bg: '#ffedd5', color: '#ea580c' }; 
    case 'GoFood': return { bg: '#fee2e2', color: '#dc2626' }; 
    case 'GrabFood': return { bg: '#dcfce3', color: '#16a34a' }; 
    default: return { bg: '#f1f5f9', color: '#475569' }; 
  }
};

export default function DataTablesCard({ dataFood, dataQris }) {
  const [activeTab, setActiveTab] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedRow(null);
  }, [activeTab, searchTerm]);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

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
  const startNumber = (currentPage - 1) * itemsPerPage;

  return (
    <div style={styles.card}>
      
      <div style={styles.tabContainer}>
        <button style={styles.tabBtn(activeTab === 'food')} onClick={() => setActiveTab('food')}>
          🍔 Penjualan Makanan
        </button>
        <button style={styles.tabBtn(activeTab === 'qris')} onClick={() => setActiveTab('qris')}>
          📱 Transaksi QRIS
        </button>
      </div>

      {/* STRUKTUR PENCARIAN BARU */}
      <div style={styles.toolbarWrapper}>
        <div style={styles.infoText}>
          Menampilkan <b>{paginatedData.length > 0 ? startNumber + 1 : 0} - {startNumber + paginatedData.length}</b> dari <b>{activeData.length}</b> data
        </div>
        <input 
          type="text" 
          placeholder="Cari data..." 
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
                <th style={styles.th('center')}>No</th>
                <th style={styles.th('center')}>Tanggal</th>
                <th style={styles.th('center')}>Merchant</th>
                <th style={styles.th('right')}>Pendapatan</th>
                <th style={styles.th('center')}>Status</th>
              </tr>
            ) : (
              <tr>
                <th style={styles.th('center')}>No</th>
                <th style={styles.th('center')}>Tanggal</th>
                <th style={styles.th('center')}>Tipe QRIS</th>
                <th style={styles.th('right')}>Nominal</th>
              </tr>
            )}
          </thead>
          <tbody>
            {paginatedData.length > 0 ? paginatedData.map((item, index) => {
              const isExpanded = expandedRow === item.id;
              
              return (
                <React.Fragment key={item.id}>
                  <tr style={styles.trMain(isExpanded)} onClick={() => toggleRow(item.id)}>
                    <td style={styles.td('center')}>
                      <span style={styles.iconRotate(isExpanded)}>▼</span>
                      {startNumber + index + 1}
                    </td>
                    
                    {activeTab === 'food' ? (
                      <>
                        <td style={styles.td('center')}>{item.tanggal_order}</td>
                        <td style={styles.td('center')}>
                          <span style={{ ...styles.badgeBase, background: getMerchantStyle(item.merchant).bg, color: getMerchantStyle(item.merchant).color }}>
                            {item.merchant}
                          </span>
                        </td>
                        <td style={{...styles.td('right'), fontWeight: '600'}}>
                          Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}
                        </td>
                        <td style={styles.td('center')}>
                          <span style={{
                            ...styles.badgeBase,
                            background: item.status === 'Transferred' ? '#dcfce3' : '#f1f5f9',
                            color: item.status === 'Transferred' ? '#16a34a' : '#64748b',
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={styles.td('center')}>{item.tanggal}</td>
                        <td style={styles.td('center')}>
                          <span style={{ ...styles.badgeBase, background: '#ecfdf5', color: '#059669' }}>
                            {item.tipe}
                          </span>
                        </td>
                        <td style={{...styles.td('right'), fontWeight: '600'}}>
                          Rp {parseInt(item.nominal).toLocaleString('id-ID')}
                        </td>
                      </>
                    )}
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={activeTab === 'food' ? "5" : "4"} style={{ padding: 0, border: 'none' }}>
                        <div style={styles.expandedArea}>
                          <div style={styles.detailsGrid}>
                            {activeTab === 'food' ? (
                              <>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Kotor</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.pendapatan_kotor).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Warung</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.pendapatan_warung).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Diskon</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.promo_diskon).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Ongkir</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.promo_ongkir).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Plus/Minus</span>
                                  <span style={{...styles.detailValue, color: parseInt(item.plus_minus) < 0 ? '#ef4444' : '#10b981'}}>
                                    Rp {parseInt(item.plus_minus).toLocaleString('id-ID')}
                                  </span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Waktu</span>
                                  <span style={styles.detailValue}>{item.waktu_dibuat}</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Waktu Input</span>
                                  <span style={styles.detailValue}>{item.waktu_dibuat}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Diinput Oleh</span>
                                  <span style={styles.detailValue}>👤 {item.diinput_oleh}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            }) : (
              <tr><td colSpan="5" style={{...styles.td('center'), padding: '32px'}}>Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STRUKTUR PAGINASI BARU */}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button 
            style={styles.iconBtn(currentPage === 1)} 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
          >
            |&lt;
          </button>
          <button 
            style={styles.iconBtn(currentPage === 1)} 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          <select 
            value={currentPage} 
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            style={styles.pageSelect}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <button 
            style={styles.iconBtn(currentPage === totalPages)} 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button 
            style={styles.iconBtn(currentPage === totalPages)} 
            onClick={() => setCurrentPage(totalPages)} 
            disabled={currentPage === totalPages}
          >
            &gt;|
          </button>
        </div>
      )}
    </div>
  );
}
