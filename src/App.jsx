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
    <div style={{ padding: '30px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '24px' }}>Dashboard MokoCat</h1>
      
      {/* Cukup lempar kedua data ke dalam 1 komponen card */}
      <DataTablesCard dataFood={dataFood} dataQris={dataQris} />
      
    </div>
  );
}
