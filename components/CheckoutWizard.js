import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap mx-auto max-w-screen-md">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'text-zinc-50 bg-gradient-to-bl from-zinc-900 via-zinc-700 to-zinc-900 p-2 mx-1 border-none rounded-2xl my-2 w-full text-sm'
           : 'bg-gray-100 text-gray-500 p-2 mx-1 border-none rounded-2xl my-2 w-full text-sm'
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
