import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): any {
    const pattern = search.replace(/[\-\[\]\/\\]/g, '\\$&');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, (match) => `<mark>${match}</mark>`) : text;
  }
}
