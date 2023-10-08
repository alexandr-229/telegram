import { Vacancy } from './vacancy'

export interface Response {
	data: {
		publishedVacancies: {
			totalCount: number;
			items: Vacancy[];
		};
	};
}
