import { Component, OnInit } from '@angular/core';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  conVSdeath = 0;
  conVSrecover = 0;
  data!: GlobalDataSummary[];
  countries : string[] = [];
  filteredCountries : string[] = [];
  // dateWiseData: any ;
  // selectedCountryData!: DateWiseData[];
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

    // this.dataService.getDateWiseDate().subscribe(
    //   (result)=> {
    //     //console.log(result);
    //     this.dateWiseData = result;
    //   }
    // )

    const unique = (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index
    }

    this.dataService.getGlobalData()
      .subscribe(
        {
          next : (result)=>{
            //console.log(result);
            result.forEach((row: {
              country : string;
              confirmed : number;
            }) => {

              if(!Number.isNaN(row.confirmed)) {
                //console.log(row.country);
                this.countries.push(row.country);
              }
            });

            console.log(this.countries);
            this.filteredCountries = this.countries.filter(unique);
            console.log(this.filteredCountries);
          }
        }
      )
  }

  updateValues(country : string) {
    console.log(country);

    this.dataService.getGlobalData()
      .subscribe(
        {
          next : (result)=>{
            //console.log(result);
            result.forEach((row: {
              country : string;
              confirmed : number;
              deaths : number;
              recovered : number;
              active : number;
            }) => {

              if(row.country == country) {
                this.totalConfirmed += row.confirmed;
                this.totalDeaths += row.deaths;
                this.totalRecovered += row.recovered;
                this.totalActive += row.active;
              }
            });

            this.conVSdeath = Math.round(((this.totalDeaths / this.totalConfirmed) * 100) * 100 ) / 100;
            this.conVSrecover = Math.round(((this.totalRecovered / this.totalConfirmed) * 100) * 100 ) / 100;



          }
        }
      )
  }

}
