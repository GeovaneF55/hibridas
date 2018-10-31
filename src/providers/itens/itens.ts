import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Item } from '../../interfaces/Item';

@Injectable()
export class ItensProvider {

  itens: Array<Item> = [
    { id: 1 , nome: 'Item 1' , marca: 'Marca X' , valor: 32 },
    { id: 2 , nome: 'Item 2' , marca: 'Marca Y' , valor: 27 },
    { id: 3 , nome: 'Item 3' , marca: 'Marca Z' , valor: 16 },
    { id: 4 , nome: 'Item 4' , marca: 'Marca W' , valor: 8 }
  ];

  ultimoId: number = 4; 

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens() {
    return this.itens;
  }

  editaItem(id: number, nome: string, marca: string, valor: number) {
    for(let i=0; i<this.itens.length; i++) {
      if(this.itens[i].id == id) {
        this.itens[i].nome = nome;
        this.itens[i].marca = marca;
        this.itens[i].valor = valor;
        break;
      }
    }
  }

  deletaItem(id: number) {
    for(let i=0; i<this.itens.length; i++) {
      if(this.itens[i].id == id) {
        this.itens.splice(i,1);
        break;
      }
    }
  }

  adicionaItem(nome: string, marca: string, valor: number) {
    this.ultimoId++;
    this.itens.push({
      id: this.ultimoId,
      nome: nome,
      marca: marca,
      valor: valor
    });
  }

}
