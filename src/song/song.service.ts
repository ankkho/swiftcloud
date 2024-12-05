import { Injectable, OnModuleInit } from '@nestjs/common';
import data from '../../data/data.json';
import { OrderBy, SongDetails } from './types.js';

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

	formatData(): void {
		const formattedData = data?.map((details) => {
			const plays = {
				june: details?.['Plays - June'],
				july: details?.['Plays - July'],
				august: details?.['Plays - August'],
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
