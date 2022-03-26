import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiException } from '../exceptions';
import { values } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('pipe prev');

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    // errors[0].constraints.isNotEmpty
    if (errors.length > 0) {
      const msg = values(errors[0].constraints)[0];

      throw new ApiException(msg);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
