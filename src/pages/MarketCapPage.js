import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import MarketCapSection from "../components/MarketCapSection";

const MarketCapPage = () => {
  const [stocks, setStocks] = useState({ nasStocks: [], nysStocks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/stocks/market-cap-ranking").then((response) => {
      setStocks(response.data); // 받은 데이터 저장
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Market Cap Ranking</h1>
      <div style={{ display: "flex" }}>
        <MarketCapSection title="NAS" stocks={stocks.nasStocks} />
        <MarketCapSection title="NYS" stocks={stocks.nysStocks} />
      </div>
    </div>
  );
};

export default MarketCapPage;
