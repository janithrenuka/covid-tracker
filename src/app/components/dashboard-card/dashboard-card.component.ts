import { Component, Input, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed!: number;
  @Input('totalDeaths')
  totalDeaths!: number;
  @Input('totalActive')
  totalActive!: number;
  @Input('totalRecovered')
  totalRecovered!: number;

  

  constructor() { }

  ngOnInit(): void {

  }

}
