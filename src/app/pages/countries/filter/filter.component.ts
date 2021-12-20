import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  /**
   * List of available subregions
   *
   * @type {string[]}
   */
  subregions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  private subject: Subject<string> = new Subject();

  constructor(public countriesService: CountriesService) {}

  ngOnInit(): void {
    this.subject.pipe(debounceTime(500)).subscribe((searchTextValue) => {
      this.countriesService.getCountryByName(searchTextValue);
    });
  }

  regionSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value === "") {
      this.countriesService.getCountries();
    } else {
      this.countriesService.getCountryByRegion(input.value);
    }
  }

  onKeyUp(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.subject.next(input.value);
  }
}
