import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ComprasProvider } from '../../providers/compras/compras';
import { ItensProvider } from '../../providers/itens/itens';

import { Compra } from '../../interfaces/compra';
import { Item } from '../../interfaces/Item';

@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {

  idCompra: number;
  idItemCompra: number;
  quantidadeCompra: number;

  itens: Array<Item>;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public comprasProvider: ComprasProvider,
    public itensProvider: ItensProvider
    )
  {
    this.idCompra = this.navParams.get('id');
    this.novo = this.navParams.get('novo');

    this.itensProvider.getItens().then( itens => {
      this.itens = itens;

      if(!this.novo){
        this.comprasProvider.getCompra(this.idCompra).then( dados => {
          let compra: Compra = dados;

          this.idItemCompra = compra.idItem;
          this.quantidadeCompra = compra.quantidade;
        });
      } else {
        this.idItemCompra = this.itens[0].id;
        this.quantidadeCompra = 1;
      }
    });
  }

  alterar() {
    this.comprasProvider.editaCompra(
      this.idCompra,
      this.idItemCompra,
      this.quantidadeCompra
    );
    this.navCtrl.pop();
  }

  incluir() {
    this.comprasProvider.adicionaCompra(
      this.idItemCompra,
      this.quantidadeCompra
    );
    this.navCtrl.pop();
  }
}
