export function H1({ children, className }: any) {
	return <h1 className={`text-3xl md:text-5xl ${className}`}>{children}</h1>;
}

export function H2({ children, className }: any) {
	return <h2 className={`text-2xl md:text-4xl ${className}`}>{children}</h2>;
}

export function H3({ children, className }: any) {
	return <h3 className={`text-xl md:text-3xl ${className}`}>{children}</h3>;
}

export function H4({ children, className }: any) {
	return <h4 className={`text-lg md:text-2xl ${className}`}>{children}</h4>;
}

export function H5({ children, className }: any) {
	return <h5 className={`text-lg md:text-xl ${className}`}>{children}</h5>;
}

export function H6({ children, className }: any) {
	return <h6 className={`text-lg ${className}`}>{children}</h6>;
}
