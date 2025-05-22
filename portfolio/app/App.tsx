import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Add a navbar here if you want */}
      <Outlet />
      {/* Add a footer here if needed */}
    </div>
  );
}
