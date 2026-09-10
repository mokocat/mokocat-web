import { useEffect, useState } from 'react';
import TabelFood from './components/TabelFood';
import TabelQris from './components/TabelQris';

const styles = {
  container: {
    padding: '30px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#f8f9fa',
    minHeight: '100vh'
  },
  headerTitle: {
    fontSize: '24px',
    color: '#0f172a',
    margin: '0 0 20px 0'
  },
  // Kunci layout Grid 2 kolom
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    alignItems: 'start' // Mencegah kartu memanjang otomatis jika isi tabel berbeda
  }
};

export default function App() {
  const [dataFood, setDataFood] = useState([]);
  const [dataQris, setDataQris] = useState([]);

  useEffect(() => {
    fetch('https://domainkamu.com/api_food.php')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          setDataFood(result.data_food);
          setDataQris(result.data_qris);
        }
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.headerTitle}>Dashboard Pendapatan</h1>
      
      <div style={styles.grid}>
        <TabelFood data={dataFood} />
        <TabelQris data={dataQris} />
      </div>
      
    </div>
  );
}
