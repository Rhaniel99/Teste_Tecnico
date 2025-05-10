import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private config: ConfigService) {
    // 1) informa ao TS que espera string
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    // 2) valida em tempo de execução
    if (!secretKey) {
      // aqui você pode lançar um erro mais específico ou usar InternalServerErrorException
      throw new InternalServerErrorException('STRIPE_SECRET_KEY não está definida');
    }
    // 3) agora TS sabe que secretKey é string
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-04-30.basil',
    });
  }

  async create(createStripeDto: CreateStripeDto) {
    const { amount, currency = 'brl', metadata } = createStripeDto;

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // valor em centavos
        currency, // moeda do pagamento (padr o: BRL)
        metadata, // dados adicionais do pagamento
      });
      return { clientSecret: paymentIntent.client_secret }; // clientSecret do PaymentIntent
    } catch (err) {
      throw new InternalServerErrorException(`Erro ao criar PaymentIntent: ${err.message}`);
    }
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
