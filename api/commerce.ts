import { CommerceStep } from "../domain/commerceSteps";

const state = {
  step: CommerceStep.SEARCH_RESULTS
};

export const config = {
  runtime: "nodejs"
};

// TODO: replace with Foundry SDK client
async function callFoundry(message: string) {
  return {
    message: `Foundry received: ${message}`,
    adaptiveCard: {
      type: "AdaptiveCard",
      version: "1.5",
      body: [
        {
          type: "TextBlock",
          text: "This response came from Foundry via Vercel",
          weight: "Bolder"
        }
      ]
    }
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body ?? {};

  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  console.log("COPILOT → VERCEL PROXY:", message);

  return res.status(200).json({
  adaptiveCard: {
    type: "AdaptiveCard",
    version: "1.5",
    body: [
      {
        type: "TextBlock",
        text: "✅ Adaptive Card from Vercel",
        size: "Large",
        weight: "Bolder"
      },
      {
        type: "ActionSet",
        actions: [
          {
            type: "Action.Submit",
            title: "Add to Cart",
            data: {
              action: "ADD_TO_CART",
              sku: "SKU-123"
            }
          }
        ]
      }
    ]
  }
})

  
}
