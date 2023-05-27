import { ContentProvider } from '@/provider/content';
import { Inter } from 'next/font/google';

import { InterviewProvider } from '@/provider/interview';
import splitbee from '@splitbee/web';
import './globals.css';

splitbee.init({
	// To use Splitbee on another subdomain.
	// Token can be found in project settings
	token: 'W6AWC51WNM1C',

	// Enable cookie-less mode. Defaults to `false`
	disableCookie: false,

	// Set custom urls when using proxying
	scriptUrl: 'https://cdn.splitbee.io/sb.js',
	apiUrl: 'https://hive.splitbee.io',
});

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
				{/* <script
					async
					src='https://cdn.splitbee.io/sb.js'></script> */}
			</head>
			<body className={`${inter.className} overflow-hidden`}>
				<ContentProvider>
					<InterviewProvider>{children}</InterviewProvider>
				</ContentProvider>
			</body>
		</html>
	);
}
