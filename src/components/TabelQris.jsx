const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    border: '1px solid #eaeaea',
    overflowX: 'auto'
  },
  title: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#0f172a'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '12px',
    background: '#f8fafc',
    color: '#475569',
    fontSize: '14px',
    borderBottom: '1px solid #eaeaea'
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9'
  },
  tipe: {
    fontWeight: '600',
    color: '#10b981'
  }
};

export default function TabelQris({ data }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Data Transaksi QRIS</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tanggal</th>
            <th style={styles.th}>Tipe</th>
            <th style={styles.th}>Nominal Masuk</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>{item.tanggal}</td>
              <td style={{ ...styles.td, ...styles.tipe }}>{item.tipe}</td>
              <td style={styles.td}>Rp {parseInt(item.nominal).toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
