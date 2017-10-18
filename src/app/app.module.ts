import { NgModule }                 from '@angular/core';

import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { RouterModule }             from '@angular/router';

import { FormsModule }              from '@angular/forms';

import { HttpModule }    from '@angular/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
}                               from '@angular/material';

import { AppComponent }         from './app.component';

import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';
import {
        HeroesComponent,
        HeroesSelectedDialog,
        HeroesAddDialog
      }                         from './heroes.component';
import { HeroSearchComponent }  from './hero-search.component';
import { HeroService }          from './hero.service';

import { ThemePickerModule }    from './shared/theme-picker/theme-picker'; 

import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class MyMaterialModule {}

@NgModule({
  imports:          [ 
                      BrowserModule,
                      FormsModule,
                      BrowserAnimationsModule,
                      MyMaterialModule,
                      AppRoutingModule,
                      HttpModule,
                      InMemoryWebApiModule.forRoot(InMemoryDataService),
                      AppRoutingModule,
                      ThemePickerModule
                    ],
  declarations:     [ 
                      AppComponent,
                      DashboardComponent,
                      HeroDetailComponent,
                      HeroesComponent,
                      HeroesSelectedDialog,
                      HeroesAddDialog,
                      HeroSearchComponent
                    ],
  entryComponents:  [
                      HeroesSelectedDialog,
                      HeroesAddDialog
                    ],
  providers:        [ HeroService, ],
  bootstrap:        [ AppComponent ]
})
export class AppModule { }
