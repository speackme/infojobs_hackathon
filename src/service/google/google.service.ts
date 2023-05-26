export class GoogleService {
	private readonly BASE = 'https://suggestqueries.google.com';
	private readonly END_POINT = '/complete/search?client=chrome&q=';

	async getSuggestions(term: string) {
		const response = await fetch(`${this.BASE}${this.END_POINT}${term}`);
		const data = await response.json();
		const suggestions = data[1][0];
		return {
			format: this.getSuggestionFormat(term, suggestions),
			suggestions,
		};
	}

	private getSuggestionFormat(term: string, suggestion: string) {
		let length = term.length;
		let text = suggestion.substring(length);
		return text.padStart(suggestion.length, ' ');
	}
}
