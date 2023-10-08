import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISenderModuleAsyncOptions } from 'src/sender/types/sender.module.options';

export const getSenderConfig = (): ISenderModuleAsyncOptions => {
	return {
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			const channels = [
				{ chatKey: 'TELEGRAM_FRONTEND_CHAT_ID', category: 'frontend developer' },
				{ chatKey: 'TELEGRAM_NODEJS_CHAT_ID', category: 'nodejs developer' },
				{ chatKey: 'TELEGRAM_JAVA_CHAT_ID', category: 'java developer' },
				{ chatKey: 'TELEGRAM_PYTHON_CHAT_ID', category: 'python developer' },
				{ chatKey: 'TELEGRAM_CPP_CHAT_ID', category: 'c++ developer' },
				{ chatKey: 'TELEGRAM_SWIFT_CHAT_ID', category: 'swift developer' },
				{ chatKey: 'TELEGRAM_MOBILE_CHAT_ID', category: 'mobile dev developer' },
				{ chatKey: 'TELEGRAM_DESKTOP_CHAT_ID', category: 'desktop dev developer' },
			]

			const botId = configService.get('TELEGRAM_BOT_ID');
			const privateChatId = configService.get('TELEGRAM_PRIVATE_CHAT_ID');

			return {
				channels: channels.map((item) => ({
					category: item.category,
					chatId: configService.get(item.chatKey)
				})),
				privateChatId,
				token: botId,
			};
		}
	}
};
