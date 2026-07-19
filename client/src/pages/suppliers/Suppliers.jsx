import { useEffect, useState } from "react";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../services/supplierService";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.suppliers || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      name,
      companyName,
      email,
      phone,
      address,
    };

    try {
      if (editingId) {
        await updateSupplier(editingId, supplierData);
      } else {
        await createSupplier(supplierData);
      }

      setName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setEditingId(null);

      fetchSuppliers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setName(supplier.name);
    setCompanyName(supplier.companyName);
    setEmail(supplier.email);
    setPhone(supplier.phone);
    setAddress(supplier.address);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Suppliers</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded bg-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 rounded bg-gray-700 col-span-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          {editingId ? "Update Supplier" : "Add Supplier"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Supplier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 w-full"
      />

      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id} className="border-b border-gray-700">
              <td className="p-3">{supplier.name}</td>
              <td className="p-3">{supplier.companyName}</td>
              <td className="p-3">{supplier.phone}</td>
              <td className="p-3">{supplier.email}</td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(supplier)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(supplier._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredSuppliers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-6">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;