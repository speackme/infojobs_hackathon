import { ItemDto } from '@/service/infojobs/infojobs.dto';

export type ContentProviderProps = {
	children: React.ReactNode;
};

export type ContentContextProps = {
	show: boolean;
	setShow: (value: boolean) => void;
	interview: ItemDto;
	setInterview: (value: ItemDto) => void;
};
