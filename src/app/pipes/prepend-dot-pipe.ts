import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prependDot'
})
export class PrependDotPipe implements PipeTransform {

  transform(value: string): string {
    return `• ${value}`;
  }

}
