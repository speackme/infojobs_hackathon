export function limitString(text: string) {
	if (text.length <= 200) {
		return text;
	} else {
		return text.substring(0, 200) + '...';
	}
}
