import { Component } from '@angular/core';

import { ComprasPage } from '../compras/compras';
import { ItensPage } from '../itens/itens';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ItensPage;
  tab2Root = ComprasPage;

  constructor() {

  }
}
