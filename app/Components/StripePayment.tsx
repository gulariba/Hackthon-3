"use client";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from '../CheckOut/page';
import convertToSubCurrency from '../lib/ConvertToSubCurrency';

// Ensure that the Stripe publishable key is defined
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
    throw new Error('Stripe publishable key is not defined');
}

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(stripePublishableKey);

const StripePayment = () => {
    const amount = 49.99;

    return (
        <div>
            <h1 className='text-6xl font-bold text-center'>
                Areeba Ahmed has requested ${amount}
            </h1>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubCurrency(amount),
                    currency: 'usd'
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </div>
    );
};

export default StripePayment;
