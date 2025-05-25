import { useState } from "react";
import { formatCurrency } from "../../utils/format";
import TransactionEditModal from "./TransactionEditModal";
import axios from "axios";

const categoryMap = {
  0: { icon: "📝", name: "Diğer" },
  1: { icon: "🛒", name: "Market" },
  2: { icon: "⛽", name: "Yakıt" },
  3: { icon: "💸", name: "Transfer Ücreti" },
  4: { icon: "💱", name: "Kur Dönüşüm" },
  5: { icon: "📈", name: "Yatırım" },
};

const TransactionItem = ({ txn, onUpdate }) => {
  const isExpense = txn.transactionType === 0;
  const colorClass = isExpense ? "text-red-600" : "text-green-600";
  const category = categoryMap[txn.category] || { icon: "❓", name: "Bilinmeyen" };
  const editable = !txn.isSystemGenerated;

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Bu işlemi silmek istediğine emin misin?")) return;

    try {
      await axios.delete(`http://localhost:5084/api/transactions/${txn.id}`);
      onUpdate();
    } catch (err) {
      console.error("Silme hatası", err);
      alert("Silinemedi.");
    }
  };

  const handleSave = async (updatedTxn) => {
    try {
      await axios.put(`http://localhost:5084/api/transactions/${txn.id}`, {
        accountId: txn.accountId,
        amount: updatedTxn.amount,
        transactionType: txn.transactionType,
        category: updatedTxn.category,
        description: updatedTxn.description,
      });

      onUpdate();
    } catch (err) {
      console.error("Güncelleme hatası", err);
      alert("Güncelleme başarısız.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b py-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <div>
            <div className="font-semibold">{txn.description}</div>
            <div className="text-sm text-gray-500">
              {category.name} • {new Date(txn.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`text-lg font-bold ${colorClass}`}>
            {isExpense ? "-" : "+"} {formatCurrency(txn.amount)}
          </div>
          {editable && (
            <>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setShowModal(true)}
              >
                🖊️
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={handleDelete}
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <TransactionEditModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          transaction={txn}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TransactionItem;