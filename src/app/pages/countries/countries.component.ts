import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit {
  /**
   * Creates an instance of CountriesComponent.
   * 
   * @param {CountriesService} countriesService
   */
  constructor(public countriesService: CountriesService, private titleService: Title) {
    this.titleService.setTitle("Countries App");
  }

  /**
   * Get list of all countries
   */
  ngOnInit(): void {
    this.countriesService.getCountries();
  }
}
