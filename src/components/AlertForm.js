import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { useAlertStore } from "../store/useAlertStore";
import styles from "./AlertForm.module.css";

export default function AlertForm() {
  const incrementRefresh = useAlertStore((state) => state.incrementRefresh);

  const [tickerSymbol, setTickerSymbol] = useState("");
  const [exchangeCode, setExchangeCode] = useState("NAS");
  const [targetPrice, setTargetPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);
    const requestBody = { tickerSymbol, exchangeCode, targetPrice };

    try {
      await axiosInstance.post("/stock-alerts", requestBody);
      setTargetPrice("");
      incrementRefresh(); // 등록 성공 후 refreshCount 증가
    } catch (error) {
      error.response?.status === 400
        ? alert(
            "해당 거래소에 존재하지 않는 티커 심볼입니다. 입력한 내용을 다시 확인해 주세요."
          )
        : alert("서버 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
      setTickerSymbol("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>Ticker Symbol</label>
        <input
          type="text"
          value={tickerSymbol}
          onChange={(e) => setTickerSymbol(e.target.value.toUpperCase())} // 대문자로 변환
          maxLength={6}
          required
          className={styles.input}
        />
      </div>

      <div>
        <label className={styles.label}>Exchange Code</label>
        <select
          value={exchangeCode}
          onChange={(e) => setExchangeCode(e.target.value)}
          className={styles.select}
        >
          <option value="NAS">NASDAQ</option>
          <option value="NYS">NYSE</option>
        </select>
      </div>

      <div>
        <label className={styles.label}>Target Price (USD)</label>
        <input
          type="number"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          step="0.01"
          min="0.01"
          max="999999"
          required
          className={styles.input}
        />
      </div>

      <button type="submit" className="btn" disabled={isSubmitting}>
        등록
      </button>
    </form>
  );
}
