import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage-card',
  templateUrl: './percentage-card.component.html',
  styleUrls: ['./percentage-card.component.css']
})
export class PercentageCardComponent implements OnInit {

  @Input('conVSdeath')
  conVSdeath!: number;
  @Input('conVSrecover')
  conVSrecover!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
