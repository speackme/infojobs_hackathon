export function getMessageButton(totalResults: number) {
	if (totalResults === 0) return 'No hay ofertas';
	if (totalResults === 1) return '1 oferta de trabajo';
	if (totalResults > 99) return '+100 ofertas de trabajo';

	return `${totalResults} ofertas de trabajo`;
}
