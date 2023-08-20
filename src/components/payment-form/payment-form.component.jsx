import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const currentUser = useSelector(selectCurrentUser);
  const cartTotal = useSelector(selectCartTotal);
  const stripe = useStripe();
  const elements = useElements();

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const paymentHandler = async (event) => {
    event.preventDefault();

    setIsPaymentProcessing(true);

    if (!stripe || !elements) return;

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsPaymentProcessing(false);

    if (paymentResult.error) {
      alert('Payment Failed!');
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('Payment Succeeded');
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Pay using your credit card.</h2>
        <CardElement />
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          shouldShowSpinner={isPaymentProcessing}
        >
          Pay
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
