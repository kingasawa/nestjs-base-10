import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const connectionConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DB || 'nest-base',
  extra: process.env.CLOUD_SQL_INSTANT_NAME ? { socketPath: process.env.CLOUD_SQL_INSTANT_NAME } : null,
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