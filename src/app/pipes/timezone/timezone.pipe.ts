import { Pipe, PipeTransform } from '@angular/core';
import { formatDate  } from '@angular/common';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

  // constructor(private datePipe: DatePipe) {}

  // transform(value: any, format: string): string | null {
  //   const zonaHorariaLocal = 'local'; // Utiliza 'local' para obtener la zona horaria local del navegador
  //   return this.datePipe.transform(value, format, zonaHorariaLocal);
  // }

  // transform(value: any, format: string): string | null {
  //   const zonaHorariaLocal = 'local'; // Utiliza 'local' para obtener la zona horaria local del navegador
  //   return formatDate(value, format, 'ES', zonaHorariaLocal);
  // }

  transform(value: any, format: string): string | null {
    // No especificar la zona horaria local
    return formatDate(value, format, 'en-US');
  }

}
