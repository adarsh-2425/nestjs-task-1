// checkout.dto.ts
export class CreateCheckoutDto {
    readonly userId: string;
    readonly cartId: string;
    readonly totalAmount: number;
    readonly paymentSuccess: boolean;
  }
  