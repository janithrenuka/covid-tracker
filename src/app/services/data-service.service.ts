import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  date = new Date();
  

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-10-2021.csv`;
  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private http: HttpClient) { }

  getDateWiseDate() {
    return this.http.get(this.dateWiseDataUrl, {responseType : 'text'});
  }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, {responseType : 'text'}).pipe(
           map(result => {

            let data: GlobalDataSummary[] = []; 
            let rows = result.split('\n');
            rows.splice(0, 1); // remove header column row
            rows.forEach(row=>{
              let cols = row.split(/,(?=\S)/);
              
              data.push({
                country : cols[3],
                confirmed : +cols[7],
                deaths : +cols[8],
                recovered : +cols[9],
                active : +cols[10],
                
              });

              //console.log('conuntry:' + cols[3] + ' ' + 'confirmed:' + cols[7] + ' ' + 'deaths:' + cols[8] + ' ' + 'recovered:' + cols[9] + ' ' + 'active:' + cols[10]);
            })

             return <GlobalDataSummary>Object.values(data);
           })
    )
  }
} 

