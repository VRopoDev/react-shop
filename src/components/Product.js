import Button from "./Button";
import vitamins from "../content/vitamins.jpeg";
const Product = ({ product, button, onClick }) => {
  return (
    <div className={`product`}>
      <img src={vitamins} alt={"vitamins"} />
      <h3> {product.name} </h3>
      <p>£ {product.price} </p>
      <Button
        color={button.color}
        text={button.text}
        onClick={() => onClick(product)}
      />
    </div>
  );
};

export default Product;
