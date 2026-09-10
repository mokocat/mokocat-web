import { useEffect, useState } from 'react'

function App() {
  const [dataFood, setDataFood] = useState([])

    useEffect(() => {
        // Ganti URL ini dengan URL API PHP di cPanel kamu
            fetch('https://mokocat.app/api.php')
                  .then(res => res.json())
                        .then(result => {
                                if (result.status === 'success') {
                                          setDataFood(result.data_food)
                                                  }
                                                        })
                                                          }, [])

                                                            return (
                                                                <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                                                                      <h2>Dasbor MokoCat</h2>
                                                                            <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
                                                                                    <thead style={{ background: '#f4f4f4' }}>
                                                                                              <tr>
                                                                                                          <th>Tanggal</th>
                                                                                                                      <th>Merchant</th>
                                                                                                                                  <th>Pendapatan</th>
                                                                                                                                            </tr>
                                                                                                                                                    </thead>
                                                                                                                                                            <tbody>
                                                                                                                                                                      {dataFood.map(item => (
                                                                                                                                                                                  <tr key={item.id}>
                                                                                                                                                                                                <td>{item.tanggal_order}</td>
                                                                                                                                                                                                              <td>{item.merchant}</td>
                                                                                                                                                                                                                            <td>Rp {item.pendapatan_bersih}</td>
                                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                          </tbody>
                                                                                                                                                                                                                                                                </table>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                      export default App
