import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { auth } from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';


const Header = ({currentUser, hidden})=>(
    <HeaderContainer>
      <LogoContainer to = '/'>
        <Logo className='logocontainer' />
      </LogoContainer>
      <OptionsContainer>
          <OptionLink to='/shop'>SHOP</OptionLink>
          <OptionLink to='/shop'>CONTACT US</OptionLink>
          { 
            currentUser ?
            <OptionLink as='div' onClick={()=>auth.signOut()}>SIGN OUT</OptionLink>
            :
            <OptionLink to='/signin'>SIGN IN</OptionLink>
          }
          <CartIcon />
      </OptionsContainer>
      {!hidden && <CartDropdown />}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  hidden : selectCartHidden
})

export default connect(mapStateToProps)(Header);