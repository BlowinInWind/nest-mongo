import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Rule {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  _id: ObjectId;

  @Prop({ required: true, name: '规则键值', type: String })
  uRuleKey: string;

  @Prop({ required: true, name: '规则名称', type: String })
  uRuleName: string;

  @Prop({ type: String })
  appNS: string;

  @Prop({
    default: {},
    type: Object,
  })
  uRuleData: any;
}

export type RuleDocument = Rule & Document;

export const RuleSchema = SchemaFactory.createForClass(Rule);
