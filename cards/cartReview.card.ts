export function cartReviewCard(cart: {
  sku: string;
  name: string;
  qty: number;
  price: number;
}[]) {
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: "Your cart",
        weight: "Bolder",
        size: "Medium"
      },
      ...cart.map(i => ({
        type: "TextBlock",
        text: `${i.qty} × ${i.name} — $${i.price * i.qty}`,
        wrap: true
      })),
      {
        type: "TextBlock",
        text: `Total: $${total}`,
        weight: "Bolder"
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Checkout",
        data: {
          action: "CHECKOUT"
        }
      }
    ]
  };
}
