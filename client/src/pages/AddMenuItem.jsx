import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMenuItem() {

  const navigate = useNavigate();


  const [menu, setMenu] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    vegType: "",
    isBestSeller: false,
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if(file){
      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

   const restaurantId = localStorage.getItem("restaurantId");
    console.log("restaurantId =", restaurantId);

    formData.append("name", menu.name);
    formData.append("category", menu.category);
    formData.append("price", menu.price);
    formData.append("description", menu.description);
    formData.append("vegType", menu.vegType);
    formData.append("isBestSeller", menu.isBestSeller);
    formData.append("image", image);
    formData.append("restaurantId",restaurantId);

    await axios.post(
      "https://qr-menu-oxgp.onrender.com/api/menu",
      formData
    );

    alert("Menu Item Added Successfully");

    navigate("/owner/dashboard");
  } catch (error) {

    console.log(error.response);

    console.log(error.response?.data)
    console.log(error);
    alert("Failed to Add Menu");
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Menu Item
      </h1>

      <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Menu Name"
        value={menu.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={menu.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Food Type
        </label>

        <select value={menu.vegType}
        onChange={(e) => setMenu({...menu, vegType:
          e.target.value})
          }
          className="w-full border ruonded-lg p-2">
            <option value="">Select Food Type</option>
            <option value="Veg">🟢 Veg</option>
            <option value="Non-Veg">🔴 Non-Veg</option>
          </select>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox"
        checked={menu.isBestSeller}
        onChange={(e) => setMenu({
          ...menu, isBestSeller: e.target.checked,
        })} />

        <label>🔥 Bestseller</label>
      </div>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={menu.price}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={menu.description}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input type="file"
      accept="image/*" 
      onChange={handleImageChange}
      className="border p-2 w-full mb-3"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded mb-3"
        />
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Add Menu
      </button>
      </form>
    </div>
  );
}

export default AddMenuItem;