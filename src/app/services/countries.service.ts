import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { Country } from '../models/country.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  /**
   * Initialize type library subject
   */
  private countrySubject = new BehaviorSubject<Country[]>([]);

  /**
   * Initialize type library observable
   */
  public countries$: Observable<Country[]> = this.countrySubject.asObservable();

  /**
   * Constructor
   *
   * @param apiService Api service
   */
  constructor(private apiService: ApiService) {}

  /**
   * Returns all countries
   */
  getCountries(): void {
    this.apiService
      .createGetRequest(`all`)
      .pipe(map((response: Country[]) => Object.values(response)))
      .subscribe((res) => {
        this.countrySubject.next(res);
      });
  }

  /**
   * Returns a specific country
   *
   * @param code Country code
   */
  filterCountryByCode(code: string): Observable<Country | undefined> {
    return this.countries$.pipe(
      map((countries) => countries.find((item) => item.cca3 === code))
    );
  }

  /**
   * Returns a specific country
   *
   * @param countryCode Country code
   */
  getCountryByName(name: string): void {
    if (name === '') {
      this.getCountries();
    } else {
      this.apiService
        .createGetRequest(`name/${name}`)
        .pipe(map((response: Country[]) => Object.values(response)))
        .subscribe((res) => {
          this.countrySubject.next(res);
        });
    }
  }

  /**
   * Returns a specific country
   *
   * @param countryCode Country code
   */
  getCountryByRegion(region: string): void {
    this.apiService
      .createGetRequest(`region/${region}`)
      .pipe(map((response: Country[]) => Object.values(response)))
      .subscribe((res) => {
        this.countrySubject.next(res);
      });
  }
}
