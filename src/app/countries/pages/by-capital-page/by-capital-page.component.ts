import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{

  isLoading: boolean = false;
  countries: Country[] = [];
  initialValue: string = '';

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term : string){
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe(countries => {
      this.countries = countries
      this.isLoading = false;
    });
  }


}
