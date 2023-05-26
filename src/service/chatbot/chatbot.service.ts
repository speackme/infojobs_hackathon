import { ItemDto } from '../infojobs/infojobs.dto';

export class ChatBotService {
	private readonly BASE = 'https://api.openai.com/v1/chat/completions';
	private readonly KEY = process.env.OPENAI_KEY;
	private readonly MODEL = 'gpt-3.5-turbo';

	async getResponse({
		message,
		interview,
	}: {
		message: string;
		interview: ItemDto;
	}) {
		const promt = `Eres entrevistador que se llama Edith. 
		Y vas a realizar una entrevista para el puesto
		de trabajo como ${interview.title.toLocaleLowerCase()}. Donde los requisitos son los siguientes:
		- ${interview.experienceMin.value || `0 años de experiencia`} 
		- ${interview.study.value || `No se requiere estudios`}
		- ${interview.contractType.value || `No se especifica el tipo de contrato`}

		Y el salario es entre ${interview.salaryMin.value || `0`} y ${
			interview.salaryMax.value || `0`
		} euros brutos al año.
		Y la modalidad de trabajo es ${interview.workDay.value || `completa`} y ${
			interview.teleworking.value || `presencial`
		}.  ${
			interview.province.value
				? `Y se realizara en ${interview.province.value}`
				: ''
		}. Para
		la empresa ${interview.author.name}.
		Y al finalizar la entrevista, valorar como lo ha echo la 
		persona entrevistada dando una perpectiva y consejos para mejorar.
		`;

		const response = await fetch(`${this.BASE}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${this.KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages: [
					{
						role: 'system',
						content: promt,
					},
					{ role: 'user', content: message },
				],
				model: this.MODEL,
				temperature: 0.7,
			}),
		});

		const data = await response.json();

		return data.choices[0];
	}
}
