const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchDashboardData = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ action: 'get_dashboard' })
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return null;
  }
};
