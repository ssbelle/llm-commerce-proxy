export function productDetailCard(product: {
  sku: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}) {
  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "Image",
        url: product.image,
        size: "Large"
      },
      {
        type: "TextBlock",
        text: product.name,
        weight: "Bolder",
        size: "Medium"
      },
      {
        type: "TextBlock",
        text: `$${product.price}`,
        weight: "Bolder"
      },
      {
        type: "TextBlock",
        text: product.description,
        wrap: true
      }
    ],
    actions: [
      {
        type: "Action.Submit",
        title: "Easy Buy",
        data: {
          action: "ADD_TO_CART",
          sku: product.sku,
          quantity: 1
        }
      }
    ]
  };
}
