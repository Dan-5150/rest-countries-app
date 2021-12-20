import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit {
  /**
   * Current country code
   */
  countryCode: string;

  /**
   * Initial country object
   */
  country: Country = <Country> {
    name: {
      common: "",
      official: "",
      nativeName: "",
    },
    cca2: "",
    cca3: "",
    capital: [""],
    altSpellings: [""],
    region: "",
    continents: [""],
    population: 0,
    latlng: [0],
    area: 0,
    timezones: [""],
    currencies: {

    },
    languages: "",
    flags: {
      svg: "",
      png: "",
    },
    independent: false,
    landlocked: false,
    unMember: false,
    status: "",
    subregion: "",
    borders: [""],
    tld: [""],
  };

  /**
   * Array of border countries of selected country
   */
  borderCountries: Country[] = [];

  /**
   * Currencies of selected country
   */
  currencies = '';

  /**
   * Languages of selected country
   */
  languages = '';

  /**
   * Languages of selected country
   */
  nativeName = '';

  /**
   * Creates an instance of CountryComponent.
   *
   * @param {ActivatedRoute} route
   * @param {CountriesService} countriesService
   */
  constructor(
    private route: ActivatedRoute,
    public countriesService: CountriesService
  ) {
    window.scroll(0,0);
  }

  /**
   * Gets country info from route param
   */
  ngOnInit(): void {
    // Get specific country from route param
    this.route.params.subscribe((params: Params) => {
      this.countryCode = params['id'];

      // Get specific country information
      this.countriesService.countries$.subscribe((country) => {
        // Retrieve all countries if none exist
        if (country.length === 0) {
          this.countriesService.getCountries();
        }

        // Filter all countries to find specific one
        if (country.length > 0) {
          this.countriesService
            .filterCountryByCode(this.countryCode)
            .subscribe((singleCountry) => {
              if (singleCountry) {
                this.country = singleCountry;
                if (this.country.borders) {
                  this.getBorderCountryNames();
                }
                this.parseNativeName(singleCountry.name.nativeName);
                this.parseCurrencies(singleCountry.currencies);
                this.parseLanguages(singleCountry.languages);
              }
            });
          }
      });
    });
  }

  /**
   * Parse native name into a string
   *
   * @param {*} nativeName
   */
  parseNativeName(nativeName: any): void {
    this.nativeName = '';
    Object.values(nativeName).map((name: any) => {
      this.nativeName = name.common;
    });
  }

  /**
   * Parse all languages into a string
   *
   * @param {*} languages
   */
  parseLanguages(languages: any): void {
    this.languages = '';
    Object.values(languages).map((language: any, index: number) => {
      if (index === 0) {
        this.languages = language;
      } else {
        this.languages = this.languages + ", " + language;
      }
    });
  }

  /**
   * Parse all currencies into a string
   *
   * @param {*} currencies
   */
  parseCurrencies(currencies: any): void {
    this.currencies = '';
    Object.values(currencies).map((currency: any, index: number) => {
      if (index === 0) {
        this.currencies = currency.name;
      } else {
        this.currencies = this.currencies + ", " + currency.name;
      }
    });
  }

  getBorderCountryNames(): void {
    this.borderCountries = [];
    for (const border of this.country.borders) {
      this.countriesService
        .filterCountryByCode(border)
        .subscribe((borderName) => {
          if (borderName) {
            this.borderCountries.push(borderName);
          }
        });
    }
  }
}
