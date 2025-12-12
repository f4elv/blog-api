import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WriterLoginDto } from './dtos/create-writer-login.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    private readonly logger = new Logger(AuthService.name);

    async writerlogin(writerLoginDto: WriterLoginDto) {
        const { password } = writerLoginDto;
        const writerPassword = process.env.WRITER_PASSWORD;

        if (password != writerPassword || !password) {
            this.logger.warn('Writer errou a senha de login');
            throw new UnauthorizedException('Senha inválida');
        }

        const payload = {
            role: 'writer',
            iat: Date.now(),
        };

        const token = this.jwtService.sign(payload);

        this.logger.log('Writer realizou o login com sucesso');
        return {
            access_token: token,
            message: 'Login realizado com sucesso',
        };
    }

    async validateToken(payload: any) {
        if (payload.role != 'writer') {
            this.logger.warn('Token de writer inválido');
            return new UnauthorizedException('Token inválido');
        }

        return { role: 'writer' };
    }
}
