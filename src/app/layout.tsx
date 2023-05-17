import { ContentProvider } from '@/provider/content';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Hackathon Infojobs',
	description: 'Crea tu propio buscador de ofertas de trabajo',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<script
					async
					src='https://cdn.splitbee.io/sb.js'></script>
			</head>
			<body className={`${inter.className} overflow-hidden`}>
				<ContentProvider>{children}</ContentProvider>
			</body>
		</html>
	);
}
