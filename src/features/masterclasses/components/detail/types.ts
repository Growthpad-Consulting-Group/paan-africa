export type AppliedPromo = {
  id: string;
  code: string;
  description?: string | null;
  discountType: string;
  discountValue: number;
  /** Amount taken off, already capped at the base price */
  discountAmount: number;
  minimumAmount?: number | null;
  maximumDiscount?: number | null;
};

export type CustomerInfo = { name: string; email: string; phone: string; organization: string };
