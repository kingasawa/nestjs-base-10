import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const connectionConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || '34.84.9.234',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'nestjs-10-user',
  password: process.env.MYSQL_PASSWORD || 'Qr>JgAFjj0?K5RFG',
  database: process.env.MYSQL_DB || 'nestjs-10',
  // extra: process.env.CLOUD_SQL_INSTANT_NAME || 'ceremonial-team-424503-u1:asia-northeast1:nestjs-10-sql',
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