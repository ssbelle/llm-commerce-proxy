export function searchResultsCard(products: {
  sku: string;
  name: string;
  price: number;
  image: string;
}[]) {
  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: "Search results",
        weight: "Bolder",
        size: "Medium"
      },
      ...products.slice(0, 10).map(p => ({
        type: "Container",
        separator: true,
        items: [
          {
            type: "ColumnSet",
            columns: [
              {
                type: "Column",
                width: "auto",
                items: [
                  {
                    type: "Image",
                    url: p.image,
                    size: "Small"
                  }
                ]
              },
              {
                type: "Column",
                width: "stretch",
                items: [
                  {
                    type: "TextBlock",
                    text: p.name,
                    wrap: true,
                    weight: "Bolder"
                  },
                  {
                    type: "TextBlock",
                    text: `$${p.price}`,
                    spacing: "None"
                  }
                ]
              },
              {
                type: "Column",
                width: "auto",
                items: [
                  {
                    type: "ActionSet",
                    actions: [
                      {
                        type: "Action.Submit",
                        title: "View",
                        data: {
                          action: "VIEW_PRODUCT",
                          sku: p.sku
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }))
    ]
  };
}
