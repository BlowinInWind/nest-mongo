import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './schema/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {}

  async getUserGroupsByUserId(userId): Promise<Group[]> {
    const groups = await this.groupModel.find({
      $or: [{ users: userId }, { adminUsers: userId }],
    });

    return groups;
  }

  async getPermissionsByUsernameOrUOrgName(username, uOrgName) {
    return await this.groupModel
      .find({ uOrgName })
      .or([{ users: username }, { adminUsers: username }]);
  }
}
