import { Args, Query, Resolver } from '@nestjs/graphql';
import { SongService } from './song.service';
import { OrderBy, Song } from './types.js';

@Resolver('Song')
export class SongResolver {
	constructor(private readonly songService: SongService) {}

	@Query('searchSongs')
	async searchSongs(@Args('name') name: string, @Args('order') order: OrderBy) {
		return this.songService.searchSongs(name, order ?? OrderBy.DESC);
	}
}
