import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        //console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/auth/myOrderData", {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    function formatDateTime(dateTime) {
        const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateTime).toLocaleDateString('en-US', options);
      
        const day = formattedDate.split(' ')[1];
        
      
        const formattedDay = day.replace(/^(0+)/, '');
      
        const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const formattedTime = new Date(dateTime).toLocaleTimeString('en-US', optionsTime);
      
        return `${formattedDate.replace(day, formattedDay)}, ${formattedTime}`;
      }
    
    return (
        <div>
          <div>
            <Navbar />
          </div>
      
          <div className='container'>
            <div className='row'>
              {orderData !== {} ? (
                Array(orderData).map((data) => {
                  return data.orderData ? (
                    data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className='m-auto mt-5'>
                                  <p>Previous Orders: {formatDateTime(arrayData.Order_date)}</p>
                                  <hr />
                                </div>
                              ) : (
                                <div className='col-12 col-md-6 col-lg-3'>
                                  <div className='card mt-3' style={{ width: "16rem", maxHeight: "360px" }}>
                                    <img src={arrayData.img} className='card-img-top' alt='...' style={{ height: "120px", objectFit: "fill" }} />
                                    <div className='card-body'>
                                      <h5 className='card-title'>{arrayData.name}</h5>
                                      <div className='container w-100 p-0' style={{ height: "38px" }}>
                                        <span className='m-1'>{arrayData.qty}</span>
                                        <span className='m-1'>{arrayData.size}</span>
                                        <span className='m-1'>{arrayData.Order_date}</span>
                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  ) : (
                    ""
                  );
                })
              ) : (
                ""
              )}
            </div>
          </div>
      
          <Footer />
        </div>
      );
              }      