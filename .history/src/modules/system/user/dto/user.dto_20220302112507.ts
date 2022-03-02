import { ObjectId } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class FindOneUserParams {
  @IsMongoId()
  userId: ObjectId;
}
