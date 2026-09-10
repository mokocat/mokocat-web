import React, { useState, useEffect } from 'react';

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
    justifyContent: 'center',
    borderBottom: '2px solid #f1f5f9',
    marginBottom: '24px',
    gap: '24px'
  },
  tabBtn: (isActive) => ({
    padding: '10px 16px',
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
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  th: {
    padding: '16px',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'center'
  },
  // Row utama yang bisa diklik
  trMain: (isExpanded) => ({
    cursor: 'pointer',
    background: isExpanded ? '#f8fafc' : '#ffffff',
    transition: 'background 0.2s',
    borderBottom: isExpanded ? 'none' : '1px solid #f1f5f9'
  }),
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#334155',
    textAlign: 'center'
  },
  // Desain area detail yang terbuka
  expandedArea: {
    background: '#f8fafc',
    padding: '0 24px 24px 24px',
    borderBottom: '1px solid #e2e8f0'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '600'
  },
  detailValue: {
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: '500'
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '8px'
  },
  pageNumberBtn: (isActive) => ({
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: isActive ? 'none' : '1px solid #e2e8f0',
    background: isActive ? '#3b82f6' : '#ffffff',
    color: isActive ? '#ffffff' : '#64748b',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  expandIcon: {
    display: 'inline-block',
    transition: 'transform 0.2s',
    color: '#94a3b8',
    marginLeft: '8px',
    fontSize: '12px'
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
  
  // State untuk melacak baris mana yang sedang ditekan
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedRow(null); // Tutup expand saat ganti tab/cari
  }, [activeTab, searchTerm]);

  // Fungsi untuk buka/tutup baris
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
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Menampilkan <b>{paginatedData.length > 0 ? startNumber + 1 : 0}</b> - <b>{startNumber + paginatedData.length}</b> dari <b>{activeData.length}</b>
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
                <th style={styles.th}>No</th>
                <th style={styles.th}>Tanggal Order</th>
                <th style={styles.th}>Merchant</th>
                <th style={styles.th}>Pendapatan Bersih</th>
                <th style={styles.th}>Status</th>
              </tr>
            ) : (
              <tr>
                <th style={styles.th}>No</th>
                <th style={styles.th}>Tanggal</th>
                <th style={styles.th}>Tipe QRIS</th>
                <th style={styles.th}>Nominal Masuk</th>
              </tr>
            )}
          </thead>
          <tbody>
            {paginatedData.length > 0 ? paginatedData.map((item, index) => {
              const isExpanded = expandedRow === item.id;
              
              return (
                <React.Fragment key={item.id}>
                  {/* BARIS UTAMA (BISA DIKLIK) */}
                  <tr style={styles.trMain(isExpanded)} onClick={() => toggleRow(item.id)}>
                    <td style={styles.td}>
                      {startNumber + index + 1}
                      <span style={{...styles.expandIcon, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                        ▼
                      </span>
                    </td>
                    
                    {activeTab === 'food' ? (
                      <>
                        <td style={styles.td}>{item.tanggal_order}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.badgeBase, background: getMerchantStyle(item.merchant).bg, color: getMerchantStyle(item.merchant).color }}>
                            {item.merchant}
                          </span>
                        </td>
                        <td style={{...styles.td, fontWeight: '700', color: '#0f172a'}}>
                          Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badgeBase,
                            background: item.status === 'Transferred' ? '#f0fdf4' : '#f8fafc',
                            color: item.status === 'Transferred' ? '#15803d' : '#64748b',
                            border: '1px solid #e2e8f0'
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={styles.td}>{item.tanggal}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.badgeBase, background: '#ecfdf5', color: '#059669' }}>
                            {item.tipe}
                          </span>
                        </td>
                        <td style={{...styles.td, fontWeight: '700', color: '#0f172a'}}>
                          Rp {parseInt(item.nominal).toLocaleString('id-ID')}
                        </td>
                      </>
                    )}
                  </tr>

                  {/* AREA EXPAND (RINCIAN DETAIL DATABASES) */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={activeTab === 'food' ? "5" : "4"} style={{ padding: 0, borderBottom: '1px solid #f1f5f9' }}>
                        <div style={styles.expandedArea}>
                          <div style={styles.detailsGrid}>
                            
                            {activeTab === 'food' ? (
                              <>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Pendapatan Kotor</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.pendapatan_kotor).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Pendapatan Warung</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.pendapatan_warung).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Promo Diskon</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.promo_diskon).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Promo Ongkir</span>
                                  <span style={styles.detailValue}>Rp {parseInt(item.promo_ongkir).toLocaleString('id-ID')}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Plus/Minus</span>
                                  <span style={{...styles.detailValue, color: parseInt(item.plus_minus) < 0 ? '#ef4444' : '#10b981'}}>
                                    Rp {parseInt(item.plus_minus).toLocaleString('id-ID')}
                                  </span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Waktu Input</span>
                                  <span style={styles.detailValue}>{item.waktu_dibuat}</span>
                                </div>
                                <div style={styles.detailItem}>
                                  <span style={styles.detailLabel}>Diinput Oleh</span>
                                  <span style={styles.detailValue}>👤 {item.diinput_oleh}</span>
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
              <tr><td colSpan="5" style={{...styles.td, padding: '32px'}}>Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

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
