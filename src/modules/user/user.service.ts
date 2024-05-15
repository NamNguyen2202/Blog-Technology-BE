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
    const result = this.dataSource.query(
      'SELECT * FROM "Users" WHERE "userName" = $1',
      [userName],
    );
    return result;
  }

  InsertUser(user: SignUpDto): Promise<any> {
    return this.dataSource.query(
      'INSERT INTO "Users" ("userName", phone, "password") VALUES($1, $2, $3);',
      [user.userName, user.phone, user.password],
    );
  }

  
  async CheckSignIn(userName: string, password: string): Promise<boolean> {
    const result = await this.dataSource.query(
        'SELECT "userName" FROM "Users" WHERE "userName" = $1 AND "password" = $2',
        [userName, password],
    );
    return result.length > 0;
}
}
