import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Group {}

export type GroupDocument = Group & Document;

export const UserSchema = SchemaFactory.createForClass(Group);
