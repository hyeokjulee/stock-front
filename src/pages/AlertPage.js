import AlertForm from "../components/AlertForm";

const AlertPage = () => {
  return (
    <div>
      <h1>Target Price Alert</h1>
      <div style={{ display: "flex" }}>
        <AlertForm />
      </div>
    </div>
  );
};

export default AlertPage;
