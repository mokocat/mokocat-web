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
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '13px',
    width: '100%',
    maxWidth: '250px',
    outline: 'none'
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
  // Desain Expand Area yang dikembalikan seperti semula (Anti terpotong)
  expandedArea: {
    background: '#f8fafc',
    padding: '0 16px 16px 16px',
    borderBottom: '1px solid #e2e8f0',
    whiteSpace: 'normal' // Mengizinkan teks turun ke bawah (wrap)
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
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    color: '#94a3b8',
    fontSize: '10px',
    marginRight: '8px' // Memberi jarak antara panah dan angka nomor
  }),
  // Desain Paginasi Baru
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  pageSelect: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
    marginLeft: '8px'
  },
  navBtn: (disabled) => ({
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    background: disabled ? '#f8fafc' : '#ffffff',
    color: disabled ? '#94a3b8' : '#0f172a',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  })
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
  const [expandedRow, setExpandedRow] = useState(null);
  
  // State Paginasi Baru
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
    setCurrentPage(1);
    setExpandedRow(null);
  }, [activeTab, searchTerm, itemsPerPage]);

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

      <div style={styles.toolbar}>
        <div style={{ fontSize: '13px', color: '#64748b' }}>
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
                  {/* BARIS UTAMA */}
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

                  {/* BARIS EXPAND (DETAIL) */}
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

      {/* AREA PAGINASI BARU */}
      <div style={styles.paginationWrapper}>
        <div style={{ fontSize: '13px', color: '#64748b' }}>
          Tampilkan
          <select 
            style={styles.pageSelect} 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 Baris</option>
            <option value={10}>10 Baris</option>
            <option value={25}>25 Baris</option>
            <option value={50}>50 Baris</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            style={styles.navBtn(currentPage === 1)} 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &lt; Sebelumnya
          </button>
          
          <span style={{ fontSize: '13px', color: '#64748b', margin: '0 8px' }}>
            Hal {currentPage} / {totalPages || 1}
          </span>
          
          <button 
            style={styles.navBtn(currentPage === totalPages || totalPages === 0)} 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Selanjutnya &gt;
          </button>
        </div>
      </div>

    </div>
  );
}
