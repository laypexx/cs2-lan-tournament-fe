import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Pipe,
  PipeTransform,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ranking',
  standalone: false,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnChanges {
  @Input() rankingData: any;
  @Input() username: any;
  @Output() exit = new EventEmitter<void>();

  maxLength = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rankingData'] && this.rankingData) {
      this.maxLength = this.sortedTotalRankings.length;
    }
  }

  close() {
    this.exit.emit();
    this.rankingData = null;
  }

  get sortedDailyRankings() {
    return (
      this.rankingData?.userRankings.sort(
        (a: any, b: any) => a.currentDayRank - b.currentDayRank
      ) || []
    );
  }

  get sortedTotalRankings() {
    return (
      this.rankingData?.userRankings?.sort(
        (a: any, b: any) => a.currentRank - b.currentRank
      ) || []
    );
  }
}
