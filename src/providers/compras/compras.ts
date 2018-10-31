import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Compra } from '../../interfaces/compra';

@Injectable()
export class ComprasProvider {

  compras: Array<Compra> = [
    { id: 1, idItem: 1, quantidade: 1, total: 32 },
    { id: 2, idItem: 2, quantidade: 2, total: 54 },
    { id: 3, idItem: 3, quantidade: 3, total: 48 },
    { id: 4, idItem: 4, quantidade: 4, total: 32 },
  ];

  ultimoId: number = 4;

  constructor(public http: Http) {
    console.log('Hello ComprasProvider Provider');
  }

  getCompras() {
    return this.compras;
  }

  editaCompra(id: number, idItem: number, quantidade: number, total: number) {
    for(let i=0; i<this.compras.length; i++) {
      if(this.compras[i].id == id) {
        this.compras[i].idItem = idItem;
        this.compras[i].quantidade = quantidade;
        this.compras[i].total = total;
        break;
      }
    }
  }

  deletaCompra(id: number) {
    for(let i=0; i<this.compras.length; i++) {
      if(this.compras[i].id == id) {
        this.compras.splice(i,1);
        break;
      }
    }
  }

  adicionaCompra(idItem: number, quantidade: number, total: number) {
    this.ultimoId++;
    this.compras.push({
      id: this.ultimoId,
      idItem: idItem,
      quantidade: quantidade,
      total: total
    });
  }

}
