import {AccountsComponent} from '../components/accounts/accounts.component';
import {CurrenciesComponent} from '../components/currencies/currencies.component';
import {InstancesComponent} from '../components/instances/instances.component';
import {TaskComponent} from '../components/task/task.component';
import {ItemsComponent} from '../components/items/items.component';

export enum TabType {
  server = 'server',
  mob = 'mob',
  item = 'item',
  combat = 'combat',
  character = 'character',
  integration = 'integration'
}

export const TabTypeIcon: {[key in TabType]: string} = {
  [TabType.server]: 'storage',
  [TabType.mob]: 'storage',
  [TabType.item]: 'storage',
  [TabType.combat]: 'storage',
  [TabType.character]: 'storage',
  [TabType.integration]: 'storage'
};

export interface Tab {
  id: string;
  icon: string;
  title: string;
  type: TabType;
  active?: boolean;
  component?: any;
}

export const tabs: Tab[] = [
  {
    id: 'tab_instances',
    icon: 'storage',
    title: 'NAV.INSTANCES',
    type: TabType.server,
    component: InstancesComponent
  },
  {
    id: 'tab_accounts',
    icon: 'account_circle',
    title: 'NAV.ACCOUNTS',
    type: TabType.server,
    component: AccountsComponent
  },
  {
    id: 'tab_task',
    icon: 'storage',
    title: 'NAV.TASK',
    type: TabType.server,
    component: TaskComponent
  },
  {
    id: 'tab_items',
    icon: 'storage',
    title: 'NAV.ITEMS',
    type: TabType.item,
    component: ItemsComponent
  },
  {
    id: 'tab_currencies',
    icon: 'attach_money',
    title: 'NAV.CURRENCIES',
    type: TabType.item,
    component: CurrenciesComponent
  }
];
