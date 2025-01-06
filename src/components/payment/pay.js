/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PaymentForm from '../../components/payment/PaymentForm';
import { Container } from 'react-bootstrap';

const Pay = () => {
  const bookingID = localStorage.getItem('bookingID');
  const bookingEmail = localStorage.getItem('bookingEmail');
  const amountToPay = localStorage.getItem('amountToPay');

  return (
    <div className='row'>
      <div className='col-sm-6 col-md-4 col-lg-4 mx-auto'>
         <br/>
         <br/>
         <h4>Total Amount to pay: $ {amountToPay}</h4>
         <br/>
        <PaymentForm
          bookingEmail={bookingEmail}
          bookingID={bookingID}
          amountToPay={amountToPay}
        />
      </div>
    </div>
  );
};

export default Pay;
