import {Component, OnInit} from '@angular/core';
import {AccountsInterface} from 'app/models/accounts.interface';
import {ConfigRow, ConfigTypes} from 'app/models/configRow.interface';
import {TabTypes} from 'app/models/tabTypes.enum';

@Component({
  selector: 'atv-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  config: {[key in keyof AccountsInterface]: ConfigRow} = {
    id: {
      type: ConfigTypes.number,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
    },
    mod_id: {
      type: ConfigTypes.dropdown,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
      data: [{id: 1, title: 'Mod 1'}, {id: 2, title: 'Mod 2'}],
    },
    name: {
      type: ConfigTypes.string,
      visible: true,
      filterVisible: true,
      useAsSearch: true,
    },
    faction: {
      type: ConfigTypes.string,
      visible: true,
      filterVisible: true,
      useAsSearch: true,
    },
    motd: {
      type: ConfigTypes.string,
      visible: true,
      filterVisible: false,
      useAsSearch: true,
    },
    omotd: {
      type: ConfigTypes.string,
      visible: true,
      filterVisible: false,
      useAsSearch: true,
    },
    isActive: {
      type: ConfigTypes.boolean,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
    },
    creationtimestamp: {
      type: ConfigTypes.date,
      visible: true,
      filterVisible: true,
      useAsSearch: false,
    },
  };

  data: AccountsInterface[] = [
    {
      id: 1,
      mod_id: 1,
      name: 'Guild',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
    {
      id: 2,
      mod_id: 2,
      name: 'Guild #2',
      faction: 'Light',
      motd: 'Example',
      omotd: 'Example',
      isActive: true,
      creationtimestamp: '2004-02-12T15:19:21+00:00',
    },
  ];

  dataType: TabTypes = TabTypes.ACCOUNTS;
}
