import { IsString, IsNotEmpty } from 'class-validator';
import { Escape } from 'class-sanitizer';

export class CreateSignatureDto {
    @IsNotEmpty()
    @IsString()
    @Escape()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
