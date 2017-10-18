import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// Autocomplete dependency for selected option event
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  };

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(200)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term: string) => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([]))
      .catch((error: any) => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  };

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  };

  // Event fired by matAutocomplete
  onOptionSelected(e: MatAutocompleteSelectedEvent): void {
    // the value is the full Hero object
    this.gotoDetail(e.option.value);
  };

  displayFn(hero: Hero): any {
    // used for displaying the Hero name in the autocomplete text input 
    return hero ? hero.name : hero;
  };
}