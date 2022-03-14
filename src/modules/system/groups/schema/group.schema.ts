import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Rule } from '../../rules/schema/rule.schema';
import { Role } from '../../roles/schema/role.schema';

@Schema()
export class Group {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  @Prop({ required: true, name: '用户组名称', type: String })
  uGroupName: string;

  @Prop({ required: true, name: '组织标识', type: String })
  uOrgName: string;

  @Prop({ required: true, name: '工作台标识', type: String })
  workplace: string;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  adminUsers: User[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  users: User[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Rule',
  })
  uRules: Rule[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
  })
  uRoles: Role[];
}

export type GroupDocument = Group & Document;

export const GroupSchema = SchemaFactory.createForClass(Group);
