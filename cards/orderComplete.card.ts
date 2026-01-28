export function orderCompleteCard(order: {
  orderId: string;
  product: {
    name: string;
    image: string;
    quantity: number;
  };
  seller: string;
  estimatedDelivery: string;
  totalPaid: number;
}) {
  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      // Success header
      {
        type: "TextBlock",
        text: "✔ Purchase complete",
        weight: "Bolder",
        size: "Medium",
        color: "Good"
      },

      // Product row
      {
        type: "ColumnSet",
        spacing: "Medium",
        columns: [
          {
            type: "Column",
            width: "auto",
            items: [
              {
                type: "Image",
                url: order.product.image,
                size: "Medium",
                style: "RoundedCorners"
              }
            ]
          },
          {
            type: "Column",
            width: "stretch",
            items: [
              {
                type: "TextBlock",
                text: order.product.name,
                weight: "Bolder",
                wrap: true
              },
              {
                type: "TextBlock",
                text: `Quantity: ${order.product.quantity}`,
                spacing: "None",
                isSubtle: true
              }
            ]
          }
        ]
      },

      // Divider
      {
        type: "TextBlock",
        text: "",
        separator: true
      },

      // Order metadata
      {
        type: "FactSet",
        facts: [
          {
            title: "Estimated delivery",
            value: order.estimatedDelivery
          },
          {
            title: "Sold by",
            value: order.seller
          },
          {
            title: "Paid",
            value: `$${order.totalPaid.toFixed(2)}`
          }
        ]
      }
    ],

    actions: [
      {
        type: "Action.Submit",
        title: "View order details",
        data: {
          action: "VIEW_ORDER",
          orderId: order.orderId
        }
      }
    ]
  };
}
