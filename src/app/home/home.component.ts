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
  maps = [
    { id: 1, name: 'Inferno' },
    { id: 2, name: 'Dust' },
    { id: 3, name: 'Mirage' },
    { id: 4, name: 'Nuke' },
    { id: 5, name: 'Train' },
    { id: 6, name: 'Anubis' },
    { id: 7, name: 'Vertigo' },
    { id: 8, name: 'Office' },
  ];

  username: any;
  userpoints: any;

  currentMatch: any;
  recentMatches: any;

  selectedMap: any;

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
          if (res) {
            this.currentMatch = res;
          }
        },
      });
  }

  userInMatch(): boolean {
    if (!this.currentMatch) {
      return false;
    }

    return (
      this.currentMatch?.team1.some(
        (player: any) => player.user.username === this.username
      ) ||
      this.currentMatch?.team2.some(
        (player: any) => player.user.username === this.username
      )
    );
  }

  allPlayersReady(): boolean {
    if (!this.currentMatch) {
      return false;
    }

    return (
      this.currentMatch?.team1.every((player: any) => player.ready === true) &&
      this.currentMatch?.team2.every((player: any) => player.ready === true)
    );
  }

  voteMap(map: string) {
    this.matchService.voteMap(map).subscribe({
      next: (res) => {
        if (res) {
          this.currentMatch = res;
        }
      },
    });
  }

  getVotersForMap(map: string): string {
    if (!this.currentMatch) {
      return 'NO_VOTES';
    }

    const allPlayers = [...this.currentMatch.team1, ...this.currentMatch.team2];

    const voters = allPlayers
      .filter((player: any) => player.votedMap === map)
      .map((player: any) => player.playerUsername);

    return voters?.length ? `VOTES: ${voters.length}` : 'NO_VOTES';
  }
}
