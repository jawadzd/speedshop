import { Pipe, PipeTransform } from '@angular/core';
//this is a custom pipe that will be used to change the color of the category based on the category name
@Pipe({
  name: 'categoryColor',
})
export class CategoryColorPipe implements PipeTransform {
  transform(category: string): string {
    switch (category) {
      case 'electronics':
        return 'electronics-color';
      case "men's clothing":
        return 'mens-clothing-color';
      case 'jewelry':
        return 'jewelry-color';
      case "women's clothing":
        return 'womens-clothing-color';
      default:
        return 'default-color';
    }
  }
}
