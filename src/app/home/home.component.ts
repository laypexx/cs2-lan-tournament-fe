import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatchService } from '../service/match.service';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  username: any;
  userpoints: any;

  currentMatch: any;
  recentMatches: any;

  private pollingSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private matchService: MatchService,
    private cdr: ChangeDetectorRef
  ) {
    this.username = this.auth.getUserName();
  }

  ngOnInit(): void {
    this.pollingSubscription = interval(2000).subscribe(() => {
      //TODO maybe auf WebSockets umsteigen?
      this.fetchData();
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) this.pollingSubscription.unsubscribe();
  }

  reloadRecents() {
    //TODO
  }

  fetchData() {
    this.matchService.getCurrentMatch().subscribe({
      next: (res) => {
        this.currentMatch = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.currentMatch = null;
      },
    });
  }

  toggleReady() {
    this.matchService
      .toggleReadyState()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.currentMatch = res;
        },
      });
  }

  userInMatch(): boolean {
    if (!this.currentMatch) {
      return false;
    }

    return (
      this.currentMatch.team1.some(
        (player: any) => player.user.username === this.username
      ) ||
      this.currentMatch.team2.some(
        (player: any) => player.user.username === this.username
      )
    );
  }
}
