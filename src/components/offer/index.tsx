import { useInterview } from '@/provider/interview';
import { ItemDto } from '@/service/infojobs/infojobs.dto';
import { limitString } from '@/utils/limitString';

export function Offer({ item }: { item: ItemDto }) {
	const { setShow, setInterview } = useInterview();

	const requirementMin = item.requirementMin.length
		? item.requirementMin
		: 'No especificado';

	return (
		<li
			className={`flex flex-col gap-3 text-slate-900 bg-slate-200 p-5 rounded-lg justify-between`}>
			<div className='flex flex-col gap-3'>
				<div className='flex justify-between'>
					<div className='flex gap-3'>
						<div
							className='bg-slate-100 rounded-lg w-7 max-w-xs aspect-[1/1] overflow-hidden'
							style={{
								minWidth: '50px',
								maxWidth: '50px',
								height: '50px',
							}}>
							{item.author.logoUrl ? (
								<img
									src={item.author.logoUrl}
									alt={item.author.name}
								/>
							) : (
								<div className='flex items-center justify-center h-full bg-slate-600 text-white text-2xl'>
									{item.author.name[0]}
								</div>
							)}
						</div>
						<div>
							<h2 className='font-bold'>{item.title}</h2>
							<span className='text-slate-600'>
								{item.teleworking?.value} ·{' '}
								{item.salaryDescription} · {item.city}
							</span>
						</div>
					</div>
					{/* <div>
						<button>Favorito</button>
					</div> */}
				</div>
				<div className='flex flex-wrap gap-2'>
					<span className='rounded-full px-5 py-2 bg-slate-300 text-xs'>
						{item.contractType?.value}
					</span>
					<span className='rounded-full px-5 py-2 bg-slate-300 text-xs'>
						{item.category?.value}
					</span>
					<span className='rounded-full px-5 py-2 bg-slate-300 text-xs'>
						{item.study?.value}
					</span>
					<span className='rounded-full px-5 py-2 bg-slate-300 text-xs'>
						{item.experienceMin?.value}
					</span>
				</div>
				<p className='text-slate-600'>{limitString(requirementMin)}</p>
			</div>
			<div className='flex'>
				<button
					className='bg-green-300 rounded-lg py-3 px-5 hover:bg-green-500 hover:text-white transition-all duration-200 ease-in-out'
					onClick={() => {
						setShow(true);
						setInterview(item);
					}}>
					Simulador de entrevista
				</button>
			</div>
		</li>
	);
}
