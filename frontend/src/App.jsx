import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import AdminLayout from './pages/AdminDashboard/AdminLayout';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UsersList from './pages/AdminDashboard/UsersList.jsx';
import OrdersList from './pages/AdminDashboard/OrdersList.jsx';
import MessagesList from './pages/AdminDashboard/MessagesList.jsx';
import ProductsManager from './pages/Admin/ProductsManager.jsx';
import AddProduct from './pages/Admin/AddProduct.jsx';
import EditProduct from './pages/Admin/EditProduct.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
    <Route path="/dashboard" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<UsersList />} />
  <Route path="orders" element={<OrdersList />} />
  <Route path="messages" element={<MessagesList />} />
  <Route path="products" element={<ProductsManager />} />
  <Route path="add" element={<AddProduct />} />
  <Route path="edit/:id" element={<EditProduct />} />
</Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
