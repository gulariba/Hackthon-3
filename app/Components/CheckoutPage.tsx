'use client'

import { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubCurrency from '../lib/ConvertToSubCurrency'

const CheckoutPage = ({ amount }: { amount: number }) => {
    const [errorMessage, setError] = useState<string>()
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const [URL, setURL] = useState('')

    useEffect(() => {
        // Check if we are on the client-side (window exists)
        if (typeof window !== 'undefined') {
            const myHost = window.location.host
            setURL(myHost === 'localhost:3000' ? 'http://localhost:3000' : 'https://stripe-payment-one-nu.vercel.app')
        }

        // Fetch client secret whenever the amount changes
        fetch('api/payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: convertToSubCurrency(amount) })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [amount])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Error handling: Check if stripe and elements are ready
        if (!stripe || !elements || !clientSecret) {
            setError('Stripe has not yet initialized.')
            setLoading(false)
            return
        }

        // Handle payment submission using the Payment Element
        const paymentElement = elements.getElement(PaymentElement)

        if (!paymentElement) {
            setError('Payment element not found.')
            setLoading(false)
            return
        }

        const { error: submitErrors } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${URL}/payment-success?amount=${amount}`
            }
        })

        if (submitErrors) {
            setError(submitErrors.message)
            setLoading(false)
            return
        }

        // Successful payment
        setError('')
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className='p-8'>
            {clientSecret && <PaymentElement />}
            <button
                type="submit"
                className={`w-full bg-black text-white py-2 mt-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>
    )
}

export default CheckoutPage
