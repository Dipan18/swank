import { FormEvent, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useAppSelector } from '../../hooks/redux-store.hooks';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const cartTotal = useAppSelector(selectCartTotal);
  const stripe = useStripe();
  const elements = useElements();

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
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

    const cardElement = elements.getElement(CardElement);
    if (cardElement === null) return;

    const clientSecret = response.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name:
            currentUser && currentUser.displayName
              ? currentUser.displayName
              : 'Guest',
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
