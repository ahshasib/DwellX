import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useEffect, useState } from 'react'
import {ClipLoader} from 'react-spinners'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';


const CheckoutForm = ({offerAmount, offerId,close,onPaymentSuccess,sellerEmail}) => {
    const {user} = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCardError] = useState(null)
    const [processing,setProcessing] = useState(false)
    const [clientSecret,setClientSecret] = useState('')

    useEffect(()=>{
    const getClientSecret = async () =>{
        const {data} = await axiosSecure.post('/create-payment-intent',{offerId:offerId})
        setClientSecret(data?.clientSecret)

    }
    getClientSecret()
    },[axiosSecure,offerId])
  
    const handleSubmit = async (event) => {
        setProcessing(true)
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setCardError(error.message)
        setProcessing(false)
        return
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setCardError(null)
      }

      //taka kata hobe 

      const result = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email:user?.email
          },
        },
      })
     
      if(result?.error){
        setCardError(result?.error?.message)
        return
      }
      if(result?.paymentIntent?.status === 'succeeded'){
        const orderData = {
            offerId,
            amount: offerAmount,
            email: user?.email,
            transactionId: result?.paymentIntent?.id,
            status: 'paid',
            date: new Date(),
            sellerEmail: sellerEmail
        };
    
        try{
            const {data} = await axiosSecure.post('/order', orderData)
            if(data?.insertedId){
              close(); 
               Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: 'Thank you for your purchase.',
                    confirmButtonColor: '#6366F1'
                })
                onPaymentSuccess();
                
            }
        } catch(err){
            console.error("Order Save Error:", err)
        } finally {
            setProcessing(false)
            setCardError(null)
        }
    }
    
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {cardError && <p className='text-red-500 mb-3'>{cardError}</p>}

        <button className=' btn bg-green-100 text-green-800  px-5 mt-5' type="submit" disabled={!stripe || processing}>
          {processing ? <ClipLoader size={24}/> : `Pay ${offerAmount}$`}
        </button>
      </form>
    );
}

export default CheckoutForm