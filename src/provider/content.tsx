'use client';

import { createContext, useContext, useState } from 'react';

const ContentContext = createContext<any>({} as any);

export function ContentProvider({ children }: any) {
	const [show, setShow] = useState<boolean>(false);

	const value = {
		show,
		setShow,
	};

	return (
		<ContentContext.Provider value={value}>
			{children}
		</ContentContext.Provider>
	);
}

export const useContent = () => useContext(ContentContext);
