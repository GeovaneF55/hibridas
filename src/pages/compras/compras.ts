import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ComprasProvider } from '../../providers/compras/compras';
import { ItensProvider } from '../../providers/itens/itens';

import { CompraPage } from '../compra/compra';

import { Compra } from '../../interfaces/compra';
import { Item } from '../../interfaces/Item';

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  compras: Array<Compra>;
  itens: Array<Item>;
  total: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comprasProvider: ComprasProvider,
    public itensProvider: ItensProvider)
  {

    this.itensProvider.getItens().then( dados => {
      this.itens = dados;
    });

    this.comprasProvider.getCompras().then( dados => {
      this.compras = dados;  
      this.makeTotal();
    });
  }

  ionViewDidEnter() {
    this.comprasProvider.getCompras().then( dados => {
      this.compras = dados;  
      this.makeTotal();
    });
  }

  nomeItem(cod: number) {
    let item: Item = this.itens.find(item => item.id == cod);

    if(item){
      return item.nome;
    } else {
      return 'Error';
    }
  }

  valItem(cod: number) {
    let item: Item = this.itens.find(item => item.id == cod);

    if(item){
      return item.valor;
    } else {
      return 0.0;
    }
  }

  makeSubTotal(cod: number) {
    let compra: Compra = this.compras.find(compra => compra.id == cod);

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
    this.comprasProvider.deletaCompra(cod).then( response => {
      this.comprasProvider.getCompras().then( dados => {
        this.compras = dados;  
        this.makeTotal();
      });
    });
  }

  novaCompra() {
    this.navCtrl.push(CompraPage, { id: -1, novo: true });
  }

}
