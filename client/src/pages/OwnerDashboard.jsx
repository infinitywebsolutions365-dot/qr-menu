import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function OwnerDashboard() {

    const [menus, setMenus] = useState([]);

    const [restaurant, setRestaurant] = useState(null);

    const [isOpen, setIsOpen] = useState(true);

    


    const navigate = useNavigate();

    const restaurantId = localStorage.getItem("restaurantId");

    useEffect(() => {
      if(restaurantId) {
        fetchRestaurant();
      }
        fetchMenus();
    }, []);

    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);

        setRestaurant(res.data);
        console.log(res.data);
        setIsOpen(res.data.isOpen);
      } catch (error) {
        console.log(error);
      }
    };

    const handleToggleStatus = async () => {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/restaurants/toggle/${restaurantId}`
        );

        setIsOpen(res.data.isOpen);
      } catch (error) {
        console.log(error);
      }
    };


    const fetchMenus = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/menu");
            setMenus(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
      try{
        await axios.delete(`http://localhost:5000/api/menu/${id}`);

        alert("Menu Item Deleted Successfully");

        fetchMenus();
      } catch (error) {
        console.log(error);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("ownerToken");

      alert("Logged Out Successfully");

      navigate("/owner/login");
    };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* <h1 className="text-3xl font-bold mb-6">
        Restaurant Owner Dashboard
      </h1> */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Restaurant Owner Dashboard
        </h1>

        <button onClick={handleToggleStatus}
        className={`px-4 py-2 rounded text-white ${
          isOpen ? "bg-green-600" : "bg-red-600"
        }`}>{isOpen ? "🟢 Restaurant Open" : "🔴 Restaurant Closed"}</button>
        <div className="flex gap-3">
          <button onClick={() => navigate("/owner/qrcode")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">QR Code</button>

          <button onClick={handleLogout} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
        </div>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Total Menu Items</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {menus.length}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg font-semibold">Restaurant</h2>
          <p className="text-xl mt-2">
            Al Baik
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <button onClick={() => navigate("/owner/add-menu")}
           className="bg-green-600 text-white px-5 py-2 rounded">
            Add Menu Item
          </button>

          <button onClick={() => navigate("/owner/edit-restaurant")}
            className="bg-blue-600 text-white px-4 py-2 rounded">
              Edit Restaurant
            </button>
        </div>
      </div>
      <div className="mt-8 bg-white shadow rounded-xl p-5">
  <h2 className="text-2xl font-bold mb-4">
    Menu Items
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse min-w-[700px]">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Name</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {menus.map((item) => (
          <tr key={item._id}>
            <td className="border p-2">{item.name}</td>

            <td className="border p-2">
              {item.category}
            </td>

            <td className="border p-2">
              ₹{item.price}
            </td>

            <td className="border p-2">
              <button onClick={() => navigate(`/owner/edit-menu/${item._id}`)} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
                Edit
              </button>

              <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default OwnerDashboard;