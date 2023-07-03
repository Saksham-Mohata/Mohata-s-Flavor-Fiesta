import React  from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useState} from 'react';

export default function Cart() {
  const [showNotification, setShowNotification] = useState(false)
  
  let data = useCart();
  let dispatch = useDispatchCart();

   if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{color:'purple'}}>You haven't added anything in cart</div>
        <div className='m-5 w-100 text-center fs-3' style={{color:'purple'}}>Start from where you left off !!</div>
      </div>   
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
   
    setShowNotification(true);
    setTimeout(async () => {
      setShowNotification(false);
      
    },10000); 
    
   
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toISOString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover 'style={{color:'#FDF5E6'}}>
          <thead className=' text-success fs-4'style={{color:'#FDF5E6'}}>
            <tr style={{color:'#FDF5E6'}}>
              <th scope='col' style={{color:'purple'}}>#</th>
              <th scope='col' style={{color:'purple'}} >FoodItem</th>
              <th scope='col' style={{color:'purple'}}>Quantity</th>
              <th scope='col' style={{color:'purple'}}>Size</th>
              <th scope='col' style={{color:'purple'}}>Price</th>
              <th scope='col' style={{color:'purple'}}></th>
            </tr>
          </thead>
          <tbody style={{color:'#FDF5E6'}}>
            {data.map((food, index) => (
              <tr>
                <th scope='row'style={{color:'#FDF5E6'}} >{index + 1}</th>
                <td style={{color:'#FDF5E6'}}>{food.name}</td>
                <td style={{color:'#FDF5E6'}}>{food.qty}</td>
                <td style={{color:'#FDF5E6'}}>{food.size}</td>
                <td style={{color:'#FDF5E6'}}>{food.price}</td>
                <td style={{color:'#FDF5E6'}}><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div style={{color:'#FDF5E6'}}><h1 className='fs-2'>Total Amount: ₹{totalPrice}/-</h1></div>
        <div >
          <button className='btn  mt-5' style={{backgroundColor: 'purple'}} onClick={handleCheckOut} > Check Out </button>
          {showNotification && (
        <div className="notification1" role="alert">
          Your order has been successfully placed and would be delivered shortly!!!!
          </div>
      )}
       </div>
      </div>
    </div>
  )
}
