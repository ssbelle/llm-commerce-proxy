// TODO: replace with Foundry SDK client
async function callFoundry(message: string) {
  // This is where you call your Foundry agent
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

  // Stub response (Foundry wiring comes next)
  return res.status(200).json({
    message: `Foundry received: ${message}`,
    adaptiveCard: {
      type: "AdaptiveCard",
      version: "1.5",
      body: [
        {
          type: "TextBlock",
          text: "This response came from Vercel",
          weight: "Bolder"
        }
      ]
    }
  });
}
