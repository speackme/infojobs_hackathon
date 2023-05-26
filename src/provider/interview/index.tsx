'use client';

import { ItemDto } from '@/service/infojobs/infojobs.dto';
import { createContext, useContext, useState } from 'react';
import { ContentContextProps, ContentProviderProps } from './content.dto';

const InterviewContext = createContext<any>({} as any);

export function InterviewProvider({ children }: ContentProviderProps) {
	const [show, setShow] = useState<boolean>(false);
	const [interview, setInterview] = useState<ItemDto>({} as ItemDto);

	const value: ContentContextProps = {
		show,
		setShow,
		interview,
		setInterview,
	};

	return (
		<InterviewContext.Provider value={value}>
			{children}
		</InterviewContext.Provider>
	);
}

export const useInterview = (): ContentContextProps =>
	useContext(InterviewContext);
