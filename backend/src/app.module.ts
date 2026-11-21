import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './features/health/health.module.js';
import { ReportesModule } from './features/reportes/reportes.module.js';
import { ZonasModule } from './features/zonas/zonas.module.js';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    ZonasModule,
    ReportesModule,
  ],
})
export class AppModule {}
