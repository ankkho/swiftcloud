import { Module } from '@nestjs/common';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';
import { DummySongData } from './song.data';

@Module({
	providers: [SongResolver, DummySongData, SongService],
})
export class SongModule {}
