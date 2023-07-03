
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatchCart, useCart } from './ContextReducer'

// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (newQty) => {
    setQty(newQty);
  }
  // const handleQty = (e) => {
  //   setQty(e.target.value);
  // }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
 
  const handleAddToCart = async () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000); 
    
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    

   
   
    
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 rounded"  style={{
             backgroundColor: "purple", 
             color: "white" 
             }}ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className="btn-group m-2" role="group">
             <button className="btn" style={{ backgroundColor: "purple", color: "white" }} onClick={() => handleQty(Math.max(parseInt(qty) - 1, 1))}>-</button>
             <button className ="btn" style={{ backgroundColor: "lavender", color: "purple" }} disabled>{qty}</button>
             <button className="btn"style={{ backgroundColor: "purple", color: "white" }} onClick={() => handleQty(Math.min(parseInt(qty) + 1, 10))}>+</button>
            </div>
            {/* <select className="m-2 h-100 w-20 rounded"  style={{
             backgroundColor: "purple", 
             color: "white" 
             }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select> */}
            </div>
            
            
          
          <hr></hr>
          <div className='price ms-2 h-100 w-20 fs-5 ' style={{ float: "left" }}>
              ₹{finalPrice}/-
            </div>
          <div className='cart' style={{ float: "right", textAlign: "right" }}>
          <button className={`btn btn justify-center ms-2 `}  style={{
            backgroundColor: "purple", 
            color: "white" 
            }} onClick={handleAddToCart}>Add to Cart</button>
            {showNotification && (
        <div className="notification">
          Item added to cart!
          </div>
      )}
            </div>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
      
    </div>
  )
}
//