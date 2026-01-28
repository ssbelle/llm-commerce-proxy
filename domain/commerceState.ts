export type CommerceState = {
  step: CommerceStep;
  sku?: string;
  quantity?: number;
  cart?: {
    sku: string;
    qty: number;
  }[];
};
