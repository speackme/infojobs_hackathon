import { OfferResponseDto } from '@/service/infojobs/infojobs.dto';

export type ContentProviderProps = {
	children: React.ReactNode;
};

export type ContentContextProps = {
	show: boolean;
	setShow: (value: boolean) => void;
	content: OfferResponseDto;
	setContent: (value: OfferResponseDto) => void;
};
