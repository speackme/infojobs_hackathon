import { ItemDto } from '../infojobs/infojobs.dto';

export class ChatBotService {
	private readonly BASE = 'https://api.openai.com/v1/chat/completions';
	private readonly KEY = process.env.OPENAI_KEY;
	private readonly MODEL = 'gpt-3.5-turbo';
	private readonly TEMPERATURE = 0.1;

	async getResponse({
		message,
		interview,
	}: {
		message: string;
		interview: ItemDto;
	}) {
		const promt = `Eres entrevistador y tienes que hacer preguntas y contestaciones cortas. 
		Y vas a realizar una entrevista para el puesto
		de trabajo como ${interview.title.toLocaleLowerCase()}. 
		Tendrás que hacer una pregunta cada vez. 
		
		Donde los requisitos son los siguientes:
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

		Al acabar la entrevista, hacer una valoración contructiva y los puntos a mejorar.
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
				temperature: this.TEMPERATURE,
			}),
		});

		const data = await response.json();

		return data.choices[0];
	}
}
