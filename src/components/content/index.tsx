import { useContent } from '@/provider/content';
import { useEffect, useState } from 'react';

export function Content() {
	const { show, setShow } = useContent();
	const [showStyle, setShowStyle] = useState('translate-y-0');

	useEffect(() => {
		if (!show) {
			setShowStyle('translate-y-0');
		} else {
			setShowStyle('-translate-y-full');
		}
	}, [show]);

	return (
		<div
			className={`absolute w-full h-full bg-slate-300 duration-300 flex justify-center ${showStyle}`}>
			<div className='w-9/12 pt-5'>
				<h1>titulo asdd</h1>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Nisi repudiandae temporibus, accusantium aliquid quis eum ut
					debitis eos ipsam illum praesentium reiciendis odit minima?
					Earum dicta iste sunt non saepe.
				</p>
			</div>
		</div>
	);
}
