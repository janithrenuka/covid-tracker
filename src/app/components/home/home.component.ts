import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/lib/google-chart/google-chart.component';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  conVSdeath = 0;
  conVSrecover = 0;
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

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

              if(!Number.isNaN(row.confirmed)) {
                this.totalConfirmed += row.confirmed;
                this.totalDeaths += row.deaths;
                this.totalRecovered += row.recovered;
                this.totalActive += row.active;
              }
            });


            this.conVSdeath = Math.round(((this.totalDeaths / this.totalConfirmed) * 100) * 100 ) / 100;
            this.conVSrecover = Math.round(((this.totalRecovered / this.totalConfirmed) * 100) * 100 ) / 100;
            //this.conVSdeath = Math.round(((this.totalDeaths / this.totalConfirmed) * 100) * 100 ) / 100;
            console.log(this.conVSdeath);
            // console.log(this.totalConfirmed);
            // console.log(this.totalDeaths);
            // console.log(this.totalRecovered);
            // console.log(this.totalActive);
            
            console.log(result);
          }
        }
      )
  }

}
