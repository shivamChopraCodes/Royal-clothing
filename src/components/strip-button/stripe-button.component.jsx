import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import { renderIntoDocument } from 'react-dom/test-utils';

const StripeCheckoutButton = ({ price }) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H3462CMAxFdJJrI3jJg31932afPuXtrLdWlcNkZDxOU3oNmklILRmwNuiB8jUwphPoItTwq134tLdx8XBSWZhEI00pk4UpFD3';
    const onToken = token => {
        console.log(token);
        alert("Payment Successfull");
    }
    return (
        <StripeCheckout
        label='Pay Now'
        name='Royal Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Yout total is $${price}`}
        amount = {priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;