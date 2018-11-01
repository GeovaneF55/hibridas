import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ComprasProvider } from '../../providers/compras/compras';
import { ItensProvider } from '../../providers/itens/itens';

import { CompraPage } from '../compra/compra';

import { Compra } from '../../interfaces/compra';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compras: Array<Compra>;
  total: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comprasProvider: ComprasProvider,
    public itensProvider: ItensProvider)
  {
      this.compras = this.comprasProvider.getCompras();  
      this.makeTotal();
  }

  ionViewDidEnter() {
    this.compras = this.comprasProvider.getCompras();
    this.makeTotal();
  }

  nomeItem(cod: number) {
    let item = this.itensProvider.getItem(cod);
    if(item){
      return item.nome;
    } else {
      return 'Error';
    }
  }

  valItem(cod: number) {
    return this.comprasProvider.getValorItem(cod);
  }

  makeSubTotal(cod: number) {
    let compra: Compra = this.comprasProvider.getCompra(cod);  

    return compra.quantidade * this.valItem(compra.idItem);
  }

  makeTotal() {
    let t: number = 0;
    for(let i=0; i<this.compras.length; i++) {
      let compra: Compra = this.compras[i];

      t += compra.quantidade * this.valItem(compra.idItem);
    }
    this.total = t;
  }

  editaCompra(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(CompraPage, { id: cod, novo: false });
  }

  deletaCompra(codigo) {
    let cod = parseInt(codigo);
    this.comprasProvider.deletaCompra(cod);

    this.compras = this.comprasProvider.getCompras();
    this.makeTotal();
  }

  novaCompra() {
    this.navCtrl.push(CompraPage, { id: -1, novo: true });
  }

}
