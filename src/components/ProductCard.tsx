import { Card } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useCart, type Item } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router";
import { toast } from "react-toastify";
import type { ReactElement } from "react";
import { motion } from "motion/react";

interface ProductCardProps {
  data: Item;
}

function ProductCard(props: ProductCardProps): ReactElement {
  let { image, price, title, id } = props.data;
  const [theme] = useThemeHook();
  const { addItem } = useCart();

  const addToCart = () => {
    addItem(props.data);
    toast.success("Item is added to cart", { autoClose: 2000 });
  };

  return (
    <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-light text-black"
      } text-center p-0 overflow-hidden shadow  mx-auto mb-4`}
    >
      <Link to={`/product-details/${id}`}>
        <div
          style={{
            background: "white",
            height: "15rem",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: "inherit",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} style={{ width: "12rem" }}>
            <Card.Img variant="top" src={image} className="img-fluid p-2" />
          </motion.div>
        </div>
      </Link>
      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title>
          Rs. <span className="h3">{price}</span>
        </Card.Title>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart()}
          className={`btn border-0 d-flex align-items-center m-auto ${
            theme ? "bg-dark-primary text-black" : "bg-light-primary text-white"
          }`}
        >
          <BsCartPlus />
          Add to cart
        </motion.button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
