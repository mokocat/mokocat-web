import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Utensils, Smartphone, User, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const getMerchantClass = (merchant) => {
  const valid = ['ShopeeFood', 'GoFood', 'GrabFood'];
  return valid.includes(merchant) ? `badge-${merchant}` : 'badge-default';
};

export default function DataTable({ dataFood, dataQris, isLoading }) {
  const [tab, setTab] = useState('food');
  const [search, setSearch] = useState('');
  const [exp, setExp] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default 10 sesuai instruksi

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
                              <div className="receipt-title">{tab === 'food' ? 'Rincian Transaksi' : 'Rincian QRIS'}</div>
                              {tab === 'food' ? (
                                <>
                                  <div className="receipt-item"><span className="receipt-label">Pendapatan Kotor</span><span>{f(i.pendapatan_kotor)}</span></div>
                                  <div className="receipt-item"><span className="receipt-label">Potongan Warung</span><span>{f(i.pendapatan_warung)}</span></div>
                                  <div className="receipt-item"><span className="receipt-label">Promo Diskon</span><span>{f(i.promo_diskon)}</span></div>
                                  <div className="receipt-item"><span className="receipt-label">Promo Ongkir</span><span>{f(i.promo_ongkir)}</span></div>
                                  <div className="receipt-dash">
                                    <span className="receipt-label">Plus / Minus</span>
                                    <span className={parseInt(i.plus_minus || 0) < 0 ? 'text-danger' : 'text-success'}>
                                      {parseInt(i.plus_minus || 0) > 0 ? '+' : ''}{f(i.plus_minus)}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="receipt-item"><span className="receipt-label">Tanggal Transaksi</span><span>{i.tanggal}</span></div>
                                  <div className="receipt-dash">
                                    <span className="receipt-label">Total Masuk</span>
                                    <span className="text-success">{f(i.nominal)}</span>
                                  </div>
                                </>
                              )}
                              <div className="receipt-footer">
                                <span>Waktu: {i.waktu_dibuat}</span>
                                <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><User size={12}/> {i.diinput_oleh}</span>
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
