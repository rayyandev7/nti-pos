import { useEffect, useState } from "react";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../services/brandService";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.brands || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const brandData = {
      name,
      description,
    };

    try {
      if (editingId) {
        await updateBrand(editingId, brandData);
      } else {
        await createBrand(brandData);
      }

      setName("");
      setDescription("");
      setEditingId(null);

      fetchBrands();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (brand) => {
    setEditingId(brand._id);
    setName(brand.name);
    setDescription(brand.description);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    try {
      await deleteBrand(id);
      fetchBrands();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          {editingId ? "Update Brand" : "Add Brand"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Brand..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 w-full"
      />

      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBrands.map((brand) => (
            <tr key={brand._id} className="border-b border-gray-700">
              <td className="p-3">{brand.name}</td>

              <td className="p-3">{brand.description}</td>

              <td className="p-3 text-center">
                {brand.isActive ? "Active" : "Inactive"}
              </td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(brand._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredBrands.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-6">
                No brands found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Brands;
