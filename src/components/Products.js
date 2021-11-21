import Product from "./Product";

const Products = ({ products, button, onClick }) => {
  return (
    <div className={"products"}>
      {products.map((product, index) => (
        <Product
          key={index}
          product={product}
          button={button}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Products;
