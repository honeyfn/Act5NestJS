import { Injectable, Param, Get, NotFoundException} from '@nestjs/common';
import { Cat } from './types/cat.type';
import { CreateCatDto } from './types/create-cat.dto';
import { UpdateCatDto } from './types/update-cat.dto';

@Injectable()
export class CatsService {
    cats: Cat[];

    constructor() {
        //crear un gato al inicio
        this.cats = [
            {
                id: 1,
                name: "Baccarat",
                color: "calico",
                age: 1.5,
            },
            {
                id: 2,
                name: "Botas",
                color: "vaquita",
                age: 7,
            }
        ];
    }

    allCats(): Cat[] {
        return this.cats;
    }

    getById(id: number): Cat | undefined {
        return this.cats.find(cat => cat.id === id);
    }

    create(catDto: CreateCatDto): Cat {
        const newCat: Cat = {
        id: this.cats.length + 1,
        ...catDto,
        };
        this.cats.push(newCat);
        return newCat;
    }

    update(id: number, updateCatDto: UpdateCatDto): Cat {
        const index = this.cats.findIndex(cat => cat.id === id);
        if (index === -1) throw new NotFoundException(`Cat with id ${id} not found`);

        const updated = {
            ...this.cats[index],  // datos originales
            ...updateCatDto       // sobrescribe con los campos enviados
        };

        this.cats[index] = updated;
        return updated;
    }

    remove(id: number): void {
        const index = this.cats.findIndex(cat => cat.id === id);
        if (index === -1) throw new NotFoundException(`Cat with id ${id} not found`);
        this.cats.splice(index, 1);
    }
}