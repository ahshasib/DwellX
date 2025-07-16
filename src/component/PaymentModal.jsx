import React from 'react'
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentModal = ({ id, title,offerAmount,offerId,onPaymentSuccess,sellerEmail }) => {
    const closeModal = () => {
        document.getElementById(id).close();
    };

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4 text-center">{title}</h3>

                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                    offerAmount={offerAmount}
                    offerId={offerId}
                    close={closeModal}
                    onPaymentSuccess = {onPaymentSuccess}
                    sellerEmail = {sellerEmail}
                    />
                </Elements>

                <div className="modal-action justify-center">
                    <form method="dialog">
                        <button
                            className="btn btn-outline btn-sm"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};


export default PaymentModal