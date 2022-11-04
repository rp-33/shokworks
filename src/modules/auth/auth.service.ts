import { 
    Injectable,
    NotFoundException,
    HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import  {
    LoginDto,
    SignupDto,
    UserDto
} from './dto/auth.dto';
import { JwtPayload } from './interface/jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        private readonly _jwtService: JwtService
    ) {}

    async generateAccessToken(id: number) : Promise<string> {
        const user = await await this._userRepository.findOne({
            where : [{ id }]
        });

        if(!user) throw new NotFoundException();

        const payload: JwtPayload = { id : id };

        return this._jwtService.sign(payload);
    }

    async getUserById(id: number): Promise<User>{
        const user : User =  await this._userRepository.findOne({
            where : [{ id }],
        });

        if(!user) throw new NotFoundException();

        return user;
    }

    async hashPassword(password : string) : Promise<string> {
        const salt : string = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password : string, hashPassword :  string): Promise<boolean> {

        return await bcrypt.compareSync(password,hashPassword);
    }

    async login(body: LoginDto): Promise<UserDto> {

        const user: User = await this._userRepository.findOne({
            where : [{ email : body.email  }]
        });

        if (!user) throw new NotFoundException('Correo o clave invalida!');

        let validatePass : boolean = await this.validatePassword(body.password,user.password);

        if(!validatePass) throw new NotFoundException('Correo o clave invalida!');

        const token : string = await this.generateAccessToken(user.id);
        
        return {
            id : user.id,
            email : user.email,
            token : token
        }
        
    }

    async signup(body: SignupDto): Promise<UserDto> {

        const userId : User = await this._userRepository.findOne({
            where : [{ email : body.email }],
            select : ['id']
        });

        if(userId) throw new HttpException('Ya existe el correo.', 400);

        body.password = await this.hashPassword(body.password);

        const user: User = await this._userRepository.save(body);

        if (!user.id) throw new NotFoundException('No se pudo guardar el usuario.');

        const token:string = await this.generateAccessToken(user.id);

        return {
            id : user.id,
            email : user.email,
            token : token
        }
        
    }
    
}
