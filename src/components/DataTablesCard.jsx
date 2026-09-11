import React, { useState, useEffect } from 'react';

// Fungsi penentu warna Merchant dinamis untuk Light/Dark mode
const getMerchantStyle = (merchant, isDark) => {
  switch (merchant) {
    case 'ShopeeFood': 
      return { bg: isDark ? '#7c2d12' : '#ffedd5', color: isDark ? '#fdba74' : '#ea580c' }; 
    case 'GoFood': 
      return { bg: isDark ? '#7f1d1d' : '#fee2e2', color: isDark ? '#fca5a5' : '#dc2626' }; 
    case 'GrabFood': 
      return { bg: isDark ? '#14532d' : '#dcfce3', color: isDark ? '#86efac' : '#16a34a' }; 
    default: 
      return { bg: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#cbd5e1' : '#475569' }; 
  }
};

// Objek gaya diubah menjadi fungsi yang menerima parameter isDark
const getStyles = (isDark) => {
  // Palet Warna Dinamis
  const colors = {
    cardBg: isDark ? '#1e293b' : '#ffffff',
    border: isDark ? '#334155' : '#e2e8f0',
    textMain: isDark ? '#f8fafc' : '#334155',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    bgHover: isDark ? '#0f172a' : '#f8fafc',
    bgHeader: isDark ? '#0f172a' : '#f8fafc',
    inputBg: isDark ? '#0f172a' : '#ffffff',
    primary: isDark ? '#60a5fa' : '#2563eb'
  };

  return {
    card: {
      background: colors.cardBg,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.border}`,
      transition: 'background-color 0.3s, border-color 0.3s' // Transisi halus saat ganti tema
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: `1px solid ${colors.border}`,
      marginBottom: '16px',
      gap: '24px'
    },
    tabBtn: (isActive) => ({
      padding: '8px 12px',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
      color: isActive ? colors.primary : colors.textMuted,
      fontWeight: isActive ? '600' : '500',
      fontSize: '14px',
      transition: 'all 0.2s',
      marginBottom: '-1px'
    }),
    toolbarWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '16px'
    },
    searchInput: {
      padding: '10px 16px',
      borderRadius: '8px',
      background: colors.inputBg,
      color: colors.textMain,
      border: `1px solid ${colors.border}`,
      fontSize: '14px',
      width: '100%',
      maxWidth: '250px',
      outline: 'none',
      transition: 'all 0.3s'
    },
    tableWrapper: {
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: (align = 'left') => ({
      padding: '12px 16px',
      background: colors.bgHeader,
      color: colors.textMuted,
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      textAlign: align,
      borderBottom: `1px solid ${colors.border}`,
      whiteSpace: 'nowrap',
      transition: 'background-color 0.3s'
    }),
    td: (align = 'left') => ({
      padding: '12px 16px',
      fontSize: '13px',
      color: colors.textMain,
      borderBottom: `1px solid ${colors.border}`,
      textAlign: align,
      whiteSpace: 'nowrap',
      transition: 'color 0.3s'
    }),
    trMain: (isExpanded) => ({
      cursor: 'pointer',
      background: isExpanded ? colors.bgHover : 'transparent',
      transition: 'background-color 0.2s',
    }),
    iconRotate: (isExpanded) => ({
      display: 'inline-block',
      transition: 'transform 0.3s ease',
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
      color: colors.textMuted,
      fontSize: '10px',
      marginRight: '8px'
    }),
    expandAnimatedWrapper: (isExpanded) => ({
      display: 'grid',
      gridTemplateRows: isExpanded ? '1fr' : '0fr',
      transition: 'grid-template-rows 0.3s ease-in-out',
      background: colors.bgHover
    }),
    expandInner: {
      overflow: 'hidden'
    },
    expandedArea: {
      padding: '0 16px 16px 16px',
      whiteSpace: 'normal',
      borderBottom: `1px solid ${colors.border}`
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px',
      background: colors.cardBg,
      padding: '16px',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      textAlign: 'left',
      transition: 'background-color 0.3s'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    detailLabel: {
      fontSize: '11px',
      color: colors.textMuted,
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    detailValue: {
      fontSize: '13px',
      color: colors.textMain,
      fontWeight: '500'
    },
    badgeBase: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    },
    bottomArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      gap: '12px'
    },
    infoText: {
      fontSize: '13px',
      color: colors.textMuted
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    },
    iconBtn: (disabled) => ({
      background: 'transparent',
      border: 'none',
      color: disabled ? (isDark ? '#475569' : '#cbd5e1') : colors.textMuted,
      cursor: disabled ? 'default' : 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      padding: '4px 8px',
      transition: 'color 0.2s'
    }),
    pageSelect: {
      padding: '4px 12px',
      borderRadius: '6px',
      border: `1px solid ${colors.primary}`,
      background: colors.inputBg,
      fontSize: '13px',
      fontWeight: '500',
      color: colors.textMain,
      cursor: 'pointer',
      outline: 'none',
      textAlign: 'center'
    }
  };
};

export default function DataTablesCard({ dataFood, dataQris }) {
  // === STATE UNTUK DARK MODE SENSOR ===
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Mengecek preferensi tema pada sistem/browser saat pertama kali dimuat
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Mendengarkan perubahan tema secara live (jika user mengubah tema HP)
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Memanggil fungsi styles dengan membawa status dark mode
  const styles = getStyles(isDarkMode);

  const [activeTab, setActiveTab] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

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

      <div style={styles.toolbarWrapper}>
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
                          <span style={{ ...styles.badgeBase, background: getMerchantStyle(item.merchant, isDarkMode).bg, color: getMerchantStyle(item.merchant, isDarkMode).color }}>
                            {item.merchant}
                          </span>
                        </td>
                        <td style={{...styles.td('right'), fontWeight: '600'}}>
                          Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}
                        </td>
                        <td style={styles.td('center')}>
                          <span style={{
                            ...styles.badgeBase,
                            background: item.status === 'Transferred' ? (isDarkMode ? '#14532d' : '#dcfce3') : (isDarkMode ? '#334155' : '#f1f5f9'),
                            color: item.status === 'Transferred' ? (isDarkMode ? '#86efac' : '#16a34a') : (isDarkMode ? '#cbd5e1' : '#64748b'),
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={styles.td('center')}>{item.tanggal}</td>
                        <td style={styles.td('center')}>
                          <span style={{ ...styles.badgeBase, background: isDarkMode ? '#14532d' : '#ecfdf5', color: isDarkMode ? '#6ee7b7' : '#059669' }}>
                            {item.tipe}
                          </span>
                        </td>
                        <td style={{...styles.td('right'), fontWeight: '600'}}>
                          Rp {parseInt(item.nominal).toLocaleString('id-ID')}
                        </td>
                      </>
                    )}
                  </tr>

                  <tr>
                    <td colSpan={activeTab === 'food' ? "5" : "4"} style={{ padding: 0, border: 'none' }}>
                      <div style={styles.expandAnimatedWrapper(isExpanded)}>
                        <div style={styles.expandInner}>
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
                                    <span style={{...styles.detailValue, color: parseInt(item.plus_minus) < 0 ? (isDarkMode ? '#f87171' : '#ef4444') : (isDarkMode ? '#34d399' : '#10b981')}}>
                                      Rp {parseInt(item.plus_minus).toLocaleString('id-ID')}
                                    </span>
                                  </div>
                                  <div style={styles.detailItem}>
                                    <span style={styles.detailLabel}>Waktu Input</span>
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
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }) : (
              <tr><td colSpan="5" style={{...styles.td('center'), padding: '32px'}}>Data tidak ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.bottomArea}>
        <div style={styles.infoText}>
          Menampilkan <b>{paginatedData.length > 0 ? startNumber + 1 : 0} - {startNumber + paginatedData.length}</b> dari <b>{activeData.length}</b> data
        </div>

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
            style={styles.pageSelect} 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          
          <button 
            style={styles.iconBtn(currentPage === totalPages || totalPages === 0)} 
            onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))} 
            disabled={currentPage === totalPages || totalPages === 0}
          >
            &gt;
          </button>
          <button 
            style={styles.iconBtn(currentPage === totalPages || totalPages === 0)} 
            onClick={() => setCurrentPage(totalPages || 1)} 
            disabled={currentPage === totalPages || totalPages === 0}
          >
            &gt;|
          </button>
        </div>
      </div>

    </div>
  );
}
