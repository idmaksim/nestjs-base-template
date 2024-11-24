import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import config from 'src/config/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          migrations: [__dirname + '/../migrations/*.{js,ts}'],
          synchronize: false,
        };
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'ru-*': 'ru',
        'en-*': 'en',
      },
      loaderOptions: {
        path: `./dist/i18n/`,
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    UsersModule,
    AuthModule,
    RolePermissionModule,
    RoleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
