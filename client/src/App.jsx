import { Routes, Route, Navigate } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import QRCodePage from "./pages/QRCodePage";
import EditMenuItem from "./pages/EditMenuItem";
import AddMenuItem from "./pages/AddMenuItem";
import EditRestaurant from "./pages/EditRestaurant";

function Home() {
  return <h1>Home Page</h1>;
}



function App(){
  return (
    <Routes>
      <Route path="/"
      element={<Navigate to="/owner/login" replace />} />
      <Route path="/menu/:restaurantId"
      element={<MenuPage />} />
      <Route path="/owner/login"
      element={<OwnerLogin />} />
      <Route path="/owner/dashboard"
      element={
        <ProtectedRoute>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      <Route path="owner/qrcode"
      element={
        <ProtectedRoute>
          <QRCodePage />
        </ProtectedRoute>
      } />

      <Route path="/owner/edit-restaurant"
      element={<EditRestaurant />} />

      <Route path="owner/edit-menu/:id"
      element={<EditMenuItem />} />
      <Route path="owner/add-menu"
      element={<AddMenuItem />} />
    </Routes>
  );
}

export default App;