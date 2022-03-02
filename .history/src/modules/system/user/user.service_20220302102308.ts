import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from 'src/common/exceptions';
import { UserDocument, User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<UserDocument>,
  ) {}

  // 获取用户列表
  async list() {
    return await this.userModel.find({}).lean().exec();
  }

  // 根据用户名密码验证用户
  async findUserByNameAndPasswd(username: string, passwd: string) {
    return await this.userModel.findOne({ username, passwd }).lean().exec();
  }

  // 根据id获取用户名
  async findUserById(id): Promise<User> {
    const result = await this.userModel.findOne({ _id: id }).lean();
    if (!result) {
      throw new ApiException('请求参数错误');
    }
    return result;
  }
}
