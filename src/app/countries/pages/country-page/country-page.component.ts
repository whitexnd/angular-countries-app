import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  standalone: false,
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  country?: Country;

  constructor(private route: ActivatedRoute, private countriesService: CountriesService, private router: Router){}

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id) )
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('');
      
      return this.country = country;
    })    
  }


}
