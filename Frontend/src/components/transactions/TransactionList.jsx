import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import TransactionItem from "./TransactionItem";
import TransactionFilter from "./TransactionFilter";
import { formatCurrency } from "../../utils/format";

const TransactionList = forwardRef(({ accountId }, ref) => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    fromDate: "",
    toDate: "",
  });

  const fetchTransactions = async (useFilter = false, filterObj = {}) => {
    try {
      const url = useFilter
        ? `http://localhost:5084/api/transactions/filter?accountId=${accountId}${
            filterObj.category ? `&category=${filterObj.category}` : ""
          }${filterObj.fromDate ? `&fromDate=${filterObj.fromDate}` : ""}${
            filterObj.toDate ? `&toDate=${filterObj.toDate}` : ""
          }`
        : `http://localhost:5084/api/transactions?accountId=${accountId}`;

      const res = await axios.get(url);
      setTransactions(res.data);
    } catch (err) {
      console.error("Transaction fetch error", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [accountId]);

  useImperativeHandle(ref, () => ({
    refresh: () =>
      fetchTransactions(
        filters.category || filters.fromDate || filters.toDate,
        filters
      ),
  }));

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTransactions(true, newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ category: "", fromDate: "", toDate: "" });
    fetchTransactions();
  };

  const totalExpense = transactions
    .filter((t) => t.transactionType === 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-4">
      <TransactionFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <div className="flex justify-between bg-white p-4 rounded-xl shadow text-sm font-medium text-gray-600">
        <span>
          Toplam Gider:{" "}
          <span className="text-red-600">{formatCurrency(totalExpense)}</span>
        </span>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">Henüz işlem yok</p>
        ) : (
          transactions.map((txn) => (
            <TransactionItem
              key={txn.id}
              txn={txn}
              onUpdate={() =>
                fetchTransactions(
                  filters.category || filters.fromDate || filters.toDate,
                  filters
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
});

export default TransactionList;