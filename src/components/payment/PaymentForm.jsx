/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Button from "./Button";
import SelectWithErrorCustomSelect from "./Select";
const BASE_URL = "https://api.bookme.rw/api/v1";

const CreatePayMentSession = async ({ amountToPay }) => {
  
  const res = await fetch(`${BASE_URL}/payments/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: amountToPay }),
  });

  console.log(res);

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData?.message || "An error occurred during booking.";
    throw new Error(errorMessage);
  }

  const payment = await res.json();
  console.log('payment here', payment);
  return payment;
};

const PaymentForm = ({ amountToPay, bookingID, bookingEmail }) => {
  let Checkout;
    if (typeof window !== "undefined") {
      // @ts-ignore
      Checkout = window.Checkout;
    }


  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const paymentMethods = [
    { value: "visa", label: "Visa card" },
    { value: "mastercard", label: "Mastercard" },
    { value: "bank", label: "Bank transfer" },
  ];

  const pay = (sessionId, uid) => {
    console.log('Checkkout here', Checkout);
    Checkout.configure({
      session: {
        id: `${sessionId}`,
      },
      merchant: process.env.REACT_APP_MERCHANT,
      order: {
        amount: amountToPay,
        currency: "USD",
        description: `Payment for booking with GoDiscoverSafaris via bookme.rw for amount ${amountToPay}`,
        id: uid,
        reference: uid,
      },
      transaction: {
        reference: uid,
      },
      interaction: {
        operation: "PURCHASE",
        merchant: {
          name: "GODISCOVER AFRICA LTD",
          address: {
            line1: "kicukiro",
          },
        },
      },
    });
    Checkout.showLightbox();
  };

  const { mutate, isLoading } = useMutation({
    async onSuccess(data) {
      console.log(data);
      const uid = Math.abs(new Date().valueOf());
      localStorage.setItem("bookingID", bookingID);
      localStorage.setItem("bookingEmail", bookingEmail);
      console.log(data.sessionId, uid);
      pay(data.sessionId, uid);
    },
    onError(error) {
      toast.error(error.message ?? "An error occurred during payment session.");
    },
    mutationFn: () => CreatePayMentSession({ amountToPay }),
  });

  return (
    <>
      {/* load mastercard payment javascript */}
      <script
        src="https://ap-gateway.mastercard.com/checkout/version/61/checkout.js"
        data-error="errorCallback"
        data-cancel="cancelCallback"
        data-complete="completeCallback"
      />

      <script src="/public/script.js" />

      <div className="flex flex-col gap-2">
        <p className="text-co-black font-bold text-base">
          How Do You Want To Pay.
        </p>
        <SelectWithErrorCustomSelect
          name={"paymentMethod"}
          options={paymentMethods}
          placeholder="Select payment option"
          onChange={(e) => setSelectedPaymentMethod(e?.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button
          disabled={isLoading || !selectedPaymentMethod}
          onClick={mutate}
          variant="success"
          size="md"
          className="mt-3"
        >
          {isLoading ? "Loading..." : "Pay now"}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;

