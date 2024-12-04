import { PermissionModule } from '@app/permissions';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import { AcceptLanguageResolver } from 'nestjs-i18n';
import config from '../../config/config';
import { TokenModule } from '@app/token';
import { RoleModule } from '../role/role.module';
import { PermissionsAdminModule } from '../permissions-admin/permissions-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'ru-*': 'ru',
        'en-*': 'en',
      },
      loaderOptions: {
        path: `./libs/i18n/`,
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    PermissionModule,
    TokenModule,
    RoleModule,
    PermissionsAdminModule,
  ],
})
export class AppModule {}
