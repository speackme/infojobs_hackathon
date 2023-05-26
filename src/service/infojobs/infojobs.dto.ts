export interface OfferDto {
	term?: string | null;
}

export interface KeyValue {
	id: number;
	value: string;
}

export interface ItemDto {
	id: string;
	title: string;
	province: KeyValue;
	city: string;
	link: string;
	category: KeyValue;
	contractType: KeyValue;
	subcategory: KeyValue;
	salaryMin: KeyValue;
	salaryMax: KeyValue;
	salaryPeriod: KeyValue;
	experienceMin: KeyValue;
	workDay: KeyValue;
	study: KeyValue;
	teleworking: KeyValue;
	published: Date;
	updated: Date;
	author: {
		id: string;
		privateId: number;
		name: string;
		uri: string;
		logoUrl: string;
		corporateResponsive: boolean;
		showCorporativeHeader: boolean;
	};
	requirementMin: string;
	bold: boolean;
	applications: string;
	subSegment: number;
	executive: boolean;
	salaryDescription: string;
	multiProvince: boolean;
	urgent: boolean;
	color: boolean;
}

export interface OfferResponseDto {
	currentPage: number;
	pageSize: number;
	totalResults: number;
	currentResults: number;
	totalPages: number;
	availableSortingMethods: string[];
	sortBy: string;
	sinceDate: string;
	items: ItemDto[];
}
