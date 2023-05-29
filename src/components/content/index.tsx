import { useContent } from '@/provider/content';
import { useEffect, useState } from 'react';
import { H2, H4 } from '../heading';
import { Offer } from '../offer';
import { Search } from '../search';
import style from './style.module.css';

export function Content() {
	const { show, setShow, content } = useContent();
	const [showStyle, setShowStyle] = useState('translate-y-0');

	useEffect(() => {
		setShowStyle(!show ? 'translate-y-0' : '-translate-y-full');
	}, [show, content]);

	return (
		<div
			className={`absolute w-full h-full duration-300 flex justify-center overflow-y-auto ${showStyle}`}
			style={{ backgroundColor: '#355db4' }}>
			<div className='w-11/12 pt-5 lg:w-9/12'>
				<div className='mb-10 sticky top-5 relative z-50'>
					<div className={style.container}></div>
					<img
						src='/ij.webp'
						alt='InfoJobs'
						className='w-80 mx-auto'
					/>
					<H2 className='text-center'>
						¡Descubre Increíbles Oportunidades Laborales en Diversos
						Sectores!
					</H2>
					<H4 className='text-center text-slate-300 mb-5'>
						Explora una{' '}
						<b className='text-cyan-300 font-bold'>
							Lista de Empleos Impresionantes
						</b>{' '}
						que pueden cambiar tu carrera
					</H4>
					<div className='flex flex-col items-center'>
						<Search />
					</div>
				</div>

				{content && content.items ? (
					<ul className='grid grid-cols-1 gap-5 pb-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
						{content.items.map((item, index) => {
							return (
								<Offer
									key={index}
									item={item}
								/>
							);
						})}
					</ul>
				) : null}
			</div>
		</div>
	);
}
