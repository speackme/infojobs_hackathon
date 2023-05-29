import { useContent } from '@/provider/content';
import { debounce } from 'lodash';
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';

import { tryCatch } from '@/utils/trycatch.util';
import { CgSearch } from 'react-icons/cg';
import { getMessageButton } from './getMessageButton';

const WAIT_TIME = 500;
const DEFAULT_PLACEHOLDER = 'Ej: Desarrollador, Diseñador ...';
const DEFAULT_BUTTON = 'Encontrar trabajo';

export function Search() {
	// Estado del contexto
	const { setShow, content, setContent } = useContent();

	// Estado del componente
	const [searchValue, setSearchValue] = useState('');
	const [suggestionValue, setSuggestionValue] = useState('');
	const [suggestions, setSuggestions] = useState('');
	const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
	const [textButton, setTextButton] = useState(DEFAULT_BUTTON);

	// Referencias
	const ref = useRef<HTMLInputElement | null>(null);

	// Referencia al controlador de aborto
	const abortControllerRef = useRef<AbortController | null>(null);
	const abortControllerSuggestionsRef = useRef<AbortController | null>(null);

	const handleSearch = async (searchTerm: string) => {
		if (abortControllerRef.current) abortControllerRef.current.abort();
		if (searchTerm.length === 0) return setSuggestions('');

		const controller = new AbortController();
		abortControllerRef.current = controller;

		// Recuperar total de ofertas de trabajo
		const [output, error] = await tryCatch(
			fetch(`/api/offers?term=${searchTerm}`, {
				signal: controller.signal,
			})
		);

		if (error) {
			console.error('Error al realizar la solicitud:', error);
			return;
		}

		const data = await output.json();
		const { totalResults } = data;
		console.log(data);
		setTextButton(getMessageButton(totalResults));
		setContent(data);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!content?.totalResults) return;

		setShow(true);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchValue(value);
		handleSearch(value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;

		if (event.key === 'Tab') {
			event.preventDefault();
			setSearchValue(suggestionValue);
			handleSearch(value);

			if (ref?.current) {
				ref.current.value = suggestionValue;
			}
		}
	};

	const onKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (abortControllerSuggestionsRef.current)
			abortControllerSuggestionsRef.current.abort();

		const controller = new AbortController();
		abortControllerSuggestionsRef.current = controller;

		const { value } = event.currentTarget;

		if (value.length === 0) {
			setPlaceholder(DEFAULT_PLACEHOLDER);
			setSuggestions('');
			setTextButton('Encontrar trabajo');
			return;
		}

		setPlaceholder('');

		if (event.key === 'Escape') {
			setSuggestions('');
			setTextButton('Encontrar trabajo');
		}

		setSuggestions('');

		const [output, error] = await tryCatch(
			fetch(`/api/suggestions?term=${value}`, {
				signal: controller.signal,
			})
		);

		if (error)
			return console.error('Error al realizar la solicitud:', error);

		const data = await output.json();
		setSuggestions(data.format.substring(0, 30));
		setSuggestionValue(data.suggestions);
	};

	const handleChange = debounce(onChange, WAIT_TIME);

	return (
		<div className='w-5/6 flex  rounded-full overflow-hidden'>
			<div
				className='flex items-center bg-white justify-center text-gray-400 aspect-square'
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
						readOnly
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
						maxLength={30}
					/>
				</div>

				<button
					type='submit'
					className='bg-blue-500 text-white p-4 w-80 border-none hover:bg-blue-600 hidden md:block'>
					{textButton}
				</button>
			</form>
		</div>
	);
}
