import { Component, Input } from '@angular/core';

import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html'
})
export class CountryCardComponent {
  @Input() country: Country;
}
