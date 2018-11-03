import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ItensProvider } from '../../providers/itens/itens';

import { ItemPage } from '../item/item';

import { Item } from '../../interfaces/Item';

@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  itens: Array<Item>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itensProvider: ItensProvider)
  {
    this.itensProvider.getItens().then( dados => {
      this.itens = dados;
    });
  }

  ionViewDidEnter() {
    this.itensProvider.getItens().then( dados => {
      this.itens = dados;
    });
  }

  editaItem(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(ItemPage, { id: cod, novo: false });
  }

  deletaItem(codigo) {
    let cod = parseInt(codigo);
    this.itensProvider.deletaItem(cod).then(response => {
      this.itensProvider.getItens().then( dados => {
        this.itens = dados;
      });
    });
  }

  novoItem() {
    this.navCtrl.push(ItemPage, { id: -1, novo: true });
  }

}
