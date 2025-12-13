import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSignatureDto } from './dtos/create-signature.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignatureService {
    constructor(private readonly prismaService: PrismaService) {}
    private readonly logger = new Logger(SignatureService.name);

    async create(createSignatureDto: CreateSignatureDto) {
        const { name, password } = createSignatureDto;

        const alredyExist = await this.prismaService.signature.findUnique({
            where: {
                name,
            },
        });

        if (alredyExist) throw new ConflictException('Assinatura já existe');

        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const signature = await this.prismaService.signature.create({
                data: {
                    name,
                    password: hashPassword,
                },
            });

            this.logger.log('Nova assinatura foi criada com sucesso');
            return {
                message: 'Assinatura criada com sucesso',
                signature: signature.name,
            };
        } catch (error) {
            this.logger.error('Erro ao criar assinatura', error);
            throw new InternalServerErrorException('Erro interno do servidor');
        }
    }
}
