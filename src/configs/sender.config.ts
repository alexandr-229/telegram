import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISenderModuleAsyncOptions } from 'src/sender/types/sender.module.options';

export const getSenderConfig = (): ISenderModuleAsyncOptions => {
	return {
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			const frontendChatId = configService.get('TELEGRAM_CHAT_ID');
			const botId = configService.get('TELEGRAM_BOT_ID');
			const privateChatId = configService.get('TELEGRAM_PRIVATE_CHAT_ID');

			return {
				channels: [
					{
						chatId: frontendChatId,
						category: 'frontend'
					}
				],
				privateChatId,
				token: botId,
			};
		}
	}
};
