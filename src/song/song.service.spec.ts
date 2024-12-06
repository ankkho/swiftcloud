import { Test, type TestingModule } from '@nestjs/testing';
import { SongService } from './song.service';
import { OrderBy, Months, type PopularSong } from './types.js';
import { songData } from './utils/spec.utils';
import { orderByTitle, orderByYear } from './utils/song.utils';
import { DummySongData } from './song.data';

describe('SongService', () => {
  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        {
          provide: DummySongData,
          useValue: {
            getData: jest.fn(() => songData),
          },
        },
      ],
    }).compile();

    service = module.get<SongService>(SongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchSongs', () => {
    it('should return songs by title and order by year', async () => {
      const query = 'Love';
      const order = OrderBy.ASC;
      const songOrderedByYear = orderByYear(songData, order);

      const result = await service.searchSongs(query, order);
      expect(result).toStrictEqual([songOrderedByYear[0]]);
    });

    it('should return empty response when no songs were found', async () => {
      const query = 'sample';
      const order = OrderBy.ASC;

      const result = await service.searchSongs(query, order);
      expect(result).toStrictEqual([]);
    });
  });

  describe('songsByYear', () => {
    it('should return songs by title and order by year', async () => {
      const year = 2019;
      const order = OrderBy.ASC;
      const songOrderedByTitle = orderByTitle(songData, order);

      const result = await service.songsByYear(year, order);
      expect(result).toStrictEqual(songOrderedByTitle.filter((details) => details.year === year));
    });

    it('should return empty response when no songs were found', async () => {
      const year = 1999;
      const order = OrderBy.ASC;

      const result = await service.songsByYear(year, order);
      expect(result).toStrictEqual([]);
    });
  });

  describe('mostPopularByMonth', () => {
    it('should return the most popular song for a given month', async () => {
      const expectedPopularSong: PopularSong = {
        title: 'Christmas Tree Farm',
        artist: 'Taylor Swift',
        writer: 'Taylor Swift',
        album: 'None',
        year: 2019,
        plays: 104,
      };

      const result = await service.mostPopularByMonth(Months.june);
      expect(result).toStrictEqual(expectedPopularSong);
    });
  });

  describe('mostPopularOverall', () => {
    it('should return the most popular song overall', async () => {
      const mostPopularOverall = {
        title: 'Beautiful Ghosts',
        artist: 'Taylor Swift',
        writer: 'Taylor Swift, Andrew Lloyd Webber',
        album: 'Cats: Highlights from the Motion Picture Soundtrack',
        year: 2019,
        plays: { june: 100, july: 106, august: 100 },
      };

      const result = await service.mostPopularOverall();
      expect(result).toStrictEqual(mostPopularOverall);
    });
  });
});
