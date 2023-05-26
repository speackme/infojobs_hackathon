'use client';

import { Content } from '@/components/content';
import { Interview } from '@/components/interview';
import { Search } from '@/components/search';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const titles = [
	'Revolucione su búsqueda de empleo con nuestra plataforma de última generación',
	'Maximice sus oportunidades laborales utilizando nuestra avanzada tecnología de búsqueda de empleo',
	'Acelere su carrera profesional con nuestra innovadora herramienta de búsqueda de trabajo',
	'Encuentre su camino hacia el éxito profesional con nuestra plataforma de vanguardia',
	'Amplíe sus posibilidades de empleo con nuestra tecnología de búsqueda de última generación',
];

const subtitles = [
	'Potencie su trayectoria con nuestra tecnología de vanguardia para encontrar oportunidades laborales',
	'Acelere su progreso profesional utilizando nuestra plataforma líder en búsqueda de empleo',
	'Optimice su camino hacia el éxito con nuestra herramienta revolucionaria de búsqueda de trabajo',
	'Amplíe sus horizontes laborales con nuestra plataforma de última generación para encontrar empleo',
	'Dé un impulso a su carrera profesional con nuestra innovadora solución de búsqueda de empleo',
];

function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
	/* const index = random(0, titles.length - 1); */
	const [show, setShow] = useState<string>('opacity-0');
	const [title, setTitle] = useState<string | null>(titles[0]);
	const [subtitle, setSubtitle] = useState<string | null>(subtitles[0]);

	useEffect(() => {
		setTimeout(() => {
			setShow('opacity-100');
		}, 500);
	}, []);

	return (
		<main className='overflow-hidden relative'>
			<section className='min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-900'>
				<div
					className={`${show} duration-1000 max-w-3xl text-center flex items-center flex-col gap-4`}>
					<div>
						<img
							src='/ij.webp'
							alt='InfoJobs'
							className='w-80 mx-auto'
						/>
					</div>

					<h1 className='text-6xl font-black'>{title}</h1>
					<h2 className='text-4xl mb-8 text-blue-100'>{subtitle}</h2>

					<Search />
					<small className='text-slate-200 mb-8'>
						Se te van a sugerir contenido en la busqueda, pulse
						&apos;tab&apos; para confirmar
					</small>
					<TypeAnimation
						sequence={[
							1000,
							'+ de 5.000 trabajos cualificados en todo el mundo', // Types 'Three' without deleting 'Two'
							() => {
								console.log('Sequence completed');
							},
						]}
						wrapper='h4'
						cursor={true}
						className='text-xl'
						style={{ display: 'inline-block', height: '27px' }}
					/>
				</div>
			</section>
			<Content />
			<Interview />
		</main>
	);
}
