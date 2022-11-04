import { 
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from '../../repositories/event.repository';
import { Event } from '../../entities/event.entity';
import {
    EventDto,
    FindDto,
    EventUpdateDto,
    EventDeleteDto
} from './dto/event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventRepository) private readonly _eventRepository: EventRepository
    ) {}

    async create(body : EventDto) : Promise<Event> {

        const event : Event = await this._eventRepository.save(body);

        if(!event.id) throw new NotFoundException('Error al crear el evento');

        return event;
        
    }

    async find(query : FindDto,user : number) : Promise<{data : Event[],total : number}> {

        const skip : number = Number(query.page) * Number(query.limit);

        const [expedient,count] : [Event[],number] = await this._eventRepository.findAndCount({ 
            where: [{user : user}],
            skip : skip,
            take : Number(query.limit),
        });
    
        return {
            data : expedient,
            total : count
        }
        
    }

    async update(body : EventUpdateDto) : Promise<string> {

        let {id,...event}  = body;

        let updateResult : any = await this._eventRepository.update({ id },event);

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar el evento');

        return 'Evento actualizado con exito';
        
    }

    async delete(params : EventDeleteDto) : Promise<string> {
        
        let deleteResult : any = await this._eventRepository.delete({ id : params.id});

        if(deleteResult.affected === 0) throw new NotFoundException('Error al eliminar el evento');

        return 'Evento eliminado con exito';
        
    }
}
