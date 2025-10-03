// Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getAllProducts } from "../Redux/silce/productSlice";
import Header from "../componet/Header";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProducts);
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Header insdeHome={true} />
      <div className="container mt-4">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {allProducts?.length > 0 ? (
              allProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        {product.description.slice(0, 80)}...
                      </Card.Text>
                      <p>
                        <b>${product.price}</b>
                      </p>
                      <span className="badge bg-secondary">
                        {product.category}
                      </span>
                      <Link to={`/dashbord/${product.id}/view`}>
                        <button className="btn btn-primary mt-2 w-100">
                          View Product
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center mt-3 text-danger">
                No products available.
              </p>
            )}
          </div>
        )}
        {error && (
          <p className="text-center text-danger mt-3">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
