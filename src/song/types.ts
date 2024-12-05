export enum OrderBy {
	ASC = 'ASC',
	DESC = 'DESC',
}

type MonthlyPlays = {
	june: number;
	july: number;
	august: number;
};

export type SongDetails = {
	title: string;
	artist: string;
	writer: string;
	album: string | number;
	year: number;
	plays: MonthlyPlays;
};
