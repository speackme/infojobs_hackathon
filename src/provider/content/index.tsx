'use client';

import { OfferResponseDto } from '@/service/infojobs/infojobs.dto';
import { createContext, useContext, useState } from 'react';
import { ContentContextProps, ContentProviderProps } from './content.dto';

const ContentContext = createContext<any>({} as any);

export function ContentProvider({ children }: ContentProviderProps) {
	const [show, setShow] = useState<boolean>(false);
	const [content, setContent] = useState<OfferResponseDto>(
		{} as OfferResponseDto
	);

	const value: ContentContextProps = {
		show,
		setShow,
		content,
		setContent,
	};

	return (
		<ContentContext.Provider value={value}>
			{children}
		</ContentContext.Provider>
	);
}

export const useContent = (): ContentContextProps => useContext(ContentContext);
