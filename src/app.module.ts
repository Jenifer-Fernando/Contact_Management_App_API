import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    //     synchronize: true,
          
    //   }),
    // }),
    // ContactsModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-muddy-math-a5tgtc72-pooler.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_gA9Ln0WsBQFr',
      database: 'neondb',
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ContactsModule,

   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }