import { useContent } from '@/provider/content';
import { useEffect, useState } from 'react';
import { Offer } from '../offer';

export function Content() {
	const { show, setShow, content } = useContent();
	const [showStyle, setShowStyle] = useState('translate-y-0');

	useEffect(() => {
		setShowStyle(!show ? 'translate-y-0' : '-translate-y-full');
	}, [show, content]);

	return (
		<div
			className={`absolute w-full h-full bg-slate-300 duration-300 flex justify-center overflow-y-auto ${showStyle}`}>
			<div className='w-9/12 pt-5'>
				<h1>titulo asdd</h1>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Nisi repudiandae temporibus, accusantium aliquid quis eum ut
					debitis eos ipsam illum praesentium reiciendis odit minima?
					Earum dicta iste sunt non saepe.
				</p>

				{content && content.items ? (
					<ul className='grid grid-cols-3 gap-5'>
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
