import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { ItensProvider } from '../itens/itens';

import { Compra } from '../../interfaces/compra';
import { Item } from '../../interfaces/Item';

@Injectable()
export class ComprasProvider {

  compras: Array<Compra> = [
    { id: 1, idItem: 1, quantidade: 1 },
    { id: 2, idItem: 2, quantidade: 2 },
    { id: 3, idItem: 3, quantidade: 3 },
    { id: 4, idItem: 4, quantidade: 4 },
  ];

  ultimoId: number = 4;

  constructor(public http: Http,
    public itensProvider: ItensProvider)
  {
    console.log('Hello ComprasProvider Provider');
  }

  getCompras() {
    return this.compras;
  }

  getCompra(cod: number) {
    return this.compras.find(compra => compra.id == cod);
  }

  getValorItem(idItem: number) {
    let item: Item = this.itensProvider.getItem(idItem);
    if(item){
      return item.valor;
    } else {
      return 0;
    }
  }

  editaCompra(id: number, idItem: number, quantidade: number) {
    let index = this.compras.findIndex(compra => compra.id == id);

    this.compras[index].idItem = idItem;
    this.compras[index].quantidade = quantidade;
  }

  deletaCompra(id: number) {
    let index = this.compras.findIndex(compra => compra.id == id);
    this.compras.splice(index,1);
  }

  adicionaCompra(idItem: number, quantidade: number) {
    this.ultimoId++;
    this.compras.push({
      id: this.ultimoId,
      idItem: idItem,
      quantidade: quantidade
    });
  }

}
