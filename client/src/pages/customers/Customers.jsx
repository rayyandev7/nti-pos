import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.customers || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      fullName,
      phone,
      email,
      address,
    };

    try {
      if (editingId) {
        await updateCustomer(editingId, customerData);
      } else {
        await createCustomer(customerData);
      }

      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setEditingId(null);

      fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer._id);
    setFullName(customer.fullName);
    setPhone(customer.phone);
    setEmail(customer.email);
    setAddress(customer.address);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 rounded bg-gray-700"
            required
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 w-full"
      />

      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Purchases</th>
            <th className="p-3 text-center">Spent</th>
            <th className="p-3 text-center">Points</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._id} className="border-b border-gray-700">
              <td className="p-3">{customer.fullName}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.email}</td>
              <td className="p-3 text-center">{customer.totalPurchases}</td>
              <td className="p-3 text-center">
                Rs. {customer.totalSpent}
              </td>
              <td className="p-3 text-center">
                {customer.loyaltyPoints}
              </td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredCustomers.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-6">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;