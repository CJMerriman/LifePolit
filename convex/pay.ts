import { Surpay } from "@surgent/pay-convex";

const pay = new Surpay({
  apiKey: process.env.SURGENT_API_KEY!,
  identify: async () => {
    return null;
  },
});

export const {
  guestCheckout,
  check,
  listProducts,
} = pay.api();
