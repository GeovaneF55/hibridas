import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItensProvider } from '../../providers/itens/itens';

import { Item } from '../../interfaces/Item';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  idItem: number;
  nomeItem: string;
  marcaItem: string;
  valorItem: number;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itensProvider: ItensProvider)
  {
    this.idItem = this.navParams.get('id');
    this.novo = this.navParams.get('novo');

    if(!this.novo){
      let item: Item = this.itensProvider.getItem(this.idItem);
  
      this.nomeItem = item.nome;
      this.marcaItem = item.marca;
      this.valorItem = item.valor;
    } else {
      this.nomeItem = "";
      this.marcaItem = "";
      this.valorItem = 0;
    }
  }

  alterar() {
    this.itensProvider.editaItem(
      this.idItem,
      this.nomeItem,
      this.marcaItem,
      this.valorItem
    );
    this.navCtrl.pop();
  }

  incluir() {
    this.itensProvider.adicionaItem(
      this.nomeItem,
      this.marcaItem,
      this.valorItem
    );
    this.navCtrl.pop();
  }

}
