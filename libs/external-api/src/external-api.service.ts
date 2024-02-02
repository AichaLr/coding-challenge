import { LoggerService } from '@app/common/logger/logger.service';
import { ConfigService } from '@app/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CreditCard, CreditCardApiResponse } from './interfaces';

@Injectable()
export class ExternalApiService {
  constructor(
    private readonly configService: ConfigService,
    private logger: LoggerService,
  ) {}

  async getCreditCards(limit: number) {
    try {
      const size = limit || 10;
      const API_URL = this.configService.get<string>('RANDOM_DATA_API_URL');
      const response: AxiosResponse<CreditCardApiResponse[]> = await axios.get(
        `${API_URL}?size=${size}`,
      );
      const visaCreditCards: CreditCard[] = this.filterVisaCards(response.data);
      this.logger.log('ExternalApiService', 'Fetching visa credit cards');
      return visaCreditCards;
    } catch (error) {
      this.logger.error('ExternalApiService', 'An Error Occurred', error.stack);
      return null;
    }
  }

  private filterVisaCards(creditCards: CreditCardApiResponse[]): CreditCard[] {
    const visaCards = creditCards
      .filter((card) => card.credit_card_type.toLowerCase() === 'visa')
      .map((card) => ({
        card_uuid: card.uid,
        card_type: card.credit_card_type,
        card_expiry_date: card.credit_card_expiry_date,
      }));
    return visaCards;
  }
}
