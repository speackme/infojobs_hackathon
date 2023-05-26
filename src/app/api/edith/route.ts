import { ChatBotService } from '@/service/chatbot/chatbot.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	// Get body data
	const body = await request.json();

	const chat = new ChatBotService();

	if (!body) {
		return NextResponse.json({
			status: 'error',
			message: 'No se ha enviado un mensaje.',
		});
	}

	const data = await chat.getResponse(body);

	return NextResponse.json({
		status: 'success',
		message: data.message.content,
	});
}
