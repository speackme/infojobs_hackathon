import { useInterview } from '@/provider/interview';
import { ItemDto } from '@/service/infojobs/infojobs.dto';
import { limitString } from '@/utils/limitString';

export function Offer({ item }: { item: ItemDto }) {
	const { setShow, setInterview } = useInterview();

	const requirementMin = item.requirementMin.length
		? item.requirementMin
		: 'No especificado';

	return (
		<li className='flex flex-col gap-3 text-slate-900 bg-slate-200 p-5 rounded-lg justify-between'>
			<div className='flex flex-col gap-3'>
				<div className='flex justify-between'>
					<div className='flex gap-3'>
						<div
							className='bg-slate-600 rounded-lg w-7 max-w-xs aspect-[1/1] overflow-hidden'
							style={{
								minWidth: '50px',
								maxWidth: '50px',
								height: '50px',
							}}>
							<img
								src='https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/d1/d1642692-14f4-43be-9e1e-7083a65d41f6?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzkwNTQyODYsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy9kMS9kMTY0MjY5Mi0xNGY0LTQzYmUtOWUxZS03MDgzYTY1ZDQxZjYiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.JwS6J8iNGU22pJEnjriTpnLOaSvu2Rl412klS2ggOInBWsl7D1LNqwFWWYTHcZpTifyah4nzRCMsxvzBY87w8TVFg7fmYGDo6FrvQiWHBzdeJT7uBGTLlmgQQ2V6HQ_wcRO_6LXMdYoHJHu64dIFmNy6r3OWFY6PLDwfx5zGQDLgv5_Hvl2IBKmeKX8igQCV9C5A00nAGRgLgcSPWZSKKH6SxnBW9rkSuuMEC_lELpF1ZEyKWRlaGEAxYs0xeVcC1GPEH8wSVb9QEi54e2I-StXVxCwsa5aIIaH6sVIqjbPM9oNhmu0i4PIuuiqwwwxw63K2qkXLlG3yCUtpscZraA&amp;AccessKeyId=d724d9a53d95a810'
								alt=''
							/>
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
					className='bg-green-300 rounded-lg py-3 px-5'
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
