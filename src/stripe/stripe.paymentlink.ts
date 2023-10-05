const stripe = require('stripe')(process.env.secretkey);

export async function createPaymentLink(current_user_id: string, totalAmount: number): Promise<string> {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: totalAmount * 100,
            product_data: {
              name: 'Checkout for Ecommerce app by Adam Tech'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: current_user_id
      },
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel'
    });
  
    return session.url;
  }