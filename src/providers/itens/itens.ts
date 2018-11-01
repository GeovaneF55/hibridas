import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Item } from '../../interfaces/Item';

@Injectable()
export class ItensProvider {

  itens: Array<Item> = [
    { id: 1 , nome: 'Item 1' , marca: 'Marca X' , valor: 32.00 },
    { id: 2 , nome: 'Item 2' , marca: 'Marca Y' , valor: 27.00 },
    { id: 3 , nome: 'Item 3' , marca: 'Marca Z' , valor: 16.00 },
    { id: 4 , nome: 'Item 4' , marca: 'Marca W' , valor: 8.00 }
  ];

  ultimoId: number = 4; 

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens() {
    return this.itens;
  }

  getItem(cod: number) {
    return this.itens.find(item => item.id == cod);
  }

  editaItem(id: number, nome: string, marca: string, valor: number) {
    let index = this.itens.findIndex(item => item.id == id);
    
    this.itens[index].nome = nome;
    this.itens[index].marca = marca;
    this.itens[index].valor = valor;
  }

  deletaItem(id: number) {
    let index = this.itens.findIndex(item => item.id == id);
    this.itens.splice(index,1);
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
