import { Controller, Logger, Body, Post } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dtos/create-signature.dto';

@Controller('signature')
export class SignatureController {
    constructor(private readonly signatureService: SignatureService) {}
    private readonly logger = new Logger(SignatureController.name);

    @Post('create')
    async createSignature(@Body() createSignatureDto: CreateSignatureDto) {
        this.logger.log('Rota de criação da assinatura foi chamada');
        return this.signatureService.create(createSignatureDto);
    }
}
