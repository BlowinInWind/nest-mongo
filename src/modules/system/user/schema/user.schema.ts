import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Group } from '../../groups/schema/group.schema';
import { Role } from '../../roles/schema/role.schema';
import { Rule } from '../../rules/schema/rule.schema';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  // 用户名
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @ApiProperty({
    type: String,
  })
  username: string;

  // 密码
  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    type: String,
  })
  passwd: string;

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty({
    type: String,
  })
  uOrgName: string;

  @Prop({
    type: Boolean,
  })
  @ApiProperty({
    type: Boolean,
  })
  isDimission?: boolean;

  @Prop({
    type: Boolean,
  })
  @ApiProperty({
    type: Boolean,
  })
  isInitial?: boolean;

  staff: Staff;

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
  })
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
  })
  userGroups: Group[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Role',
  })
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
  })
  uRoles: Role[];

  @Prop({
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Rule',
  })
  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
  })
  uRules: Rule[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
