import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColor'
})
export class CategoryColorPipe implements PipeTransform {

  transform(category: string): string {
    switch (category) {
      case 'electronics':
        return 'electronics-color';
      case 'men\'s clothing':
        return 'mens-clothing-color';
      case 'jewelry':
        return 'jewelry-color';
      case 'women\'s clothing':
        return 'womens-clothing-color';
      default:
        return 'default-color';
    }
  }

}
