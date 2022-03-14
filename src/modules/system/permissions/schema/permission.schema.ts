import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Permission {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  @Prop({ required: true, name: '对象名称', type: String })
  uTarget: string;

  @Prop({ type: String })
  appNS?: string;

  @Prop({ required: true, name: '工作台标识', type: [String] })
  uActions: string[];
}

export type PermissionDocument = Permission & Document;

export const PermissionSchema = SchemaFactory.createForClass(Permission);
