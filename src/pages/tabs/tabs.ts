import { Component } from '@angular/core';

import { CameraPage } from '../camera/camera';
import { ComprasPage } from '../compras/compras';
import { ItensPage } from '../itens/itens';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CameraPage;
  tab2Root = ItensPage;
  tab3Root = ComprasPage;

  constructor() {

  }
}
