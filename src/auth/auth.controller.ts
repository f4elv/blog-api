import {
    Body,
    Controller,
    InternalServerErrorException,
    Logger,
    Post,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../commons/decorators/public.decorator';
import { WriterLoginDto } from './dtos/create-writer-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    private readonly logger = new Logger();

    @Public()
    @Post('login')
    async login(@Body() writerLoginDto: WriterLoginDto) {
        try {
            return await this.authService.writerlogin(writerLoginDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('verify')
    verify() {
        this.logger.log('Admim validou o token');
        return { message: 'Token válido', authenticated: true };
    }

    @Post('logout')
    async logout() {
        this.logger.log('Writer realizou o logout');
        return {
            message: 'Logout realizado com sucesso',
        };
    }
}
