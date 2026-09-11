import React, { useState, useEffect } from 'react';

const getMerchantStyle = (m, d) => {
  const s = {
    ShopeeFood: { bg: d ? '#7c2d12' : '#ffedd5', color: d ? '#fdba74' : '#ea580c' },
    GoFood: { bg: d ? '#7f1d1d' : '#fee2e2', color: d ? '#fca5a5' : '#dc2626' },
    GrabFood: { bg: d ? '#14532d' : '#dcfce3', color: d ? '#86efac' : '#16a34a' }
  };
  return s[m] || { bg: d ? '#334155' : '#f1f5f9', color: d ? '#cbd5e1' : '#475569' };
};

const getStyles = (d) => {
  const c = {
    bg: d ? '#1e293b' : '#ffffff', border: d ? '#334155' : '#e2e8f0', text: d ? '#f8fafc' : '#334155',
    muted: d ? '#94a3b8' : '#64748b', hover: d ? '#0f172a' : '#f8fafc', input: d ? '#0f172a' : '#ffffff',
    primary: d ? '#60a5fa' : '#2563eb'
  };
  return {
    card: { background: c.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${c.border}`, transition: 'all 0.3s' },
    tabs: { display: 'flex', justifyContent: 'center', borderBottom: `1px solid ${c.border}`, marginBottom: '16px', gap: '24px' },
    btn: (a) => ({ padding: '8px 12px', cursor: 'pointer', background: 'transparent', border: 'none', borderBottom: a ? `2px solid ${c.primary}` : '2px solid transparent', color: a ? c.primary : c.muted, fontWeight: a ? '600' : '500', fontSize: '14px', marginBottom: '-1px' }),
    tool: { display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' },
    input: { padding: '10px 16px', borderRadius: '8px', background: c.input, color: c.text, border: `1px solid ${c.border}`, fontSize: '14px', width: '100%', maxWidth: '250px', outline: 'none' },
    wrap: { borderRadius: '8px', border: `1px solid ${c.border}`, overflow: 'hidden', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: (al) => ({ padding: '12px 16px', background: c.hover, color: c.muted, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', textAlign: al, borderBottom: `1px solid ${c.border}`, whiteSpace: 'nowrap' }),
    td: (al) => ({ padding: '12px 16px', fontSize: '13px', color: c.text, borderBottom: `1px solid ${c.border}`, textAlign: al, whiteSpace: 'nowrap' }),
    tr: (e) => ({ cursor: 'pointer', background: e ? c.hover : 'transparent' }),
    icon: (e) => ({ display: 'inline-block', transition: 'transform 0.3s', transform: e ? 'rotate(180deg)' : 'rotate(0deg)', color: c.muted, fontSize: '10px', marginRight: '8px' }),
    expWrap: (e) => ({ display: 'grid', gridTemplateRows: e ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s' }),
    expIn: { overflow: 'hidden' },
    expArea: { padding: '0 16px 16px 16px', whiteSpace: 'normal', borderBottom: `1px solid ${c.border}` },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', background: c.bg, padding: '16px', borderRadius: '8px', border: `1px solid ${c.border}` },
    item: { display: 'flex', flexDirection: 'column', gap: '4px' },
    lbl: { fontSize: '11px', color: c.muted, fontWeight: '600', textTransform: 'uppercase' },
    val: { fontSize: '13px', color: c.text, fontWeight: '500' },
    badge: { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block' },
    bot: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', gap: '12px' },
    info: { fontSize: '13px', color: c.muted },
    pag: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' },
    nav: (ds) => ({ background: 'transparent', border: 'none', color: ds ? (d ? '#475569' : '#cbd5e1') : c.muted, cursor: ds ? 'default' : 'pointer', fontSize: '14px', fontWeight: '600', padding: '4px 8px' }),
    sel: { padding: '4px 12px', borderRadius: '6px', border: `1px solid ${c.primary}`, background: c.input, fontSize: '13px', fontWeight: '500', color: c.text, outline: 'none', textAlign: 'center' }
  };
};

export default function DataTablesCard({ dataFood, dataQris, isDarkMode }) {
  const s = getStyles(isDarkMode);
  const [tab, setTab] = useState('food');
  const [search, setSearch] = useState('');
  const [exp, setExp] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => { setPage(1); setExp(null); }, [tab, search, limit]);

  const data = (tab === 'food' ? dataFood : dataQris).filter(i => 
    (i.merchant || i.tipe)?.toLowerCase().includes(search.toLowerCase()) || 
    (i.tanggal_order || i.tanggal)?.includes(search) || 
    i.status?.toLowerCase().includes(search.toLowerCase())
  );

  const total = Math.ceil(data.length / limit);
  const sliced = data.slice((page - 1) * limit, page * limit);
  const start = (page - 1) * limit;

  const f = (n) => `Rp ${parseInt(n).toLocaleString('id-ID')}`;

  return (
    <div style={s.card}>
      <div style={s.tabs}>
        <button style={s.btn(tab === 'food')} onClick={() => setTab('food')}>🍔 Penjualan Makanan</button>
        <button style={s.btn(tab === 'qris')} onClick={() => setTab('qris')}>📱 Transaksi QRIS</button>
      </div>
      <div style={s.tool}>
        <input type="text" placeholder="Cari data..." style={s.input} value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={s.wrap}>
        <table style={s.table}>
          <thead>
            {tab === 'food' ? (
              <tr><th style={s.th('center')}>No</th><th style={s.th('center')}>Tanggal</th><th style={s.th('center')}>Merchant</th><th style={s.th('right')}>Pendapatan</th><th style={s.th('center')}>Status</th></tr>
            ) : (
              <tr><th style={s.th('center')}>No</th><th style={s.th('center')}>Tanggal</th><th style={s.th('center')}>Tipe QRIS</th><th style={s.th('right')}>Nominal</th></tr>
            )}
          </thead>
          <tbody>
            {sliced.length > 0 ? sliced.map((i, idx) => {
              const isExp = exp === i.id;
              return (
                <React.Fragment key={i.id}>
                  <tr style={s.tr(isExp)} onClick={() => setExp(isExp ? null : i.id)}>
                    <td style={s.td('center')}><span style={s.icon(isExp)}>▼</span>{start + idx + 1}</td>
                    {tab === 'food' ? (
                      <>
                        <td style={s.td('center')}>{i.tanggal_order}</td>
                        <td style={s.td('center')}><span style={{...s.badge, ...getMerchantStyle(i.merchant, isDarkMode)}}>{i.merchant}</span></td>
                        <td style={{...s.td('right'), fontWeight: '600'}}>{f(i.pendapatan_bersih)}</td>
                        <td style={s.td('center')}><span style={{...s.badge, background: i.status === 'Transferred' ? (isDarkMode ? '#14532d' : '#dcfce3') : (isDarkMode ? '#334155' : '#f1f5f9'), color: i.status === 'Transferred' ? (isDarkMode ? '#86efac' : '#16a34a') : (isDarkMode ? '#cbd5e1' : '#64748b')}}>{i.status}</span></td>
                      </>
                    ) : (
                      <>
                        <td style={s.td('center')}>{i.tanggal}</td>
                        <td style={s.td('center')}><span style={{...s.badge, background: isDarkMode ? '#14532d' : '#ecfdf5', color: isDarkMode ? '#6ee7b7' : '#059669'}}>{i.tipe}</span></td>
                        <td style={{...s.td('right'), fontWeight: '600'}}>{f(i.nominal)}</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td colSpan={tab === 'food' ? "5" : "4"} style={{ padding: 0, border: 'none' }}>
                      <div style={s.expWrap(isExp)}>
                        <div style={s.expIn}>
                          <div style={s.expArea}>
                            <div style={s.grid}>
                              {tab === 'food' ? (
                                <>
                                  <div style={s.item}><span style={s.lbl}>Kotor</span><span style={s.val}>{f(i.pendapatan_kotor)}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Warung</span><span style={s.val}>{f(i.pendapatan_warung)}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Diskon</span><span style={s.val}>{f(i.promo_diskon)}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Ongkir</span><span style={s.val}>{f(i.promo_ongkir)}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Plus/Minus</span><span style={{...s.val, color: parseInt(i.plus_minus) < 0 ? (isDarkMode ? '#f87171' : '#ef4444') : (isDarkMode ? '#34d399' : '#10b981')}}>{f(i.plus_minus)}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Waktu Input</span><span style={s.val}>{i.waktu_dibuat}</span></div>
                                </>
                              ) : (
                                <>
                                  <div style={s.item}><span style={s.lbl}>Waktu Input</span><span style={s.val}>{i.waktu_dibuat}</span></div>
                                  <div style={s.item}><span style={s.lbl}>Diinput Oleh</span><span style={s.val}>👤 {i.diinput_oleh}</span></div>
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
            }) : <tr><td colSpan="5" style={{...s.td('center'), padding: '32px'}}>Data tidak ditemukan</td></tr>}
          </tbody>
        </table>
      </div>
      <div style={s.bot}>
        <div style={s.info}>Menampilkan <b>{sliced.length > 0 ? start + 1 : 0} - {start + sliced.length}</b> dari <b>{data.length}</b> data</div>
        <div style={s.pag}>
          <button style={s.nav(page === 1)} onClick={() => setPage(1)} disabled={page === 1}>|&lt;</button>
          <button style={s.nav(page === 1)} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
          <select style={s.sel} value={limit} onChange={e => setLimit(Number(e.target.value))}>
            <option value={5}>5</option><option value={8}>8</option><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
          </select>
          <button style={s.nav(page === total || total === 0)} onClick={() => setPage(p => Math.min(total || 1, p + 1))} disabled={page === total || total === 0}>&gt;</button>
          <button style={s.nav(page === total || total === 0)} onClick={() => setPage(total || 1)} disabled={page === total || total === 0}>&gt;|</button>
        </div>
      </div>
    </div>
  );
}
