import { useInterview } from '@/provider/interview';
import { tryCatch } from '@/utils/trycatch.util';
import { useEffect, useRef, useState } from 'react';
import { H3 } from '../heading';
import style from './style.module.css';

export function Interview() {
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const { show, interview, setShow } = useInterview();

	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<string[]>([]);
	const [animation, setAnimation] = useState<string>('');
	const [showLoading, setShowLoading] = useState<string>('');

	const requirementMin = interview.requirementMin?.length
		? interview.requirementMin
		: 'No se ha especificado ningun requerimiento minimo';

	const onChange = (e: any) => {
		setMessage(e.target.value);
	};

	// evento al pulsar enter
	const onKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			onSubmit(e);
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		setMessage('');
		setContentMessage(`interview:${message}`);
		setShowLoading(style.showLoading);

		// Recuperar total de ofertas de trabajo
		const [output, error] = await tryCatch(
			fetch(`/api/edith`, {
				method: 'POST',
				body: JSON.stringify({
					interview,
					message,
				}),
			})
		);

		setShowLoading('');

		if (error) {
			console.error('Error al realizar la solicitud:', error);
			return;
		}

		const data = await output.json();

		setTimeout(() => {
			setContentMessage(`edith:${data.message}`);
		}, 1000);
	};

	const setContentMessage = (message: string) => {
		setMessages((msn) => [...msn, message]);

		setTimeout(() => {
			chatContainerRef.current?.scrollTo({
				top: chatContainerRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}, 100);
	};

	const closeInterview = () => {
		setShow(false);
	};

	useEffect(() => {
		setAnimation(show ? style.show : '');
	}, [show]);

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-slate-900 flex items-center justify-center ${style.container} ${animation}`}>
			<div className='flex gap-10 h-5/6 w-4/5 max-w-7xl'>
				<div className='w-full bg-slate-800 rounded-xl p-5 flex flex-col gap-5 justify-between'>
					<div>
						<div className={`${style.loading} ${showLoading}`}>
							<span>Preparando respuesta ...</span>
						</div>
					</div>
					<div className='flex flex-col h-full justify-end overflow-hidden'>
						<div
							className='flex flex-col gap-3 overflow-auto'
							ref={chatContainerRef}>
							{messages.map((item, index) => {
								const [owner, msn] = item.split(':');

								return (
									<div
										key={index}
										className={`${
											owner === 'edith'
												? 'flex justify-end'
												: ''
										}`}>
										<div
											className={`flex flex-col p-4 rounded-xl w-4/5 ${
												owner === 'edith'
													? 'bg-slate-700/40'
													: 'bg-slate-900/40'
											}`}>
											<span className='flex text-slate-400 font-semibold'>
												{owner === 'edith'
													? 'Recursos Humanos Edith'
													: 'Entrevistado'}
											</span>
											<p className='text-white'>{msn}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='bg-slate-700  rounded-xl overflow-hidden'>
						<form
							className='flex gap-5 items-center px-4 py-2 h-16'
							onSubmit={onSubmit}>
							<textarea
								className='w-full bg-transparent text-white outline-none resize-none'
								style={{ height: '30px' }}
								placeholder='Escribe preguntas al entrevistador'
								onChange={onChange}
								onKeyDown={onKeyDown}
								value={message}></textarea>
							<button
								type='submit'
								className='bg-slate-800 hover:bg-slate-900 px-6 py-3 rounded-xl'
								style={{ marginTop: '-7px' }}>
								Enviar
							</button>
						</form>
					</div>
				</div>

				<div className='max-w-sm'>
					<button
						onClick={closeInterview}
						className='px-5 py-4 block mb-5 rounded-xl bg-cyan-800 text-cyan-50 hover:bg-cyan-900 ease-in-out'>
						Cerrar entrevista
					</button>
					<H3 className='font-bold text-slate-200 mb-2'>
						{interview.title}
					</H3>
					<span className='text-slate-400 mb-5 block'>
						{interview.teleworking?.value} ·{' '}
						{interview.salaryDescription} · {interview.city}
					</span>
					<p className='text-slate-500'>{requirementMin}</p>
				</div>
			</div>
		</div>
	);
}
