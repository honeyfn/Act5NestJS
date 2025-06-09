import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //"delegar" la respuesta al servicio
    return 'Hello World! Esto es Nest';
  }
}