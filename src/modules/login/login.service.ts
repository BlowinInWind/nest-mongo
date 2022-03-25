import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GroupsService } from '../system/groups/groups.service';
import { User } from '../system/user/schema/user.schema';

@Injectable()
export class LoginService {
  constructor(private readonly groupService: GroupsService) {}

  async generateSessionRBACData(session, userDoc: User) {
    const username = userDoc.username;
    const uOrgName = userDoc.uOrgName;
    const mail = userDoc?.staff?.mail;

    session.username = username;
    session.userData = session?.userData ?? {};
    session.userData.uOrgName = uOrgName;
    session.userData.email = mail;
    const userGroupDocs = await this.groupService.getUserGroupsByUserId(
      userDoc._id,
    );

    const ugNameArray = userGroupDocs.map((item) => item.uGroupName);

    session.userData.ugNameArray = ugNameArray;
  }

  async getPermissionsByUsername(username, uOrgName) {
    const userGroupDocs =
      await this.groupService.getPermissionsByUsernameOrUOrgName(
        username,
        uOrgName,
      );
  }

  async login(req: Request, session) {
    const user = req.user as User;

    session.login = true;
    this.generateSessionRBACData(session, user);
    // this.getPermissionsByUsername(user.username, user.uOrgName);

    return user;
  }
}
