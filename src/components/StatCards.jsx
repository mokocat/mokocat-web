import React from 'react';
import { Utensils, Smartphone, ReceiptText } from 'lucide-react';

export default function StatCards({ dataFood, dataQris }) {
  const food = dataFood.reduce((a, b) => a + parseInt(b.pendapatan_bersih || 0), 0);
  const qris = dataQris.reduce((a, b) => a + parseInt(b.nominal || 0), 0);
  const trx = dataFood.length + dataQris.length;
  
  const f = (n) => `Rp ${n.toLocaleString('id-ID')}`;

  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="stat-icon"><Utensils size={24} /></div>
        <div className="stat-info">
          <span className="stat-label">Pendapatan Makanan</span>
          <span className="stat-value">{f(food)}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><Smartphone size={24} /></div>
        <div className="stat-info">
          <span className="stat-label">Pemasukan QRIS</span>
          <span className="stat-value">{f(qris)}</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><ReceiptText size={24} /></div>
        <div className="stat-info">
          <span className="stat-label">Total Transaksi</span>
          <span className="stat-value">{trx} Data</span>
        </div>
      </div>
    </div>
  );
}
