export const SHIPPING_CONTINENTAL_BASE = 10; // EUR, before IVA
export const SHIPPING_IVA_RATE = 0.23;
export const SHIPPING_FREE_THRESHOLD = 150; // EUR

export type ShippingResult =
  | { type: "free"; cost: 0; label: "Grátis" }
  | { type: "fixed"; cost: number; label: string }
  | { type: "on_request"; cost: null; label: "Sob consulta" };

/** Returns whether the selected country zone is Portugal Continental */
export function isContinentalPortugal(country: string): boolean {
  return country === "PT";
}

/** Returns whether the selected zone is islands or international (requires quote) */
export function isOnRequest(country: string): boolean {
  return !isContinentalPortugal(country);
}

export function calculateShipping(country: string, subtotal: number): ShippingResult {
  if (isOnRequest(country)) {
    return { type: "on_request", cost: null, label: "Sob consulta" };
  }
  if (subtotal >= SHIPPING_FREE_THRESHOLD) {
    return { type: "free", cost: 0, label: "Grátis" };
  }
  const cost = parseFloat(
    (SHIPPING_CONTINENTAL_BASE * (1 + SHIPPING_IVA_RATE)).toFixed(2)
  );
  return {
    type: "fixed",
    cost,
    label: `€${cost.toFixed(2)} (10€ + IVA)`,
  };
}

export function computeTotal(subtotal: number, shipping: ShippingResult): number {
  return subtotal + (shipping.cost ?? 0);
}
