import { Component, OnInit } from '@angular/core';
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
  globalData!: GlobalDataSummary[];
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

            console.log(this.totalConfirmed);
            console.log(this.totalDeaths);
            console.log(this.totalRecovered);
            console.log(this.totalActive);
            
          }
        }
      )
  }

}
