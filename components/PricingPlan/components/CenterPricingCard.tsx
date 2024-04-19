// @ts-nocheck
import KhaltiCheckout from "khalti-checkout-web";

import config from "lib/utilities/payment/KhaltiConfig";

type PropType = {
  priceTag: string;
  title: string;
  description: string;
  priceAmount: number | null;
  children: React.ReactNode;
};

function CenterPricingCard({ priceTag, title, description, priceAmount, children }: PropType) {
  return (
    <div className='priceCard centerPricingCard'>
      <h1>{priceTag}</h1>
      <h2 className='intel_700'>{title}</h2>
      <p>{children}</p>
      <button
        type='button'
        onClick={() => {
          if (priceAmount) {
            new KhaltiCheckout(config).show({ amount: priceAmount * 100 });
          } else {
            alert("something went wrong");
          }
        }}
        className='cursor'
      >
        <strong>Buy Now</strong>
      </button>
    </div>
  );
}

export default CenterPricingCard;
