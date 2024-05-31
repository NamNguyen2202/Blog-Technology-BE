import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SignUpDto } from '../../Dto/UserDto';

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
  ): Promise<{ success: boolean; userName?: string; message?: string }> {
    try {
      const data = await this.dataSource.query(
        'INSERT INTO "Users" ("userName", phone, "password") VALUES($1, $2, $3) RETURNING "userName"',
        [user.userName, user.phone, user.password],
      );
      if (data.length > 0) {
        return { success: true, userName: user.userName };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false };
    }
  }

  async checkSignIn(
    userName: string,
    password: string,
  ): Promise<{
    success: boolean;
    userId?: number;
    userName?: string;
    message?: string;
  }> {
    const result = await this.dataSource.query(
      'SELECT "userName","userId" FROM "Users" WHERE "userName" = $1 AND "password" = $2',
      [userName, password],
    );
    if (result.length > 0) {
      return {
        success: true,
        userId: result.userId,
        userName: result[0].userName,
      };
    } else {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc mật khẩu không đúng.',
      };
    }
  }

  async getUserIdByUserName(userName: string): Promise<number | null> {
    try {
      const result = await this.dataSource.query(
        'SELECT "userId" FROM "Users" WHERE "userName" = $1',
        [userName],
      );
      if (result.length > 0) {
        return result[0].userId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
      return null;
    }
  }

  async getUserNameByUserId(userId: number): Promise<string | null> {
    try {
      const result = await this.dataSource.query(
        'SELECT "userName" FROM "Users" WHERE "userId" = $1',
        [userId],
      );
      if (result.length > 0) {
        return result[0].userId;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
      return null;
    }
  }

  async changePass(
    userName: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const userResult = await this.dataSource.query(
        'SELECT "password" FROM "Users" WHERE "userName" = $1',
        [userName],
      );
      if (userResult.length === 0) {
        return { success: false, message: 'Không có user nào!!!' };
      }
      const storedPassword = userResult[0].password;
      if (storedPassword !== currentPassword) {
        return {
          success: false,
          message: 'Mật khẩu của bạn đã nhập không đúng',
        };
      }
      const updateResult = await this.dataSource.query(
        'UPDATE "Users" SET "password" = $1 WHERE "userName" = $2',
        [newPassword, userName],
      );

      if (updateResult) {
        return { success: true, message: 'Mật khẩu đã thay đổi thành công' };
      } else {
        return { success: false, message: 'Thất bại khi thay đổi mật khẩu' };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while changing password',
      };
    }
  }
}
