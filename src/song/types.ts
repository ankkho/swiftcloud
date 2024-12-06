export enum OrderBy {
	ASC = 'ASC',
	DESC = 'DESC',
}

export enum Months {
	june = 'june',
	july = 'july',
	august = 'august',
}

type MonthlyPlays = {
	june: number;
	july: number;
	august: number;
};

type Song = {
	title: string;
	artist: string;
	writer: string;
	album: string | number;
	year: number;
};

export type PopularSong = {
	plays: number;
} & Song;

export type SongDetails = {
	plays: MonthlyPlays;
} & Song;
