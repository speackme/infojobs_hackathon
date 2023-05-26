import { OfferDto, OfferResponseDto } from './infojobs.dto';

export class InfojobsService {
	private readonly ClientID = process.env.INFOJOBS_ID;
	private readonly ClientSecret = process.env.INFOJOBS_SECRET;
	private readonly API = 'https://api.infojobs.net/api/';

	private generateBasicAuth() {
		const data = `${this.ClientID}:${this.ClientSecret}`;
		const auth = Buffer.from(data).toString('base64');
		return `Basic ${auth}`;
	}

	async getOffers({ term }: OfferDto): Promise<OfferResponseDto> {
		const data = await this.get<OfferResponseDto>('9/offer', { q: term });
		return data;
	}

	private getQueryParams(params: Record<string, string>) {
		const queryString = new URLSearchParams(params).toString();
		return queryString ? `?${queryString}` : '';
	}

	private async get<T>(endPoint: string = '', params = {}) {
		const headers = {
			Authorization: this.generateBasicAuth(),
			Accept: 'application/json',
		};

		const query = this.getQueryParams(params);

		const response = await fetch(`${this.API}${endPoint}${query}`, {
			method: 'GET',
			headers,
		});

		const data = await response.json();

		return data as T;
	}
}
