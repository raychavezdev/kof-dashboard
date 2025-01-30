const Dashboard = ({ logout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Salir</button>
    </div>
  );
};

export default Dashboard;
