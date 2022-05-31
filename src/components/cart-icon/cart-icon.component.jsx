import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon=()=>{

    const {isCartOpen,setIsCartOpen,count}= useContext(CartContext);
    const toggleIsCartOpen=()=>setIsCartOpen(!isCartOpen);
    
    return(
     <CartIconContainer onClick={toggleIsCartOpen}>
         <ShoppingIcon className='shopping-icon' />
         <ItemCount>{count}</ItemCount>
     </CartIconContainer>
 )
}

export default CartIcon;