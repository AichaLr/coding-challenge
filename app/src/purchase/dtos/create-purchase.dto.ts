import { ERROR_MESSAGES } from '@app/common/constants/error-messages';
import { IsObjectId } from '@app/common/decorators/is-valid-objectId.decorator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty({
    message: ERROR_MESSAGES.VALIDATION_ERROR_MESSAGES.PRODUCT_ID_REQUIRED,
  })
  @IsString()
  @IsObjectId()
  id: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  quantity: number;
}
