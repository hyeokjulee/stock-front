import AlertForm from "../components/AlertForm";
import AlertList from "../components/AlertList";

const AlertPage = () => {
  return (
    <div style={{ maxWidth: "1000px", display: "flex", gap: "40px" }}>
      <div style={{ flex: 1 }}>
        <h2>📈 주가 알림 등록</h2>
        <AlertForm />
      </div>

      <div style={{ flex: 1 }}>
        <h2>🔔 등록된 알림 목록</h2>
        <AlertList />
      </div>
    </div>
  );
};

export default AlertPage;
