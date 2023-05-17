import { NextResponse } from 'next/server';

const API =
	'https://suggestqueries.google.com/complete/search?client=chrome&q=';

function isShowSuggestion(term: string, suggestion: string) {
	const dataArray = term.split(' ');
	const dataArray2 = suggestion.split(' ');
	let isValidate = true;

	for (let i = 0; i < dataArray.length; i++) {
		if (dataArray[i] !== dataArray2[i]) {
			isValidate = false;
			break;
		}
	}

	return isValidate;
}

async function getSuggestions(term: string) {
	const response = await fetch(`${API}${term}`);
	const data = await response.json();
	const suggestions = data[1][0];
	const arrayTerm = term.split(' ');

	if (arrayTerm.length < 0 && !isShowSuggestion(term, suggestions)) {
		return '';
	}

	return suggestions;
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const term = searchParams.get('term');

	if (term === null) {
		return new Response('Invalid ID', { status: 400 });
	}

	const suggestions = await getSuggestions(term);

	return NextResponse.json({ suggestions });
}
