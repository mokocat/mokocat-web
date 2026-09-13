import { useEffect, useState } from 'react';
import StatCards from './components/StatCards';
import DataTable from './components/DataTable';
import { fetchDashboardData } from './services/api'; // Mengimpor API Service
import './index.css'; 

export default function App() {
  const [dataFood, setDataFood] = useState([]);
  const [dataQris, setDataQris] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi Manajemen Tema Gelap Otomatis
  useEffect(() => {
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

  // Fungsi Pemanggilan API Baru (Aman & Menggunakan POST)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await fetchDashboardData();
      
      if (res && res.status === 'success') {
        setDataFood(res.data_food);
        setDataQris(res.data_qris);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Dasbor MokoCat</h2>
      
            {/* Kirim isLoading ke StatCards */}
      <StatCards dataFood={dataFood} dataQris={dataQris} isLoading={isLoading} />
      
      <DataTable dataFood={dataFood} dataQris={dataQris} isLoading={isLoading} />
    </div>
  );
}
