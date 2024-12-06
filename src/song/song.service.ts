import { Injectable, OnModuleInit } from '@nestjs/common';
import data from '../../data/data.json';
import { Months, OrderBy, PopularSong, SongDetails } from './types.js';

@Injectable()
export class SongService implements OnModuleInit {
	private readonly songData: SongDetails[];

	constructor() {
		this.songData = [];
	}

	public onModuleInit(): void {
		this.formatData();
	}

	async searchSongs(query: string, order: OrderBy): Promise<SongDetails[]> {
		const regexPattern = new RegExp(query, 'i');
		const filteredSongs = this.songData.filter((song: SongDetails) => regexPattern.test(song.title));

		if (order === OrderBy.ASC) {
			filteredSongs.sort((a, b) => a.year - b.year);
		} else {
			filteredSongs.sort((a, b) => b.year - a.year);
		}

		return filteredSongs;
	}

	async songsByYear(year: number, order: OrderBy): Promise<SongDetails[]> {
		const filteredSongs = this.songData.filter((song: SongDetails) => song.year === year);

		if (order === OrderBy.ASC) {
			filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			filteredSongs.sort((a, b) => b.title.localeCompare(a.title));
		}

		return filteredSongs;
	}

	async mostPopularByMonth(month: Months, order: OrderBy): Promise<PopularSong[]> {
		const filteredSongs = this.songData
			.filter((song) => song.plays[month])
			.map((details) => {
				const { plays, ...others } = details;
				return {
					...others,
					plays: plays[month],
				};
			});

		const reducer = (mostPopular, currentSong) => (currentSong?.plays > mostPopular?.plays ? currentSong : mostPopular) as PopularSong;
		const mostPopularSong = filteredSongs.reduce(reducer, null) as PopularSong;

		return [mostPopularSong];
	}

	formatData(): void {
		const formattedData = data?.map((details) => {
			const plays = {
				june: details?.['Plays - June'] ?? 0,
				july: details?.['Plays - July'] ?? 0,
				august: details?.['Plays - August'] ?? 0,
			};

			return {
				title: `${details.Song}`,
				writer: details.Writer,
				artist: details.Artist,
				album: details.Album,
				year: details.Year,
				plays,
			};
		});

		this.songData.push(...formattedData);
	}
}