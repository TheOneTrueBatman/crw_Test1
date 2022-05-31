import { createContext, useEffect, useState } from "react";

const addCartItem=(cartItems, productToAdd)=>{
    
    const existingCartItem= cartItems.find(
        (cartItem)=>cartItem.id==productToAdd.id);

        if(existingCartItem){
            return cartItems.map((cartItem)=>cartItem.id==productToAdd.id ?
            {...cartItem,quantity:cartItem.quantity+1}
            :cartItem
            );
        }



return [...cartItems, {...productToAdd, quantity:1}];
} 


const removeCartItem=(cartItems, product)=>{

    const existingCartItem= cartItems.find(
        (cartItem)=>cartItem.id==product.id);


if(existingCartItem.quantity==1){
    return deleteCartItem(cartItems,product);

}
else 
return cartItems.map((cartItem)=>cartItem.id==product.id ?
            {...cartItem,quantity:cartItem.quantity-1}
            :cartItem
            );
}
 

const deleteCartItem=(cartItems, product)=> 
cartItems.filter(cartItem=>cartItem.id!= product.id);


export const CartContext= createContext({
    isCartOpen: false,
    setIsCartOpen:()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    deleteItem: ()=>{},
    removeItemFromCart: ()=>{},
    count: 0,
    cartTotal: 0
})




export const CartProvider=({children})=>{
    const[isCartOpen, setIsCartOpen]= useState(false);
    const [cartItems, setCartItems]= useState([]);
    const [count,setCount]= useState(0);
    const [cartTotal, setCartTotal]=useState(0);

    useEffect(()=>{
        const newCount= cartItems.reduce((total, cartItem)=>total+cartItem.quantity,0)
        setCount(newCount);
    },[cartItems])

    useEffect(()=>{
        const newTotal= cartItems.reduce((total, cartItem)=>total+cartItem.quantity*cartItem.price,0)
        setCartTotal(newTotal);
    },[cartItems])

    const removeItemFromCart=(product)=>{
        setCartItems(removeCartItem(cartItems,product));
    
    }

    const deleteItem=(product)=>{
        setCartItems(deleteCartItem(cartItems,product));
    
    }

    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    
    }
    
    const value ={isCartOpen, cartTotal,setCartTotal , setIsCartOpen, addItemToCart,removeItemFromCart, deleteItem , cartItems,count,setCount}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>; 
}