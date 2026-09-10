export default function TabelFood({ data }) {
  return (
    <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead style={{ background: '#f4f4f4' }}>
        <tr>
          <th>Tanggal</th>
          <th>Merchant</th>
          <th>Pendapatan</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.tanggal_order}</td>
            <td>{item.merchant}</td>
            <td>Rp {parseInt(item.pendapatan_bersih).toLocaleString('id-ID')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
