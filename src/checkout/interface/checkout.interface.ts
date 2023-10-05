export interface Checkout {
        userId: string;
        cartId: string;
        totalAmount: number;
        paymentSuccess: boolean;
        paymentLink: string;
}
