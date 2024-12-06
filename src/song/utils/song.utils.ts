import { OrderBy, type SongDetails } from '../types.js';

export const orderByYear = (filteredSongs: SongDetails[], order: OrderBy): SongDetails[] => {
	if (order === OrderBy.ASC) {
		filteredSongs.sort((a, b) => a.year - b.year);
	} else {
		filteredSongs.sort((a, b) => b.year - a.year);
	}

	return filteredSongs;
};

export const orderByTitle = (filteredSongs: SongDetails[], order: OrderBy): SongDetails[] => {
	if (order === OrderBy.ASC) {
		filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
	} else {
		filteredSongs.sort((a, b) => b.title.localeCompare(a.title));
	}

	return filteredSongs;
};
