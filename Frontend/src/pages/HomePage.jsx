import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/format";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [accounts, setAccounts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5084/api/accounts?userId=${user.id}`
        );
        setAccounts(res.data);
      } catch (err) {
        console.error("Account fetch error", err);
      }
    };

    fetchAccounts();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName}</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((acc) => {
          const { name, symbol } = getAccountType(acc.accountType);

          return (
            <Link to={`/account/${acc.id}`} key={acc.id}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <p className="text-sm text-gray-500">IBAN: {acc.iban}</p>
                <p className="text-xl font-bold">
                  {formatCurrency(acc.balance)} {symbol}
                </p>
                <p className="text-sm">
                  Type: <span className="font-medium">{name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(acc.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const getAccountType = (type) => {
  const typeMap = {
    0: { name: "TRY", symbol: "₺" },
    1: { name: "USD", symbol: "$" },
    2: { name: "EUR", symbol: "€" },
    3: { name: "XAU", symbol: "kg AU" },
    4: { name: "XAG", symbol: "kg AG" },
  };
  return typeMap[type] || { name: "Unknown", symbol: "" };
};

export default HomePage;