import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SignUpDto } from '../../Dto/UserDto';
import * as bcrypt from 'bcrypt';

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
  ): Promise<{ success: boolean; userName?: string; message?: string }> {
    const result = await this.dataSource.query(
      'SELECT "userName" FROM "Users" WHERE "userName" = $1 AND "password" = $2',
      [userName, password],
    );
    if (result.length > 0) {
      return { success: true, userName: result[0].userName };
    } else {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc mật khẩu không đúng.',
      };
    }
  }

  async changePass(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message?: string }> {
    const userResult = await this.dataSource.query(
      'SELECT "password" FROM "Users" WHERE "userId" = $1',
      [userId],
    );

    if (userResult.length === 0) {
      return { success: false, message: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      userResult[0].password,
    );
    if (!isPasswordValid) {
      return { success: false, message: 'Current password is incorrect' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateResult = await this.dataSource.query(
      'UPDATE "Users" SET "password" = $1 WHERE "userId" = $2',
      [hashedPassword, userId],
    );

    if (updateResult.affectedRows > 0) {
      return { success: true, message: 'Password changed successfully' };
    } else {
      return { success: false, message: 'Failed to change password' };
    }
  }
}
