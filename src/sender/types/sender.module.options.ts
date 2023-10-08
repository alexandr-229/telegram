import { ModuleMetadata } from '@nestjs/common';

export interface ISenderOptions {
	token: string;
	privateChatId: string;
	channels: {
		chatId: string;
		category: string;
	}[]
}

export interface ISenderModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ISenderOptions> | ISenderOptions;
	inject?: any[];
}
