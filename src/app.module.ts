import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from './http/http.module';
import { SenderModule } from './sender/sender.module';
import { ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongoConfig()),
    ConfigModule.forRoot(),
    HttpModule,
    SenderModule,
  ],
})
export class AppModule {}
