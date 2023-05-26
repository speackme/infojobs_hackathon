import { GoogleService } from '@/service/google/google.service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const term = searchParams.get('term');

	if (!term) return new Response('Invalid ID', { status: 400 });

	const googleService = new GoogleService();
	const suggestions = await googleService.getSuggestions(term);

	return NextResponse.json(suggestions);
}
