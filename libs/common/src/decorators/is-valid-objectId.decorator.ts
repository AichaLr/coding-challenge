import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectIdConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isObjectId' })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Types.ObjectId.isValid(value);
  }

  defaultMessage(): string {
    return 'Invalid ObjectId';
  }
}
