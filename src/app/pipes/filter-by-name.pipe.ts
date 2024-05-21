import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => 
      (item.nombre && item.nombre.toLowerCase().includes(searchText)) || 
      (item.apellido && item.apellido.toLowerCase().includes(searchText))
    );
  }

}
