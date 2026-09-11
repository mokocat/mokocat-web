import { useEffect, useState } from 'react';
import DataTablesCard from './components/DataTablesCard';

export default function App() {
  const [dataFood, setDataFood] = useState([]);
  const [dataQris, setDataQris] = useState([]);

  useEffect(() => {
    fetch('https://mokocat.app/api.php')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          setDataFood(result.data_food);
          setDataQris(result.data_qris);
        }
      });
  }, []);

  return (
  <div style={{ 
      padding: '30px', 
      minHeight: '100vh',
      // Jika dark mode terdeteksi, warnai bg jadi hitam slate (#0f172a)
      background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#f8f9fa' 
  }}>
    <DataTablesCard dataFood={dataFood} dataQris={dataQris} />
  </div>
);
}
