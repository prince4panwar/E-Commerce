import { useParams } from "react-router";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useCart, type Item } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";

function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState<Item | null>(null);
  const [theme] = useThemeHook();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    const res = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    ).then((res) => res.json());
    setProductData(res);
  };

  if (!productData) return <div>Loading...</div>;

  const slides = [
    { src: productData.image },
    { src: productData.image },
    { src: productData.image },
  ];

  return (
    <Container className="py-5 pt-100">
      <Row className="justify-content-center align-items-center">
        <Col xs={10} md={7} lg={5} className="p-0">
          <img
            src={productData.image}
            alt={productData.title}
            style={{ width: "80%", marginTop: "2rem", cursor: "pointer" }}
            onClick={() => setLightboxOpen(true)}
          />

          {/* Render the Lightbox component */}
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={slides}
          />
        </Col>
        <Col
          xs={10}
          md={7}
          lg={7}
          className={`${
            theme ? "text-light" : "text-black"
          } product-details pt-100`}
        >
          <h1>{productData.title}</h1>
          <Button
            onClick={() => addItem(productData)}
            className={
              theme ? "bg-dark-primary text-black" : "bg-light-primary"
            }
            style={{ borderRadius: "0", border: 0, marginBottom: "1.6rem" }}
          >
            <BsCartPlus size="1.8rem" />
            Add to cart
          </Button>
          <h4>Rs. {productData.price}</h4>
          <p>{productData.description}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
