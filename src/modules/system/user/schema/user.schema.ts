import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Group } from '../../groups/schema/group.schema';
import { Role } from '../../roles/schema/role.schema';
import { Rule } from '../../rules/schema/rule.schema';

interface Staff {
  name?: string;
  staffId?: string;
  mail?: string;
}

@Schema()
export class User {
  @Prop({
    // select: false,
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  // 用户名
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;

  // 密码
  @Prop({
    type: String,
    required: true,
  })
  passwd: string;

  @Prop({
    type: String,
    required: true,
  })
  uOrgName: string;

  @Prop({
    type: Boolean,
  })
  isDimission?: boolean;

  @Prop({
    type: Boolean,
  })
  isInitial?: boolean;

  staff: Staff;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
  })
  userGroups: Group[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
  })
  uRoles: Role[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Rule',
  })
  uRules: Rule[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
