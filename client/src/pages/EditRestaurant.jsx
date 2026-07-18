// import axios from "axios";
// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

// const [restaurant, setRestaurant] = useState({
//     name: "",
//     address: "",
//     phone: "",
// });

// const [logo, setLogo] = useState(null);
// const restaurantId = localStorage.getItem("restaurantId");

// useEffect(() => {
//     fetchRestaurant();
// }, []);

// const fetchRestaurant = async () => {
//     try {
//         const res = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);

//         setRestaurant({
//             name: res.data.name,
//             address: res.data.address,
//             phone: res.data.phone,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditRestaurant() {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [logo, setLogo] = useState(null);

  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/restaurants/${restaurantId}`
      );

      setRestaurant({
        name: res.data.name,
        address: res.data.address,
        phone: res.data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", restaurant.name);
      formData.append("address", restaurant.address);
      formData.append("phone", restaurant.phone);

      if (logo) {
        formData.append("logo", logo);
      }

      await axios.put(
        `http://localhost:5000/api/restaurants/${restaurantId}`,
        formData
      );

      alert("Restaurant Updated Successfully");

      navigate("/owner/dashboard");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Edit Restaurant
        </h2>

        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurant.name}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              name: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={restaurant.address}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              address: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-3"
        />

        <input
          type="text"
          placeholder="Phone"
          value={restaurant.phone}
          onChange={(e) =>
            setRestaurant({
              ...restaurant,
              phone: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Update Restaurant
        </button>
      </div>
    </div>
  );
}

export default EditRestaurant;
