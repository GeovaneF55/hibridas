import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ComprasProvider } from '../../providers/compras/compras';

import { CompraPage } from '../compra/compra';

import { Compra } from '../../interfaces/compra';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compras: Array<Compra>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comprasProvider: ComprasProvider)
  {
      this.compras = this.comprasProvider.getCompras();  
  }

  ionViewDidEnter() {
    this.compras = this.comprasProvider.getCompras();
  }

  editaCompra(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(CompraPage, { id: cod, novo: false });
  }

  deletaCompra(codigo) {
    let cod = parseInt(codigo);
    this.comprasProvider.deletaCompra(cod);
  }

  novoCompra() {
    this.navCtrl.push(CompraPage, { id: -1, novo: true });
  }

}
