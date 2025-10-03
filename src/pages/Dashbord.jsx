import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getAllProducts, deleteProduct, updateProduct } from '../Redux/silce/productSlice'
import { Modal, Button, Form, Card } from 'react-bootstrap'
import Header from '../componet/Header'
import { Link } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'





const Dashbord = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProducts);

  const [editId, setEditId] = useState(null)


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleClose = () => {
    setEditId(null)
    setShow(false);
    setTitle(""); setPrice(""); setDescription(""); setImage(""); setCategory("");
  }
  const handleShow = () => setShow(true);



  const isValidImageURL = (url) => /\.(jpg|jpeg|png|webp)$/i.test(url);

  //update and add

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !description || !image || !category) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isValidImageURL(image)) {
      toast.error("Please enter a valid image URL (jpg, png, webp).");
      return;
    }

    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    };

    if (editId) {
      dispatch(updateProduct({ id: editId, updateData: newProduct }))
      toast.info("Product updated successfully! ")
    } else {
      dispatch(addProduct(newProduct))
      toast.success(" Product added successfully!");
    }

    handleClose();
  };
  // edit items 
  const handleEdit = (product) => {
    setEditId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category);
    setShow(true);
  };

  // delete buttion

  const handleDeletebtn = (id) => {
    if (dispatch(deleteProduct(id))) {
      toast.warning("product is delete")
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <Header />
      <div className="container mt-4">
        <div className='d-flex justify-content-start ms-2'>
          <h3>Add Your Products</h3>
          <button
            type="button"
            className="btn btn-light border-primary border-2  rounded-circle d-flex align-items-center justify-content-center ms-2 "
            style={{ width: "45px", height: "45px", fontSize: "20px", fontWeight: "bold",  }}
            onClick={handleShow}
          >
            +
          </button>
        </div>

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Product" : "Add Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                {image && (
                  <div className="mt-2 text-center">
                    <img src={image} alt="Preview" className="img-thumbnail" style={{ maxHeight: "150px" }} />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </Form.Group>

              <Button type="submit" className="w-100" variant="primary">
                {editId ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* view product list*/}
        <div className="row mt-4">
          {allProducts?.length > 0 ? (
            allProducts.map((product, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description.slice(0, 80)}...</Card.Text>
                    <p><b>${product.price}</b></p>
                    <span className="badge bg-secondary">{product.category}</span>
                    {/* update values */}
                    <button className=' float-end ms-2' style={{ background: "none", border: "none" }} onClick={() => handleEdit(product)}><i className="fa-solid fa-pen-to-square text-success"></i></button>
                    {/* delete buttion */}
                    <button className=' float-end  ms-2' style={{ background: "none", border: "none" }} onClick={() => handleDeletebtn(product.id)}><i className="fa-solid fa-trash text-danger"></i></button>
                    <Link to={`/dashbord/${product?.id}/view`}><button className=' btn text-light mt-2 w-100 bg-primary '>View Product</button></Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center mt-3">No products available. Add some!</p>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}

      />

    </div>
  )
}

export default Dashbord
