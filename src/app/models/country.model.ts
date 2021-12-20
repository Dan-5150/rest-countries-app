import { CountryName } from './country-name.model';
import { Currency } from './currency.model';
import { Flag } from './flag.model';

export class Country {
  constructor(
    public name: CountryName,
    public cca2: string,
    public cca3: string,
    public capital: string[],
    public altSpellings: string[],
    public region: string,
    public continents: string[],
    public population: number,
    public latlng: number[],
    public area: number,
    public timezones: string[],
    public currencies: Currency,
    public languages: any,
    public flags: Flag,
    public independent: boolean,
    public landlocked: boolean,
    public unMember: boolean,
    public status: string,
    public subregion: string,
    public borders: string[],
    public tld: string[]
  ) {}
}
