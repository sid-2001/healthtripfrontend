import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminPanelPage from "./Pages/Admin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AdminPanelPage />
    </>
  );
}

export default App;
