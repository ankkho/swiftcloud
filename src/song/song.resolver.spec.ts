import { Test, type TestingModule } from '@nestjs/testing';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';
import { Months, OrderBy } from './types.js';
import { orderByYear } from './utils/song.utils';
import { mostPopularSong, songData } from './utils/spec.utils';

describe('SongResolver', () => {
	let resolver: SongResolver;
	let songService: jest.Mocked<SongService>;

	beforeEach(async () => {
		const mockSongService = {
			searchSongs: jest.fn(),
			songsByYear: jest.fn(),
			mostPopularByMonth: jest.fn(),
			mostPopularOverall: jest.fn(),
			formatData: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [SongResolver, { provide: SongService, useValue: mockSongService }],
		}).compile();

		resolver = module.get<SongResolver>(SongResolver);
		songService = module.get(SongService);
	});

	describe('searchSongs', () => {
		it('should call songService.searchSongs with correct parameters', async () => {
			const query = 'Love';
			songService.searchSongs.mockResolvedValue([songData[0]]);
			const result = await resolver.searchSongs(query, OrderBy.ASC);

			expect(songService.searchSongs).toHaveBeenCalledWith(query, OrderBy.ASC);
			expect(result).toStrictEqual([songData[0]]);
		});

		it('should return empty response when no songs were found', async () => {
			const query = 'sample';
			songService.searchSongs.mockResolvedValue([]);
			const result = await resolver.searchSongs(query, OrderBy.DESC);

			expect(songService.searchSongs).toHaveBeenCalledWith(query, OrderBy.DESC);
			expect(result).toStrictEqual([]);
		});
	});

	describe('songsByYear', () => {
		const mockYear = 2019;
		const mockOrder = OrderBy.ASC;
		const filteredSongs = songData.filter((value) => value.year === mockYear);

		it('should call songService.songsByYear with correct parameters', async () => {
			songService.songsByYear.mockResolvedValue(filteredSongs);
			const result = await resolver.songsByYear(mockYear, mockOrder);

			expect(songService.songsByYear).toHaveBeenCalledWith(mockYear, mockOrder);
			expect(result).toStrictEqual(filteredSongs);
		});

		it('should use default order DESC if none is provided', async () => {
			songService.songsByYear.mockResolvedValue(orderByYear(filteredSongs, OrderBy.DESC));
			const result = await resolver.songsByYear(mockYear, undefined);

			expect(songService.songsByYear).toHaveBeenCalledWith(mockYear, OrderBy.DESC);
			expect(result).toStrictEqual(orderByYear(filteredSongs, OrderBy.DESC));
		});
	});

	describe('mostPopularByMonth', () => {
		it('should call songService.mostPopularByMonth with correct parameter', async () => {
			const mockMonth = Months.june;

			songService.mostPopularByMonth.mockResolvedValue(mostPopularSong);
			const result = await resolver.mostPopularByMonth(mockMonth);

			expect(songService.mostPopularByMonth).toHaveBeenCalledWith(mockMonth);
			expect(result).toStrictEqual(mostPopularSong);
		});
	});

	describe('mostPopularOverall', () => {
		it('should call songService.mostPopularOverall', async () => {
			const mostPopularOverall = {
				title: 'Beautiful Ghosts',
				artist: 'Taylor Swift',
				writer: 'Taylor Swift, Andrew Lloyd Webber',
				album: 'Cats: Highlights from the Motion Picture Soundtrack',
				year: 2019,
				plays: {
					june: 100,
					july: 106,
					august: 100,
				},
			};

			songService.mostPopularOverall.mockResolvedValue(mostPopularOverall);
			const result = await resolver.mostPopularOverall();

			expect(songService.mostPopularOverall).toHaveBeenCalled();
			expect(result).toStrictEqual(mostPopularOverall);
		});
	});
});
