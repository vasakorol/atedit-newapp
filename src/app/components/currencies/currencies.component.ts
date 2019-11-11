import {Component, OnInit} from '@angular/core';
import {ConfigRow, ConfigTypes} from 'app/models/configRow.interface';
import {CurrenciesInterface} from 'app/models/currencies.interface';
import {TabTypes} from 'app/models/tabTypes.enum';

@Component({
  selector: 'atv-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  config: {[key in keyof CurrenciesInterface]: ConfigRow} = {
    gold: {
      type: ConfigTypes.number,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
    },
    silver: {
      type: ConfigTypes.number,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
    },
    bronze: {
      type: ConfigTypes.number,
      visible: true,
      filterVisible: true,
      useAsSearch: true,
    },
    diamonds: {
      type: ConfigTypes.number,
      visible: true,
      filterVisible: true,
      useAsSearch: true,
    },
  };

  data: CurrenciesInterface[] = [
    {
      gold: 5,
      silver: 2,
      bronze: 12,
      diamonds: 33,
    },
    {
      gold: 55,
      silver: 2,
      bronze: 12,
      diamonds: 33,
    },
    {
      gold: 15,
      silver: 2,
      bronze: 12,
      diamonds: 233,
    },
    {
      gold: 25,
      silver: 2,
      bronze: 12,
      diamonds: 33,
    },
    {
      gold: 45,
      silver: 2,
      bronze: 122,
      diamonds: 313,
    },
    {
      gold: 5,
      silver: 2,
      bronze: 12,
      diamonds: 33,
    },
    {
      gold: 5,
      silver: 42,
      bronze: 12,
      diamonds: 33,
    },
    {
      gold: 225,
      silver: 2,
      bronze: 12,
      diamonds: 333,
    },
  ];

  dataType: TabTypes = TabTypes.CURRENCIES;
}
