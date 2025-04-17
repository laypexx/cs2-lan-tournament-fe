import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatchService } from '../service/match.service';
import { interval, Subscription, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

  rankingData: any;
  showRanking: boolean = false;

  loading: boolean = false;

  private pollingSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private matchService: MatchService,
    private router: Router
  ) {
    this.username = this.auth.getUserName();
    this.loading = true;
    if (!this.username) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.pollingSubscription = interval(2000).subscribe(() => {
      this.fetchData();
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) this.pollingSubscription.unsubscribe();
  }

  getPairedPlayers(team1: any[], team2: any[]): any[] {
    const maxLength = Math.max(team1.length, team2.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
      result.push({
        index: i,
        team1: team1[i] || null,
        team2: team2[i] || null,
      });
    }

    return result;
  }

  showRankingView() {
    this.showRanking = true;
  }

  fetchData() {
    this.matchService.getData().subscribe({
      next: (res: any) => {
        this.currentMatch = res.currentMatch;
        this.rankingData = res.rankingData;
        this.recentMatches = res.recentMatches;
        this.loading = false;
      },
      error: (err) => {
        this.currentMatch = null;
        this.rankingData = null;
        this.recentMatches = null;
      },
    });
  }

  join() {
    this.matchService
      .getSteamUrl()
      .pipe(take(1))
      .subscribe({
        next: (steamUrl: any) => {
          const link = document.createElement('a');
          link.href = steamUrl;
          link.click();
        },
        error: (err) => {
          console.log(err);
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
