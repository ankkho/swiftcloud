import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	app.useLogger(app.get(Logger));
	app.useGlobalPipes(new ValidationPipe());
	const configService: ConfigService = app.get<ConfigService>(ConfigService);
	const port: number = configService.get('PORT') ?? 3000;

	await app.listen(port);
	return app.getUrl();
}

bootstrap()
	.then((url) => {
		console.log(`Application is running on: ${url}`);
	})
	.catch((error: unknown) => {
		console.error(error);
	});
