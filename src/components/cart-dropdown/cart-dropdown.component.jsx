import {CartDropdownContainer ,EmptyMessage
,CartItems} from  './cart-dropdown.styles.jsx'
import Button from '../button/button.component'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'

const CartDropdown=()=>{
    const{cartItems, setIsCartOpen}=useContext(CartContext);
    const navigate= useNavigate();


    const goToCheckoutHandler=()=>{
        setIsCartOpen(false)
        navigate('/checkout')
    }
return (
    <CartDropdownContainer>
        <CartItems>
            
                {cartItems.length ? (cartItems.map(item=>
                     <CartItem key={item.id} cartItem={item}/>
                     )):(
                     <EmptyMessage>
                         Your Cart Is Empty
                     </EmptyMessage>)
                    
                    }
                
            
        </CartItems>
    <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>

    </CartDropdownContainer>
)
}

export default CartDropdown