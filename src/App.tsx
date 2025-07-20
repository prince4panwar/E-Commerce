import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
// import ProductDetails from "./Pages/ProductDetails";

function App() {
  const [theme] = useThemeHook();
  return (
    <main
      className={theme ? "bg-black" : "bg-light-2"}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        /> */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  );
}

export default App;
