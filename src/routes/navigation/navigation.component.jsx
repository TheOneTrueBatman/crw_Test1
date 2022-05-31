import {  Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
// import './navigation.styles.scss';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from "./navigation.styles";


const Navigation = ()=>{
  const{currentUser, setCurrentUser }= useContext(UserContext)
 const {isCartOpen}= useContext(CartContext);
  
  

    return(
  <Fragment>
      <NavigationContainer>
          <LogoContainer to='/'>
          <CrwnLogo className="logo"/>
          </LogoContainer>
        

    <NavLinks>
    <NavLink to='/shop'>
            SHOP
        </NavLink> 
         {
          currentUser ?(
            <NavLink as = 'span' onClick={signOutUser}>SIGN OUT</NavLink>
          ): (  
             <NavLink className="nav-link" to='/auth'>
          SIGN IN
      </NavLink>
      )}
      <CartIcon />
    </NavLinks>
    {isCartOpen && <CartDropdown/>}
    </NavigationContainer>
    <Outlet/>
  </Fragment>
  
  
    )
  
  }
  export default Navigation