import { NextResponse } from 'next/server';

const API =
	'https://suggestqueries.google.com/complete/search?client=chrome&q=';

function getSuggestionFormat(term: string, suggestion: string) {
	let length = term.length;
	let text = suggestion.substring(length);
	return text.padStart(suggestion.length, ' ');
}

async function getSuggestions(term: string) {
	const response = await fetch(`${API}${term}`);
	const data = await response.json();
	const suggestions = data[1][0];

	return {
		format: getSuggestionFormat(term, suggestions),
		suggestions,
	};
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const term = searchParams.get('term');

	if (term === null) {
		return new Response('Invalid ID', { status: 400 });
	}

	const suggestions = await getSuggestions(term);

	return NextResponse.json(suggestions);
}
