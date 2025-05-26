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

  const groupAccounts = (accounts) => {
    const groups = {
      TRY: [],
      FX: [],
      GOLD: [],
      SILVER: [],
    };

    accounts.forEach(acc => {
      switch (acc.accountType) {
        case 0: groups.TRY.push(acc); break;
        case 1:
        case 2: groups.FX.push(acc); break;
        case 3: groups.GOLD.push(acc); break;
        case 4: groups.SILVER.push(acc); break;
        default: break;
      }
    });

    return groups;
  };

  const grouped = groupAccounts(accounts);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome,{" "}
        {user?.fullName
          ?.split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h1>

      {Object.entries(grouped).map(([label, group]) => (
        group.length > 0 && (
          <div key={label} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              {label === "TRY" && "💰 TL Hesapları"}
              {label === "FX" && "💱 Döviz Hesapları"}
              {label === "GOLD" && "XAU Altın Hesapları"}
              {label === "SILVER" && "XAG Gümüş Hesapları"}
            </h2>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {group.map((acc) => {
                const { name, symbol } = getAccountType(acc.accountType);
                return (
                  <Link key={acc.id} to={`/account/${acc.id}`}>
                    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <p className="text-sm text-gray-500">IBAN: {acc.iban}</p>
                      <p className="text-xl font-bold">{formatCurrency(acc.balance)} {symbol}</p>
                      <p className="text-sm">Type: <span className="font-medium">{name}</span></p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(acc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )
      ))}
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