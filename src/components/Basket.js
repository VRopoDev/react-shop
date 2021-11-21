import Products from "./Products";

const ShowBasket = ({ products, onClick }) => {
  const basketButton = {
    color: "red",
    text: "Remove",
  };

  // count the total price of products in the basket
  function getTotal() {
    let total = 0;
    products.forEach((pr) => {
      total += pr.price;
    });
    return total.toFixed(2);
  }
  return (
    <div className={"center"}>
      {products.length > 0 ? (
        <>
          <div>
            <p>Total: £{getTotal()}</p>
          </div>

          <Products
            products={products}
            button={basketButton}
            onClick={onClick}
          />
        </>
      ) : (
        <h3>You don't have any items in your basket! Why not add some!</h3>
      )}
    </div>
  );
};

export default ShowBasket;
