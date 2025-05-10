import { apiClient } from "./api";

export interface CreateStripeDto {
  amount: number;
  currency?: string;
  metadata?: Record<string,string>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}

export const createStripe = async (
  input: CreateStripeDto
): Promise<PaymentIntentResponse> => {
  const { data } = await apiClient.post<PaymentIntentResponse>(
    "/stripe",
    input
  );
  return data;
};
