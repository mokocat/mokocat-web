import React from 'react';

const getStyles = (d) => {
  const c = { bg: d ? '#1e293b' : '#ffffff', border: d ? '#334155' : '#e2e8f0', text: d ? '#f8fafc' : '#0f172a', muted: d ? '#94a3b8' : '#64748b', iconBg: d ? '#0f172a' : '#f1f5f9' };
  return {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' },
    card: { background: c.bg, borderRadius: '12px', padding: '20px', border: `1px solid ${c.border}`, transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: d ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.05)' },
    icon: { width: '48px', height: '48px', borderRadius: '12px', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
    info: { display: 'flex', flexDirection: 'column', gap: '4px' },
    lbl: { fontSize: '11px', color: c.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' },
    val: { fontSize: '20px', color: c.text, fontWeight: '800' }
  };
};

export default function SummaryCards({ dataFood, dataQris, isDarkMode }) {
  const s = getStyles(isDarkMode);
  
  const food = dataFood.reduce((a, b) => a + parseInt(b.pendapatan_bersih || 0), 0);
  const qris = dataQris.reduce((a, b) => a + parseInt(b.nominal || 0), 0);
  const trx = dataFood.length + dataQris.length;
  
  const f = (n) => `Rp ${n.toLocaleString('id-ID')}`;

  return (
    <div style={s.grid}>
      <div style={s.card}>
        <div style={s.icon}>🍔</div>
        <div style={s.info}>
          <span style={s.lbl}>Pendapatan Makanan</span>
          <span style={s.val}>{f(food)}</span>
        </div>
      </div>
      <div style={s.card}>
        <div style={s.icon}>📱</div>
        <div style={s.info}>
          <span style={s.lbl}>Pemasukan QRIS</span>
          <span style={s.val}>{f(qris)}</span>
        </div>
      </div>
      <div style={s.card}>
        <div style={s.icon}>🧾</div>
        <div style={s.info}>
          <span style={s.lbl}>Total Transaksi</span>
          <span style={s.val}>{trx} Data</span>
        </div>
      </div>
    </div>
  );
}
