// @ts-nocheck
import KhaltiCheckout from "khalti-checkout-web";

import config from "lib/utilities/payment/KhaltiConfig";

type PropType = {
  priceTag: string;
  title: string;
  description: string;
  priceAmount: number | null;
};

export default function SidePricingCard({ priceTag, title, description, priceAmount, children }: PropType) {
  return (
    <div className='priceCard'>
      <h1>{priceTag}</h1>
      <h2 className='intel_700'>{title}</h2>
      <p>{children}</p>

      <div className='priceCard__btnContainer'>
        <button
          type='button'
          onClick={() => {
            if (priceAmount !== null && priceAmount !== undefined) {
              const a = new KhaltiCheckout(config);
              a.show({ amount: priceAmount * 100 });
            } else {
              alert("Price is not specified.");
            }
          }}
          className='cursor'
        >
          <strong>Buy Now</strong>
        </button>
      </div>
    </div>
  );
}
