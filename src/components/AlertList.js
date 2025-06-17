import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { useAlertStore } from "../store/useAlertStore";
import styles from "./AlertList.module.css";

export default function AlertList() {
  const refreshCount = useAlertStore((state) => state.refreshCount);

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      const response = await axiosInstance.get("/stock-alerts");
      setAlerts(response.data);
    } catch (err) {
      setError("알림을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true); // 삭제 중 로딩 표시

    try {
      await axiosInstance.delete(`/stock-alerts/${id}`);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    } catch {
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [refreshCount]); // refreshCount가 바뀔 때마다 호출

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={styles.alertList}>
      {alerts.length === 0 ? (
        <p>등록된 알림이 없습니다.</p>
      ) : (
        alerts.map((alert) => (
          <li key={alert.id} className={styles.alertItem}>
            <div>
              <strong>종목:</strong> {alert.tickerSymbol} ({alert.exchangeCode})
            </div>
            <div>
              <strong>목표가: </strong>
              {Number(alert.targetPrice).toFixed(2)} (USD)
            </div>
            <div>
              <strong>현재가: </strong>
              {Number(alert.currentPrice).toFixed(2)} (USD)
            </div>
            <div>
              <strong>등록일: </strong>
              {new Date(alert.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>알림 발송일: </strong>
              {alert.alertSentAt
                ? new Date(alert.alertSentAt).toLocaleString()
                : "아직 발송되지 않음"}
            </div>
            <button onClick={() => handleDelete(alert.id)} className="btn">
              삭제
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
