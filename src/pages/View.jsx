import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Header from '../componet/Header';


const View = () => {
  // const params = useParams()
  // console.log(params);
  
  const {id} = useParams()
  console.log(id);
     const [product,setProduct] = useState({})

  useEffect(()=>{
     if(localStorage.getItem("allProducts")){
      const alProduct = JSON.parse(localStorage.getItem("allProducts"))
      // console.log(alProduct.find((item)=>item.id == id));
      setProduct(alProduct.find((item)=>item.id == id))
     }
    

  },[])


  
  
  
  
  return (
     <div style={{marginTop:"100px"}}>
     <Header/>
        <div className="container py-5">
  <div className="row align-items-center">
    
    {/* Product Image & Buttons */}
    <div className="col-lg-6 text-center mb-4 mb-lg-0">
      <img 
        src={product?.image}
        alt="product" 
        width="350" 
        height="250" 
        className="img-fluid mb-3" 
      />
      
    </div>

    {/* Product Info */}
    <div className="col-lg-6">
      <h1 className="display-8 ">{product?.title}</h1>
      <h2 className="text-danger fw-bold fs-3">${product?.price} </h2>
      <p className="fs-5"><strong>Category:</strong>{product?.category}</p>
      <p className="fs-5"><strong>Description:</strong>{product?.description}</p>

      {/* <h3 className="fw-bold my-4">Client Reviews</h3> */}

    </div>

  </div>
</div>

     </div>
  )
}

export default View