import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
	return app.getUrl();
}

bootstrap()
	.then((url) => {
		console.log(`Application is running on: ${url}`);
	})
	.catch((error: unknown) => {
		console.error(error);
	});
