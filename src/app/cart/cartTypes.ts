export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  productId?: number;
  /** Product page slug when available (preferred over productId in URLs). */
  slug?: string | null;
  variantKey?: string;
  catalogPrice?: number;
  discountPercent?: number | null;
}

