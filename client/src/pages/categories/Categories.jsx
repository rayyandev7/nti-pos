import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.categories || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CategoryData = {
      name,
      description,
    };

    try {
      if (editingId) {
        await updateCategory(editingId, CategoryData);
      } else {
        await createCategory(CategoryData);
      }

      setName("");
      setDescription("");
      setEditingId(null);

      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (category) => {
  setEditingId(category._id);
  setName(category.name);
  setDescription(category.description);
};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Category?")) return;

    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category Name"
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
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Category..."
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
          {filteredCategories.map((category) => (
            <tr key={category._id} className="border-b border-gray-700">
              <td className="p-3">{category.name}</td>

              <td className="p-3">{category.description}</td>

              <td className="p-3 text-center">
                {category.isActive ? "Active" : "Inactive"}
              </td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredCategories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-6">
                No Categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;