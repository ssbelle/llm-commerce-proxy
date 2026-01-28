import { CommerceStep } from "../domain/commerceSteps";
import { CommerceState } from "../domain/commerceState";

import { searchResultsCard } from "../cards/searchResults.card";
import { productDetailCard } from "../cards/productDetail.card";
import { checkoutReviewCard } from "../cards/checkoutReview.card";
import { orderCompleteCard } from "../cards/orderComplete.card";

// ---- Mock data (replace later with Foundry / backend calls)
const PRODUCTS = [
  {
    sku: "PAPER-001",
    name: "Staples Copy Paper – 20 lb",
    price: 84.99,
    image: "https://example.com/paper.jpg",
    description: "Reliable copy paper for everyday office use."
  },
  {
    sku: "PAPER-002",
    name: "Staples Multiuse Paper – 20 lb",
    price: 97.99,
    image: "https://example.com/multiuse.jpg",
    description: "Versatile paper for printers and copiers."
  }
];

// ---- State transition logic (THE BRAIN)
function transitionState(
  state: CommerceState,
  input: {
    action?: string;
    sku?: string;
    quantity?: number;
  }
): CommerceState {
  switch (state.step) {
    case CommerceStep.SEARCH_RESULTS:
      if (input.action === "VIEW_PRODUCT" && input.sku) {
        return {
          step: CommerceStep.PRODUCT_DETAIL,
          sku: input.sku
        };
      }
      return state;

    case CommerceStep.PRODUCT_DETAIL:
      if (input.action === "ADD_TO_CART" && input.sku) {
        return {
          step: CommerceStep.CHECKOUT_REVIEW,
          cart: [
            {
              sku: input.sku,
              qty: input.quantity ?? 1
            }
          ]
        };
      }
      return state;

    case CommerceStep.CHECKOUT_REVIEW:
      if (input.action === "CONFIRM_ORDER") {
        return {
          ...state,
          step: CommerceStep.ORDER_COMPLETE
        };
      }
      return state;

    default:
      return state;
  }
}

// ---- Card selector (THE UI DECISION)
function cardForState(state: CommerceState) {
  switch (state.step) {
    case CommerceStep.SEARCH_RESULTS:
      return searchResultsCard(PRODUCTS);

    case CommerceStep.PRODUCT_DETAIL: {
      const product = PRODUCTS.find(p => p.sku === state.sku);
      return product ? productDetailCard(product) : null;
    }

    case CommerceStep.CHECKOUT_REVIEW: {
      const cartItems =
        state.cart?.map(item => {
          const product = PRODUCTS.find(p => p.sku === item.sku);
          return {
            sku: item.sku,
            name: product?.name ?? "Unknown item",
            qty: item.qty,
            price: product?.price ?? 0
          };
        }) ?? [];

      return checkoutReviewCard(cartItems);
    }

    case CommerceStep.ORDER_COMPLETE:
      return orderCompleteCard("https://www.staples.ca/order/12345");

    default:
      return null;
  }
}

// ---- HTTP ENTRYPOINT (BORING ON PURPOSE)
export default async function handler(req: any, res: any) {
  const {
    message,
    action,
    sku,
    quantity,
    state: incomingState
  } = req.body ?? {};

  // Initialize state if first turn
  const state: CommerceState = incomingState ?? {
    step: CommerceStep.SEARCH_RESULTS
  };

  // Transition state based on user action
  const nextState = transitionState(state, { action, sku, quantity });

  // Pick the correct UI
  const adaptiveCard = cardForState(nextState);

  return res.status(200).json({
    message: "Here’s what I found",
    adaptiveCard,
    state: nextState
  });
}

