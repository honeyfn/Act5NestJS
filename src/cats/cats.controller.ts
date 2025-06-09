import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './types/cat.type';
import { CreateCatDto } from './types/create-cat.dto';
import { UpdateCatDto } from './types/update-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService){
    }

    //implementar index
    //lista de todos los gatos
    @Get()
    allCats(): Cat[] {
        //de donde tomo la lista
        return this.catsService.allCats();
    }

    //métdo para leer un cat por su ID
        @Get(':id')
        getById(@Param('id') id: string): Cat | undefined {
            //retornar desde el servico el Cat por Id
            return this.catsService.getById( parseInt(id, 10));
        }

    @Post()
    create(@Body() catDto: CreateCatDto): Cat {
        return this.catsService.create(catDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateCatDto): Cat {
        return this.catsService.update(parseInt(id, 10), updateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.catsService.remove(parseInt(id, 10));
    }
}