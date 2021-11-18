import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe('pk_test_51GzedJB6K2j78C8nE73uookKYLjSOzySipFBaYLnrug4HEGQNvIjDwS4QreoY1Ztc9nM5l4BZpYyiRUMalOrPoqO00XzEJuy0L')

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`https://hidden-ravine-94764.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId])
    return (
        <div>
            <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName} </h2>
            <h4>Pay: ${appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckOutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;

/*
1.install stripe and stripe-react
2.set publishable key
3.Elements
4.CheckOut Form
-----------
5. Create payment method
6.server create payment Intent api
7.load client secret
8.confirm card payment
9.handle user error
 */
