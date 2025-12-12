import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private pool: Pool;
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 3,
            min: 0,
            idleTimeoutMillis: 5000,
        });

        const adapter = new PrismaPg(pool);
        super({ adapter });
        this.pool = pool;
    }

    async onModuleInit() {
        this.logger.log('Conectando ao banco de dados');
        await this.$connect();
    }

    async onModuleDestroy() {
        this.logger.log('Desconectando do bando de dados');
        await this.$disconnect();
        await this.pool.end();
    }
}
