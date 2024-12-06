import { Injectable } from '@nestjs/common';
import { Months, OrderBy, PopularSong, SongDetails } from './types.js';
import { orderByYear, orderByTitle } from './utils/song.utils';
import { DummySongData } from './song.data.js';

@Injectable()
export class SongService {
  private readonly songs: SongDetails[];

  constructor(private readonly dummySongData: DummySongData) {
    this.songs = dummySongData.getData();
  }

  public async searchSongs(query: string, order: OrderBy): Promise<SongDetails[]> {
    const regexPattern = new RegExp(query, 'i');
    const filteredSongs = this.songs.filter((song: SongDetails) => regexPattern.test(song.title)) as SongDetails[];

    return orderByYear(filteredSongs, order);
  }

  public async songsByYear(year: number, order: OrderBy): Promise<SongDetails[]> {
    const filteredSongs = this.songs.filter((song: SongDetails) => song.year === year);

    return orderByTitle(filteredSongs, order);
  }

  public async mostPopularByMonth(month: Months): Promise<PopularSong> {
    const filteredSongs: PopularSong[] = this.songs
      .filter((song) => song.plays[month])
      .map((details) => {
        const { plays, ...others } = details;
        return {
          ...others,
          plays: plays[month],
        };
      });

    const reducer = (mostPopular: PopularSong, currentSong: PopularSong) => (currentSong?.plays > mostPopular?.plays ? currentSong : mostPopular);
    const mostPopularSong = filteredSongs.reduce(reducer, filteredSongs[0]);

    return mostPopularSong;
  }

  public async mostPopularOverall(): Promise<SongDetails> {
    const reducer = (mostPopular: SongDetails, currentSong: SongDetails): SongDetails => {
      const totalPlaysOfCurrentSong = Object.values(currentSong?.plays).reduce((sum: number, monthPlays: number) => sum + monthPlays, 0);
      const totalPlaysOfMostPopularSong = Object.values(mostPopular?.plays).reduce((sum: number, monthPlays: number) => sum + monthPlays, 0);

      return totalPlaysOfCurrentSong > totalPlaysOfMostPopularSong ? currentSong : mostPopular;
    };

    const mostPopularSongOverall = this.songs.reduce(reducer, this.songs[0]);

    return mostPopularSongOverall;
  }
}
