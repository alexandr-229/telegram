import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';
import { SENDER_MODULE_OPTIONS } from './sender.const';
import { ISenderModuleAsyncOptions } from './types/sender.module.options';
import { HttpModule } from 'src/http/http.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { MessageModel } from './models/message.model';
import { VacancyModel } from 'src/http/models/vacancy.model';

@Global()
@Module({})
export class SenderModule {
  static forRootAsync(options: ISenderModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);
		return {
			module: SenderModule,
			imports: [
				...options.imports,
				HttpModule,
				TypegooseModule.forFeature([
					{
						typegooseClass: MessageModel,
						schemaOptions: {
							collection: 'Message',
						},
					},
					{
						typegooseClass: VacancyModel,
						schemaOptions: {
							collection: 'Vacancy',
						},
					},
				]),
			],
      		controllers: [SenderController],
			providers: [SenderService, asyncOptions],
			exports: [SenderService]
		};
	}

	private static createAsyncOptionsProvider(options: ISenderModuleAsyncOptions): Provider {
		return {
			provide: SENDER_MODULE_OPTIONS,
			useFactory: async (...args: any[]) =>{
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || []
		};
	}
}
