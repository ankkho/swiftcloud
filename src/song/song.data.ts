import { Injectable } from '@nestjs/common';
import data from '../../data/data.json';
import { SongDetails } from './types.js';

@Injectable()
export class DummySongData {
	public getData(): SongDetails[] {
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

		return formattedData;
	}
}
