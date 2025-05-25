import { useState } from "react";

const categoryOptions = [
  { value: "", label: "Tümü" },
  { value: 0, label: "📝 Diğer" },
  { value: 1, label: "🛒 Market" },
  { value: 2, label: "⛽ Yakıt" },
  { value: 3, label: "💸 Transfer Ücreti" },
  { value: 4, label: "💱 Kur Dönüşüm" },
  { value: 5, label: "📈 Yatırım" },
];

const TransactionFilter = ({ filters, onFilterChange, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    setLocalFilters({ category: "", fromDate: "", toDate: "" });
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kategori */}
        <div>
          <label className="block font-medium">Kategori</label>
          <select
            name="category"
            value={localFilters.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Başlangıç Tarihi */}
        <div>
          <label className="block font-medium">Başlangıç Tarihi</label>
          <input
            type="date"
            name="fromDate"
            value={localFilters.fromDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Bitiş Tarihi */}
        <div>
          <label className="block font-medium">Bitiş Tarihi</label>
          <input
            type="date"
            name="toDate"
            value={localFilters.toDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={applyFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Filtrele
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default TransactionFilter;