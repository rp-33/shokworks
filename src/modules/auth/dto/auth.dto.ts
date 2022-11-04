import { 
    IsNotEmpty,
    IsString,
    IsEmail,
    Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password : string;
}

export class SignupDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @ApiProperty()
    @IsString()
    @Length(1, 8)
    password : string;
}

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    id : number;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token : string;
}


