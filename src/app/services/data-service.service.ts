import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';

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
    return this.http.get(this.dateWiseDataUrl, {responseType : 'text'})
      .pipe(map(result => {

        let rows = result.split('\n');

        let mainData: any = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/) //splict header values separate with commas
        
        dates.splice(0, 4);
        
        rows.splice(0 , 1);
        //console.log(dates);
        

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let con = cols[1];
          cols.splice(0 , 4);
          //console.log(con, cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            let dw : DateWiseData = {
              cases : +value,
              country : con,
              date : new Date(Date.parse(dates[index]))
            }
            mainData[con].push(dw)
          })
          
        })
          console.log(mainData);
          return mainData;
      }))
      
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

