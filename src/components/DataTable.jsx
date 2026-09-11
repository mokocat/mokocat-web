import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Utensils, Smartphone, Store, Home, Info, Clock, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const getMerchantClass = (merchant) => {
  const valid = ['ShopeeFood', 'GoFood', 'GrabFood'];
  return valid.includes(merchant) ? `badge-${merchant}` : 'badge-default';
};

export default function DataTable({ dataFood, dataQris, isLoading }) {
  const [tab, setTab] = useState('food');
  const [search, setSearch] = useState('');
  const [exp, setExp] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => { setPage(1); setExp(null); }, [tab, search, limit]);

  const data = (tab === 'food' ? dataFood : dataQris).filter(i => {
    const t1 = String(i.merchant || i.tipe || '').toLowerCase();
    const t2 = String(i.tanggal_order || i.tanggal || '').toLowerCase();
    const t3 = String(i.status || '').toLowerCase();
    const q = search.toLowerCase();
    return t1.includes(q) || t2.includes(q) || t3.includes(q);
  });

  const total = Math.ceil(data.length / limit);
  const sliced = data.slice((page - 1) * limit, page * limit);
  const start = (page - 1) * limit;

  const f = (n) => `Rp ${parseInt(n || 0).toLocaleString('id-ID')}`;

  return (
    <div className="card-container">
      
      <div className="tab-container">
        <button className={`tab-btn ${tab === 'food' ? 'active' : ''}`} onClick={() => setTab('food')}>
          <Utensils size={16} /> Penjualan Makanan
        </button>
        <button className={`tab-btn ${tab === 'qris' ? 'active' : ''}`} onClick={() => setTab('qris')}>
          <Smartphone size={16} /> Transaksi QRIS
        </button>
      </div>

      <div className="toolbar">
        <Search size={16} className="search-icon" />
        <input 
          type="text" 
          placeholder="Cari data..." 
          className="search-input" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {tab === 'food' ? (
              <tr><th>No</th><th>Tanggal</th><th>Merchant</th><th className="right">Pendapatan</th><th>Status</th></tr>
            ) : (
              <tr><th>No</th><th>Tanggal</th><th>Tipe QRIS</th><th className="right">Nominal</th></tr>
            )}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">
                  <div className="loader">
                    <div className="spinner" />
                    <div>Memuat data transaksi...</div>
                  </div>
                </td>
              </tr>
            ) : sliced.length > 0 ? sliced.map((i, idx) => {
              const isExp = exp === i.id;
              
              // LOGIKA KALIMAT ASISTEN (Hanya untuk Food)
              const plusMinus = parseInt(i.plus_minus || 0);
              let insightUntungRugi = null;
              if (plusMinus > 0) {
                insightUntungRugi = <span>Transaksi ini memberikan keuntungan sebesar <span className="text-success">{f(plusMinus)}</span>. </span>;
              } else if (plusMinus < 0) {
                insightUntungRugi = <span>Transaksi ini mengalami kerugian sebesar <span className="text-danger">{f(Math.abs(plusMinus))}</span>. </span>;
              }

              let insightStatus = "";
              if (i.status === 'Pending') insightStatus = <span>Keuangan dari transaksi ini <span className="text-danger">menunggu validasi</span>.</span>;
              else if (i.status === 'Checked') insightStatus = <span>Keuangan dari transaksi ini <span className="text-primary">telah divalidasi</span>.</span>;
              else if (i.status === 'Transferred') insightStatus = <span>Keuangan dari transaksi ini <span className="text-success">telah ditransfer</span>.</span>;
              else insightStatus = <span>Keuangan dari transaksi ini berstatus <b>{i.status}</b>.</span>;

              return (
                <React.Fragment key={i.id}>
                  <tr className={`tr-main ${isExp ? 'expanded' : ''}`} onClick={() => setExp(isExp ? null : i.id)}>
                    <td>
                      <ChevronDown size={14} className={`chevron-icon ${isExp ? 'rotate' : ''}`} />
                      {start + idx + 1}
                    </td>
                    {tab === 'food' ? (
                      <>
                        <td>{i.tanggal_order}</td>
                        <td><span className={`badge ${getMerchantClass(i.merchant)}`}>{i.merchant}</span></td>
                        <td className="right">{f(i.pendapatan_bersih)}</td>
                        <td>
                          <span className={`badge ${i.status === 'Transferred' ? 'badge-success' : 'badge-default'}`}>
                            {i.status}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{i.tanggal}</td>
                        <td><span className="badge badge-Qris">{i.tipe}</span></td>
                        <td className="right">{f(i.nominal)}</td>
                      </>
                    )}
                  </tr>
                  
                  <tr>
                    <td colSpan={tab === 'food' ? "5" : "4"} style={{ padding: 0, border: 'none' }}>
                      <div className={`expand-wrapper ${isExp ? 'open' : ''}`}>
                        <div className="expand-inner">
                          <div className="expand-area">
                            <div className="receipt">
                              
                              {/* HEADER BADGE */}
                              <div className="receipt-header">
                                <span className={`badge ${tab === 'food' ? getMerchantClass(i.merchant) : 'badge-Qris'}`}>
                                  {tab === 'food' ? i.merchant : i.tipe}
                                </span>
                                <span className="badge badge-default">#{i.id}</span>
                              </div>

                              {tab === 'food' ? (
                                <>
                                  {/* BLOK APLIKASI */}
                                  <div className="receipt-section">
                                    <div className="receipt-title-box">
                                      <Store size={14} /> Aplikasi Merchant
                                    </div>
                                    <div className="receipt-row"><span className="receipt-label">Pendapatan Kotor</span><span>{f(i.pendapatan_kotor)}</span></div>
                                    <div className="receipt-row"><span className="receipt-label">Subsidi Promo Diskon</span><span>{f(i.promo_diskon)}</span></div>
                                    <div className="receipt-row"><span className="receipt-label">Subsidi Promo Ongkir</span><span>{f(i.promo_ongkir)}</span></div>
                                  </div>

                                  {/* BLOK INTERNAL */}
                                  <div className="receipt-section" style={{marginBottom: 0}}>
                                    <div className="receipt-title-box">
                                      <Home size={14} /> Internal Warung
                                    </div>
                                    <div className="receipt-row"><span className="receipt-label">Pendapatan Warung</span><span>{f(i.pendapatan_warung)}</span></div>
                                  </div>

                                  <div className="receipt-dash">
                                    <span>TOTAL BERSIH</span>
                                    <span>{f(i.pendapatan_bersih)}</span>
                                  </div>

                                  {/* KOTAK CATATAN (INSIGHT BOX) */}
                                  <div className="insight-box">
                                    <Info size={16} className="insight-icon" />
                                    <div>
                                      {insightUntungRugi}
                                      {insightStatus}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="receipt-row"><span className="receipt-label">Tanggal Transaksi</span><span>{i.tanggal}</span></div>
                                  <div className="receipt-dash">
                                    <span>Total Masuk</span>
                                    <span className="text-success">{f(i.nominal)}</span>
                                  </div>
                                </>
                              )}

                              {/* FOOTER WAKTU */}
                              <div className="receipt-footer">
                                <Clock size={12} style={{flexShrink: 0, marginTop: '3px'}} />
                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' }}>
                                  Dicatat oleh <span className="footer-badge">{i.diinput_oleh}</span> pada <span className="footer-badge">{i.waktu_dibuat}</span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }) : <tr><td colSpan="5">Data tidak ditemukan</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="bottom-area">
        <div className="info-text">
          Menampilkan <b>{sliced.length > 0 ? start + 1 : 0} - {start + sliced.length}</b> dari <b>{data.length}</b> data
        </div>

        <div className="pagination">
          <button className="nav-btn" onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft size={16}/></button>
          <button className="nav-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={16}/></button>
          
          <select className="page-select" value={limit} onChange={e => setLimit(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          
          <button className="nav-btn" onClick={() => setPage(p => Math.min(total || 1, p + 1))} disabled={page === total || total === 0}><ChevronRight size={16}/></button>
          <button className="nav-btn" onClick={() => setPage(total || 1)} disabled={page === total || total === 0}><ChevronsRight size={16}/></button>
        </div>
      </div>

    </div>
  );
}
