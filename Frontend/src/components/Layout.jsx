import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">💰 FinansApp</h2>
        <nav className="space-y-2">
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">
            🏦 Hesaplar
          </Link>
          <Link to="/transfer" className="block hover:bg-gray-700 p-2 rounded">
            💸 Transfer
          </Link>
          <Link to="/exchange" className="block hover:bg-gray-700 p-2 rounded">
            🔁 Kur Dönüşüm
          </Link>
          <Link
            to="/create-account"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            🆕 Yeni Hesap
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left hover:bg-red-600 p-2 rounded mt-8 bg-red-500"
          >
            🚪 Çıkış Yap
          </button>
        </nav>
      </aside>

      {/* Sayfa İçeriği */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
