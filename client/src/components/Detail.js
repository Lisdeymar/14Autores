import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, navigate } from "@reach/router";

const Detail = ({ id, removeFromDom }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get("/api/products/" + id).then(({ data }) => {
      setProduct(data.product);
    });
  }, []);

  const deletePerson = (productId) => {
    axios.delete("/api/products/" + productId).then((res) => {
      removeFromDom(productId);
      navigate("/products");
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen text-3xl">
      <p>Title: {product.title}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <Link to="/products">
        <Button variant="contained" sx={{ marginTop: "20px" }}>
          Back to list
        </Button>
      </Link>
      <Link to={`/products/${id}/edit`}>
        <Button variant="contained" color="warning" sx={{ marginTop: "20px" }}>
          Edit
        </Button>
      </Link>
      <Button
        variant="contained"
        color="error"
        sx={{ marginTop: "20px" }}
        onClick={(e) => {
          deletePerson(id);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default Detail;
