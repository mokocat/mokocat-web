import { useEffect, useState } from 'react';
import StatCards from './components/StatCards';
import DataTable from './components/DataTable';
import './index.css'; // Mengimpor CSS Global

export default function App() {
  const [dataFood, setDataFood] = useState([]);
  const [dataQris, setDataQris] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi Manajemen Tema Gelap Otomatis
    const updateTheme = (isDark) => {
      if (isDark) document.body.classList.add('dark-theme');
      else document.body.classList.remove('dark-theme');
    };

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    updateTheme(media.matches);

    const handler = (e) => updateTheme(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://mokocat.app/api.php')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setDataFood(res.data_food);
          setDataQris(res.data_qris);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Dasbor MokoCat</h2>
      
      <StatCards dataFood={dataFood} dataQris={dataQris} />
      
      <DataTable dataFood={dataFood} dataQris={dataQris} isLoading={isLoading} />
    </div>
  );
}
