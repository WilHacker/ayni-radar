import { describe, expect, it, vi } from 'vitest';
import { type PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service.js';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('returns ok status when database query succeeds', async () => {
    const prismaMock = {
      $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
    } as unknown as PrismaService;

    const controller = new HealthController(prismaMock);
    const result = await controller.check();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('ayni-radar-api');
    expect(result.database).toBe('connected');
    expect(result.timestamp).toBeTruthy();
  });
});
