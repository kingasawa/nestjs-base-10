import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const connectionConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: '10.7.144.3',
  port: 3306,
  username: 'nestjs-10-user',
  password: 'Qr>JgAFjj0?K5RFG',
  database: 'nestjs-10',
  extra: 'ceremonial-team-424503-u1:asia-northeast1:nestjs-10-sql',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [],
};
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => connectionConfig,
    }),
  ],
})
export class DatabaseModule {}