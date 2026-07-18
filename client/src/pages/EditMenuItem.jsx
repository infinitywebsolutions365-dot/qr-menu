import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

function EditMenuItem(){


    const navigate = useNavigate();

    const {id} = useParams();

    const [menu, setMenu] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        fetchMenu();
    }, []);


    const fetchMenu = async () => {
        try {
            const res = await axios.get(`https://qr-menu-oxgp.onrender.com/api/menu/item/${id}`);
    
            setMenu(res.data);

            setPreview(res.data.image);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(menu);

    const handleChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]:
            e.target.value,
        });
    };

    // const handleUpdate = async () => {
    //     try {
    //         await axios.put(
    //             `http://localhost:5000/api/menu/${id}`,
    //             menu
    //         );

    //         alert("Menu Updated Successfully");

    //         navigate("/owner/dashboard");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const handleUpdate = async () => {
  try {
    const formData = new FormData();

    formData.append("name", menu.name);
    formData.append("category", menu.category);
    formData.append("vegType", menu.vegType);
    formData.append("isBestSeller", menu.isBestSeller);
    formData.append("price", menu.price);
    formData.append("description", menu.description);
    

    if (image) {
      formData.append("image", image);
    }

    await axios.put(
      `https://qr-menu-oxgp.onrender.com/api/menu/${id}`,
      formData
    );

    alert("Menu Updated Successfully");
    navigate("/owner/dashboard");

  } catch (error) {
    console.log(error);
  }
};
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];

      if(file) {
        setImage(file);

        setPreview(URL.createObjectURL(file));
      }
    };


    return (
  <div className="max-w-xl mx-auto mt-10">

    <h1 className="text-3xl font-bold mb-6">
      Edit Menu Item
    </h1>

    <input
      type="text"
      name="name"
      value={menu.name}
      onChange={handleChange}
      placeholder="Menu Name"
      className="border p-2 w-full mb-3"
    />

    <input
      type="text"
      name="category"
      value={menu.category}
      onChange={handleChange}
      placeholder="Category"
      className="border p-2 w-full mb-3"
    />

    <div className="mb-4">
      <label className="block font-medium mb-2">
        Food Type
      </label>

      <select value={menu.vegType}
      onChange={(e) => setMenu({...menu, vegType: e.target.value})}
      className="w-full border rounded-lg p-2">
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
      value={menu.price}
      onChange={handleChange}
      placeholder="Price"
      className="border p-2 w-full mb-3"
    />

    <textarea
      name="description"
      value={menu.description}
      onChange={handleChange}
      placeholder="Description"
      className="border p-2 w-full mb-3"
    />

    <input type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="border p-2 w-full mb-3" 
    />

    {preview && (
      <img src={preview}
      alt="Preview"
      className="w-32 h-32 object-cover rounded mb-3"
      />
    )}

    <button
      onClick={handleUpdate}
      className="bg-green-600 text-white px-5 py-2 rounded"
    >
      Update Menu
    </button>

  </div>
);
}

export default EditMenuItem;