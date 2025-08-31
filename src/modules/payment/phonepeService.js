import { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
import { env } from '../../config/env.js';
// there can be error in phone pe as docuntion keep chnahing please refer to official docs
//this is basic phonepe integration example modify as per your requirements
// Ensure to set the environment variables in your .env file
// PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET
// dont share your key secret in public repos
// adjust error handling as needed      
// Initialize PhonePe client
const client = StandardCheckoutClient.getInstance(
  env.phonepe.clientId,
  env.phonepe.clientSecret,
  1, // clientVersion
  Env.SANDBOX // or Env.PRODUCTION in production
);

/**
 * Create a one-time payment order
 */
export const createPayment = async ({ amount, orderId, userId, callbackUrl }) => {
  try {
    const merchantOrderId = orderId || randomUUID();
    const metaInfo = MetaInfo.builder()
      .udf1(userId) // optional, can store userId or other info
      .build();

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount) // in paise
      .redirectUrl(callbackUrl)
      .metaInfo(metaInfo)
      .build();

    const response = await client.pay(request);
    return {
      checkoutPageUrl: response.redirectUrl,
      merchantOrderId,
    };
  } catch (err) {
    console.error('PhonePe createPayment error:', err);
    throw err;
  }
};
