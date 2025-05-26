import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">FinansApp</h2>

        <nav className="space-y-2">
          <NavItem to="/" label="Hesaplar" />
          <NavItem to="/transfer" label="Para Transferi" />
          <NavItem to="/exchange" label="Kur Dönüşüm" />
          <NavItem to="/create-account" label="Yeni Hesap" />
        </nav>

        {/* Buton en alta yapışsın */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition"
        >
          Çıkış Yap
        </button>
      </aside>

      {/* İçerik Alanı */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 rounded hover:bg-gray-700 transition"
  >
    {label}
  </Link>
);

export default Layout;