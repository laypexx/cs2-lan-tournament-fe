import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortDaily' })
export class SortDailyPipe implements PipeTransform {
  transform(value: any[]): any[] {
    return value?.sort((a, b) => a.currentDayRank - b.currentDayRank) || [];
  }
}

@Pipe({ name: 'sortTotal' })
export class SortTotalPipe implements PipeTransform {
  transform(value: any[]): any[] {
    return value?.sort((a, b) => a.currentRank - b.currentRank) || [];
  }
}
