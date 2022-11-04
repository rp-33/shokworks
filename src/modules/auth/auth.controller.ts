import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import  {
    LoginDto,
    SignupDto,
    UserDto
} from './dto/auth.dto';
import { AuthService  } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @ApiOperation({ summary: 'Iniciar session.' })
    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() body : LoginDto): Promise<UserDto>{
        return this._authService.login(body);
    }

    @ApiOperation({ summary: 'Registro.' })
    @Post('signup')
    @UsePipes(new ValidationPipe())
    signup(@Body() body : SignupDto):Promise<UserDto>{
        return this._authService.signup(body);
    }
}
