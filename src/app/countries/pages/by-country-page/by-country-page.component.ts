import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term : string){
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe(countries => {
      this.countries = countries
      this.isLoading = false;
    });
  }

}
