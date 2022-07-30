import { Avatar, Button } from '@mui/material'
import React from 'react'
import Header from '../Components/Header'
import { useSelector ,useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCart } from '../redux/actions/userAction'
const ProductDetails = () => {
  const {state} = useLocation();
  const dispatch = useDispatch();
  const [count , setCount] = React.useState(1);
  const increment = (data) => {
   if(count >= 1 && data == 1){
    setCount(count + 1)
   }else if ( count > 1 && data == -1){
    setCount(count - 1)
   }
   }
   const handleCart = (data) => {
    const cartUser = JSON.parse(localStorage.getItem("cart"));
    const checkfilter = cartUser.filter(item => item.id === data.id)
    if(checkfilter.length !== 0){

    const newMap = cartUser.map(item => {
        if(item.id === data.id){
            item.qty = item.qty + count;
            setCount(1)
            console.log("item", item.qty)
        }else {
            return item
        }
        return item
    })
     localStorage.setItem("cart", JSON.stringify(newMap));
     const updatedCart = JSON.parse(localStorage.getItem("cart"));
    dispatch(setCart(updatedCart));

}else{
    localStorage.setItem("cart", JSON.stringify([...cartUser, {id:data.id, qty:1}]));
    const updatedCarts = JSON.parse(localStorage.getItem("cart"));
    dispatch(setCart(updatedCarts));
}
}
  console.log("state", state)
  return (
    <div>
      <Header/>
      <div style={{display:"flex"}}className="product-details">
      <img src={state.category.image} style={{
        width: '100%',
        maxWidth: '60%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
        
      }}/>
      <div style={{padding:20}}>

      <h2>{state.title}</h2>
      <p>Description</p>
      <p>{state.description}</p>
      <p>Price: {state.price}.00 $</p>
      <p>Category:{state.category.name}</p>

      {/* Quantity Buttons  */}
      <div style={{display:"flex", justifyContent:"space-between" ,width:180,marginBottom:20}}>
      <Button onClick={() => increment(-1)} variant="outlined" color="primary" style={{marginRight:10}}>-</Button>
      <p style={{paddingRight:10}}>{count}</p>
      <Button onClick={() => increment(1)} variant="outlined" color="primary">+</Button>
      </div>
      <Button onClick={() => handleCart(state)} variant="contained" color="primary">Add to Cart</Button>
      </div>
      </div>
    </div>
  )
}

export default ProductDetails