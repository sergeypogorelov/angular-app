import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    let minutes = +value;

    if (typeof minutes !== 'number' || isNaN(minutes))
      return result;

    let hours = Math.floor(minutes / 60);
    let minutesWithoutHours = minutes - hours * 60;

    if (hours !== 0) {
      if (hours === 1) {
        result += `${hours} hour`;
      } else {
        result += `${hours} hours`;
      }
    }

    if (hours !== 0 && minutesWithoutHours !== 0) {
      result += ' ';
    }

    if (minutesWithoutHours !== 0) {
      if (minutesWithoutHours === 1) {
        result += `${minutesWithoutHours} minute`;
      } else {
        result += `${minutesWithoutHours} minutes`
      }
    }

    return result;
  }

}
