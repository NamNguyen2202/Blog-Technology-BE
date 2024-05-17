import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SignUpDto } from './UserDto';

@Injectable()
export class UserService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  GetUserId(userId: number): Promise<string> {
    return this.dataSource.query('SELECT * FROM "Users" WHERE "userId" = $1', [
      userId,
    ]);
  }

  GetAllUserId(): Promise<string> {
    return this.dataSource.query('SELECT * FROM "Users"');
  }

  CheckUserName(userName: string): Promise<boolean> {
    const result = this.dataSource
      .query('SELECT * FROM "Users" WHERE "userName" = $1', [userName])
      .then((data) => {
        if (data.length) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
    return result;
  }

  async InsertUser(
    user: SignUpDto,
  ): Promise<{ sessionId: boolean; userName?: string; seccess?: boolean }> {
    try {
      const data = await this.dataSource.query(
        'INSERT INTO "Users" ("userName", phone, "password") VALUES($1, $2, $3) RETURNING "userName"',
        [user.userName, user.phone, user.password],
      );
      if (data.length) {
        return { sessionId: true, userName: user.userName, seccess: true };
      } else {
        return { sessionId: false };
      }
    } catch (error) {
      return { sessionId: false };
    }
  }
}
