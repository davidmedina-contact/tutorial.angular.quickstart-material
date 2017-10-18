import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(
    private router: Router,
    private heroService: HeroService,
    public dialog: MatDialog
  ) { }

  heroes: Hero[];
  name = 'Angular';
  selectedHero: Hero;
  title = 'Tour of Heroes';

  ngOnInit(): void {
    this.getHeroes();
  };

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  };

  openSelectedDialog(hero: Hero): void {
    let selectedDialogRef = this.dialog.open(HeroesSelectedDialog, {
      width: '75vw',
      data: { selectedHero: hero }
    });

    this.onSelect(hero);
  };

  openAddDialog(): void {
    let addDialogRef = this.dialog.open(HeroesAddDialog, {
      width: '75vw',
      data: { heroesComponent: this }
    });
  };

  add(name: string): Promise<boolean> {
    name = name.trim();

    if (!name) {
      return;
    }

    return new Promise((resolve, reject) => {
        this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;

          resolve(true);
      });
    });
  };

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);

          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        });
  };
}

@Component({
  selector: 'heroes-selected-dialog',
  templateUrl: './heroes-selected.dialog.html',
})
export class HeroesSelectedDialog {
  constructor(
    public selectedDialogRef: MatDialogRef<HeroesSelectedDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseClick(): void {
    this.selectedDialogRef.close();
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.data.selectedHero.id]);
    this.selectedDialogRef.close();
  };
}

@Component({
  selector: 'heroes-add-dialog',
  templateUrl: './heroes-add.dialog.html'
})
export class HeroesAddDialog {
  constructor(
    public addDialogRef: MatDialogRef<HeroesAddDialog>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCloseClick(): void {
    this.addDialogRef.close();
  };

  onAddFormSubmit(name: string): void {
    if (name !== '') {
      this.data.heroesComponent.add(name)
        .then((wasHeroAdded: boolean) => {
          if (wasHeroAdded) {
            let snackBarRef = this.snackBar.open('Hero added', '', {
              duration: 3000
            });
          }
        });
    }
  };
}
