import { useState, useEffect } from "react";
import Notifications, { notify } from "react-notify-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import ShowBasket from "./components/Basket";

const App = () => {
  // States
  // state of the basket container
  const [showBasket, setShowBasket] = useState(false);
  // state of the products
  const [products, setProducts] = useState([]);
  // state of the config
  const [config, setConfig] = useState({});
  // state of the basket products
  const [basket, setBasket] = useState([]);

  // On init fetch the products and the config
  useEffect(() => {
    const getData = async () => {
      const { products, config } = await fetchProducts();
      setProducts(products);
      setConfig(config);
    };

    getData();
  }, []);

  // Fetch products from the server
  const fetchProducts = async () => {
    const link =
      "https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json";
    const res = await fetch(link);
    const data = await res.json();

    return data;
  };

  // Check if nutrients amount exceeds limit
  function isAboveLimit(config, nutrient, basket) {
    let amount = 0;

    const limit = config.find((p) => {
      return p.id === nutrient.id;
    });

    basket.forEach((p) => {
      p.nutrients.forEach((n) => {
        if (n.id === nutrient.id) {
          amount += n.amount;
        }
      });
    });
    return amount + nutrient.amount > limit.amount;
  }

  // Add a product to busket
  const addToBasket = async (product) => {
    let limit;
    product.nutrients.forEach((nutrient) => {
      if (isAboveLimit(config.tolerableUpperLimits, nutrient, basket)) {
        limit = true;
      }
    });
    if (limit) {
      notify.show(
        "Product can not be added to basket, you have exceed the tolerable upper limit of nutrients",
        "error",
        7000
      );
      return;
    } else {
      notify.show("Added to basket!", "success", 4000);
      setBasket([...basket, product]);
    }
  };

  // Remove an item from the basket
  const removeFromBasket = async (product) => {
    let newBasket = [];
    let occur = basket.filter((el) => el === product).length;
    if (occur > 1) {
      newBasket = basket.filter((el) => el !== product);
      for (let i = 1; i <= occur - 1; i++) {
        newBasket.push(product);
      }
    } else {
      newBasket = basket.filter((el) => el !== product);
    }
    setBasket(newBasket);
    notify.show("Removed from basket!", "info", 4000);
  };

  // Constructor options for add to basket button
  const productButton = {
    color: "green",
    text: "Add to basket",
  };

  return (
    <div className="container">
      <Notifications />
      <Header onShow={() => setShowBasket(!showBasket)} opened={showBasket} />

      <>
        {showBasket && (
          <ShowBasket products={basket} onClick={removeFromBasket} />
        )}

        <Products
          products={products}
          button={productButton}
          onClick={addToBasket}
        />
      </>
      <Footer />
    </div>
  );
};

export default App;
