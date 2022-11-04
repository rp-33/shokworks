import { 
    IsNotEmpty,
    IsString,
    IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date : Date;
}


export class FindDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    page : number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    limit : number;
}

export class EventDeleteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id : number;
}

export class EventUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id : number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    address : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    date : Date;

}