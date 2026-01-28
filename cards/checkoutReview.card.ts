export function checkoutReviewCard(cart: {
  sku: string;
  name: string;
  qty: number;
  price: number;
}[]) {
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: "Review your order",
        weight: "Bolder",
        size: "Medium"
      },

      ...cart.map(item => ({
        type: "TextBlock",
        text: `${item.qty} × ${item.name} — $${item.qty * item.price}`,
        wrap: true
      })),

      {
        type: "TextBlock",
        text: `Total: $${total}`,
        weight: "Bolder",
        spacing: "Medium"
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Place order",
        data: {
          action: "CONFIRM_ORDER"
        }
      }
    ]
  };
}
