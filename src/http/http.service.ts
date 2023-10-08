import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { getListBody } from './http.const';
import { FormatVacancy, Vacancy } from './types/vacancy';
import { InjectModel } from 'nestjs-typegoose';
import { VacancyModel } from './models/vacancy.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Response } from './types/response';

@Injectable()
export class HttpService {
	constructor(
		@InjectModel(VacancyModel) private readonly vacancyModel: ModelType<VacancyModel>,
	) {}

	private async getVacanciesList(category: string) {
		try {
			const { data } = await axios.post<Response>(
				'https://dracula.robota.ua/?q=getPublishedVacanciesList',
				getListBody(category)
			);
			return data;
		} catch (e) {
			Logger.error(e);
			return null;
		}
	}

	private async getAvailableVacancy(vacancies: Vacancy[]): Promise<Vacancy | null> {
		for (const vacancy of vacancies) {
			const existsVacancy = await this.vacancyModel.findOne({
				title: vacancy.title,
				vacancyId: vacancy.id,
				companyId: vacancy?.company?.id,
			}).exec();

			if (!existsVacancy) {
				return vacancy;
			}
		}
	}

	private formatVacancy(vacancy: Vacancy) {
		const result: FormatVacancy = {
			title: vacancy.title,
			salary: [vacancy?.salary?.amountFrom, vacancy?.salary?.amountTo],
			city: vacancy.city.name,
			conditions: vacancy.badges.map(({ name }) => name),
			description: vacancy.description,
			link: `https://robota.ua/company${vacancy.company.id}/vacancy${vacancy.id}`,
		};

		return result;
	}

	private async saveVacancy(vacancy: Vacancy) {
		await this.vacancyModel.create({
			vacancyId: vacancy?.id,
			companyId: vacancy?.company?.id,
			title: vacancy?.title,
		});
	}

	async getVacancy(category: string) {
		const allVacancies = await this.getVacanciesList(category);
		const availableVacancy = await this.getAvailableVacancy(allVacancies.data.publishedVacancies.items);

		if (!availableVacancy) {
			return null
		}

		await this.saveVacancy(availableVacancy);
		const result = this.formatVacancy(availableVacancy);

		return result;
	}
}
