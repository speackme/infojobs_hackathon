import { InfojobsService } from '@/service/infojobs/infojobs.service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const term = searchParams.get('term');

	const infojobs = new InfojobsService();

	const data = await infojobs.getOffers({ term });

	return NextResponse.json(data);
}
