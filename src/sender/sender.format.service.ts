import { FormatVacancy } from 'src/http/types/vacancy';

export class SenderFormatService {
	constructor(
		private readonly vacancy: FormatVacancy,
	) {}

	private getTitle() {
		return this.vacancy.title +
			'\n' +
			'\n';
	}

	private getSalary() {
		if (
			!this.vacancy.salary ||
			(!this.vacancy.salary[0] && !this.vacancy.salary[1])
		) {
			return ''
		}

		if (!this.vacancy.salary[0] || !this.vacancy.salary[1]) {
			return `💸 Зарплата: ${this.vacancy.salary[0] || this.vacancy.salary[1]}\n\n`
		}

		return `💸 Зарплата: ${this.vacancy.salary[0]} - ${this.vacancy.salary[1]}\n\n`;
	}

	private getPlace() {
		return `🌍 Адреса: ${this.vacancy.city}\n\n`;
	}

	private getDescription() {
		if (!this.vacancy.conditions.length) {
			return 'Опис' + this.vacancy.description + '\n\n'
		}

		return 'Умови\n' + this.vacancy.conditions.map((condition) => `- ${condition}\n`).join('') + '\n';
	}

	private getLink() {
		return `Посилання: ${this.vacancy.link}`;
	}

	getMessage() {
		const result = 
			this.getTitle() +
			this.getSalary() + 
			this.getPlace() +
			this.getDescription() +
			this.getLink();
		
		return result;
	}
}
