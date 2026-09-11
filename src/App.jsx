import { useEffect, useState } from 'react';
import DataTablesCard from './components/DataTablesCard';

export default function App() {
  const [dataFood, setDataFood] = useState([]);
  const [dataQris, setDataQris] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(media.matches);
    const handler = (e) => setIsDarkMode(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f8f9fa';
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.margin = '0';
  }, [isDarkMode]);

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: isDarkMode ? '#f8fafc' : '#0f172a', transition: 'color 0.3s' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Dasbor MokoCat</h2>
      <DataTablesCard dataFood={dataFood} dataQris={dataQris} isDarkMode={isDarkMode} isLoading={isLoading} />
    </div>
  );
}
