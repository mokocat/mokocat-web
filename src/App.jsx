import { useEffect, useState } from 'react'
// Mengimpor komponen balok Lego yang baru kita buat
import TabelFood from './components/TabelFood' 

function App() {
  const [dataFood, setDataFood] = useState([])
  const [dataQris, setDataQris] = useState([]) // Siap untuk menampung data QRIS nanti

  useEffect(() => {
    fetch('https://mokocat.app/api.php')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          setDataFood(result.data_food)
          setDataQris(result.data_qris)
        }
      })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Dasbor MokoCat</h2>
      
      <h3>Riwayat Penjualan Makanan</h3>
      {/* Memanggil komponen dan mengirimkan isi dataFood ke dalamnya */}
      <TabelFood data={dataFood} />
      
    </div>
  )
}

export default App
