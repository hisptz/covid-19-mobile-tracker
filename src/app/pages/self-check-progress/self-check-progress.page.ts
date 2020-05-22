import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-self-check-progress',
  templateUrl: './self-check-progress.page.html',
  styleUrls: ['./self-check-progress.page.scss'],
})
export class SelfCheckProgressPage implements OnInit {
  tempChart: any;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.tempChart = Highcharts.chart('temperature-chart', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Fever Chart',
        },
        xAxis: {
          categories: ['12/03/2020', '13/03/2020', '14/03/2020'],
        },
        yAxis: {
          title: {
            text: 'Celcius',
          },
        },
        series: [
          {
            name: 'Temperature',
            data: [32, 32, 34],
          },
        ],
      });
    }, 20);
  }
}
