import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const connectionConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: '34.84.9.234',
  port: 3306,
  username: 'nestjs-10-user',
  password: 'Qr>JgAFjj0?K5RFG',
  database: 'nestjs-10',
  // extra: process.env.CLOUD_SQL_INSTANT_NAME ? { socketPath: process.env.CLOUD_SQL_INSTANT_NAME } : null,
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