import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModuleAsyncOptions } from 'nestjs-typegoose';

export const getMongoConfig = (): TypegooseModuleAsyncOptions => {
	return {
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			return {
				uri: configService.get('MONGO_URL'),
			}
		}
	}
};
