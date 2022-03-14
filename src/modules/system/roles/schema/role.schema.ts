import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Permission } from '../../permissions/schema/permission.schema';

@Schema()
export class Role {
  @Prop({
    // select: false,
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  @Prop({
    type: String,
    required: true,
    name: '组织名称',
  })
  uRoleName: string;

  @Prop({ type: Boolean })
  isAdmin: boolean;

  @Prop({ type: String, name: '描述' })
  desc?: string;

  @Prop({ type: String, name: '组织名称' })
  uOrgName: string;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Permission',
  })
  uPermissions: Permission[];
}

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);
