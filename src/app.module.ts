import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { SongModule } from './song/song.module';

@Module({
	imports: [
		LoggerModule.forRoot({
			pinoHttp: {
				stream: pino.destination({
					dest: './logs/app.log',
					minLength: 4096,
					sync: false,
					mkdir: true,
				}),
			},
		}),
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
