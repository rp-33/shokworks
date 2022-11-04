import { 
    Controller,
    Request,
    Query,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Param,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService  } from './event.service';
import { Event } from '../../entities/event.entity';
import { 
    EventDto,
    FindDto,
    EventUpdateDto,
    EventDeleteDto
 } from './dto/event.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Eventos')
@Controller('event')
export class EventController {
    constructor(private readonly _eventService: EventService) {}

    @ApiOperation({ summary: 'Obtener la lista de eventos.'})
    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    find(@Query() query : FindDto,@Request() req: any): Promise<{data : Event[],total : number}>{
        return this._eventService.find(query,req.user['id']);
    }

    @ApiOperation({ summary: 'Crear un evento.' })
    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    create(@Request() req: any,@Body() body : EventDto): Promise<Event>{
        body['user'] = req.user['id'];
        return this._eventService.create(body);
    }

    @ApiOperation({ summary: 'Editar un evento.' })
    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    update(@Body() body : EventUpdateDto): Promise<string>{
        return this._eventService.update(body);
    }

    @ApiOperation({ summary: 'Eliminar un evento.' })
    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    delete(@Param() params : EventDeleteDto): Promise<string>{
        return this._eventService.delete(params);
    }

}
