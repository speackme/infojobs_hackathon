import { useContent } from '@/provider/content';
import { debounce } from 'lodash';
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';

import { CgSearch } from 'react-icons/cg';

const WAIT_TIME = 1000;
const DEFAULT_PLACEHOLDER = 'Ej: Desarrollador, Diseñador, etc.';
const DEFAULT_BUTTON = 'Encontrar trabajo';

export function Search() {
	const { show, setShow } = useContent();
	const [searchValue, setSearchValue] = useState('');
	const [suggestions, setSuggestions] = useState('');
	const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
	const [textButton, setTextButton] = useState(DEFAULT_BUTTON);
	const ref = useRef<HTMLInputElement | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const handleSearch = async (searchTerm: string) => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		// Aquí puedes realizar la búsqueda en la API utilizando searchTerm
		if (searchTerm.length === 0) return setSuggestions('');

		const controller = new AbortController();
		abortControllerRef.current = controller;

		console.log('Buscando:', searchTerm);

		setTextButton('+10 ofertas de trabajo');

		/* try {
			const response = await fetch(
				`/api/suggestions?term=${searchTerm}`,
				{
					signal: controller.signal,
				}
			);
			const data = await response.json();
			setSuggestions(data.suggestions);
		} catch (error) {
			console.error('Error al realizar la solicitud:', error);
		} */
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log({ searchValue });
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		console.log({ value });

		setSearchValue(value);
		handleSearch(value);
	};

	const handleChange = debounce(onChange, WAIT_TIME);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			console.log({ suggestions });
			// Aquí puedes agregar la lógica para realizar la búsqueda
			// utilizando el valor del input (searchValue)
			setSearchValue(suggestions);

			if (ref?.current) {
				ref.current.value = suggestions;
			}
		}
	};

	const onKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;

		if (value.length === 0) {
			setPlaceholder(DEFAULT_PLACEHOLDER);
			setSuggestions('');
			return;
		}

		setPlaceholder('');

		if (event.key === 'Escape') {
			setSuggestions('');
		}

		try {
			setSuggestions('');
			const response = await fetch(`/api/suggestions?term=${value}`);
			const data = await response.json();
			setSuggestions(data.suggestions);
		} catch (error) {
			console.error('Error al realizar la solicitud:', error);
		}
	};

	const onClick = () => {
		searchValue.length && setShow(true);
	};

	return (
		<div className='w-5/6 flex bg-white rounded-full overflow-hidden'>
			<div
				className='flex items-center justify-center text-gray-400 aspect-square'
				style={{ height: '60px' }}>
				<CgSearch className='text-xl' />
			</div>
			<form
				className='w-full flex'
				onSubmit={onSubmit}>
				<div className='w-full flex relative'>
					<input
						className='font-mono lowercase w-full absolute top-0 left-0 pt-4 pb-4 text-gray-400  text-xl text-start overflow-hidden whitespace-nowrap'
						style={{ height: '60px' }}
						value={suggestions}
					/>
					<input
						ref={ref}
						type='text'
						className='font-mono lowercase w-full absolute pt-4 pb-4 outline-none text-blue-600 text-xl font-normal top-0 left-0 z-1 bg-transparent'
						style={{ height: '60px' }}
						placeholder={placeholder}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onKeyUp={onKeyUp}
					/>
				</div>

				<button
					type='submit'
					className='bg-blue-500 text-white p-4 w-80 border-none'
					onClick={onClick}>
					{textButton}
				</button>
			</form>
		</div>
	);
}
