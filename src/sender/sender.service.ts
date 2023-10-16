import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SENDER_MODULE_OPTIONS } from './sender.const';
import { ISenderOptions } from './types/sender.module.options';
import { HttpService } from 'src/http/http.service';
import { SenderFormatService } from './sender.format.service';
import { InjectModel } from 'nestjs-typegoose';
import { MessageModel } from './models/message.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { VacancyModel } from 'src/http/models/vacancy.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SenderService {
	bot: Telegraf;

	constructor(
		@Inject(SENDER_MODULE_OPTIONS) private readonly options: ISenderOptions,
		@InjectModel(MessageModel) private readonly messageModel: ModelType<MessageModel>,
		@InjectModel(VacancyModel) private readonly vacancyModel: ModelType<VacancyModel>,
		private readonly httpService: HttpService,
	) {
		this.bot = new Telegraf(options.token);
	}

	private async saveMessage(link: string, title: string) {
		await this.messageModel.create({ link, title });
	}

	private sleep(ms: number) {
		return new Promise<void>((res) => {
			setTimeout(() => {
				res();
			}, ms);
		});
	}
	
	@Cron('0 6,15 * * *')
	async sendChanelMessage() {
		for (const chanel of this.options.channels) {
			try {
				const vacancy = await this.httpService.getVacancy(chanel.category);
	
				if (!vacancy) {
					return;
				}
	
				const message = new SenderFormatService(vacancy).getMessage();
				await this.bot.telegram.sendMessage(chanel.chatId, message);
				await this.saveMessage(vacancy.link, vacancy.title);
				await this.sleep(3000);
			} catch {}
		}
	}

	@Cron('0 17 * * *')
	async sendReport() {
		try {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const totalVacancies = await this.vacancyModel.countDocuments();
			const messagesSent = await this.messageModel.countDocuments({ createdAt: { $gte: today } });
			const message = `Наполненость БД: ${totalVacancies} \nСообщений отправлено: ${messagesSent}`;
	
			await this.bot.telegram.sendMessage(this.options.privateChatId, message);
		} catch {}
	}
}
