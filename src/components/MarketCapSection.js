const MarketCapSection = ({ title, stocks }) => (
  <div style={{ width: "40%" }}>
    <h2>{title}</h2>
    <ul>
      {stocks.map((stock) => (
        <li key={stock.symbol} style={{ marginBottom: "15px" }}>
          <strong>순위:</strong> {stock.rank}
          <br />
          <strong>종목명:</strong> {stock.name}
          <br />
          <strong>코드:</strong> {stock.symbol}
          <br />
          <strong>현재가:</strong> {parseFloat(stock.lastPrice).toFixed(2)}
          (USD)
          <br />
          <strong>시가총액:</strong> {Number(stock.marketCap).toLocaleString()}
          (USD)
        </li>
      ))}
    </ul>
  </div>
);

export default MarketCapSection;
