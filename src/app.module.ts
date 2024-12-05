import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { SongModule } from './song/song.module';

@Module({
	imports: [
		SongModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			typePaths: ['./**/*.graphql'],
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),
	],
})
export class AppModule {}
