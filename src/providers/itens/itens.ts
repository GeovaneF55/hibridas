import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { Item } from '../../interfaces/Item';
import firebase from 'firebase';
@Injectable()
export class ItensProvider {

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens(): Promise<Item[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('items/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let itens : Array<Item> = []
        
        const itemKeys = Object.keys(resp);

        itemKeys.forEach(key => {
          const item = resp[key]
          itens.push({
            id: key,
            nome: item.nome,
            marca: item.marca,
            valor: item.valor
          });
        })

        resolve(itens);
      });
    });
  }

  getItem(cod: String): Promise<Item> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('items/' + cod).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let item: Item;
        if(resp) {
           item = {
            id: resp.id,
            nome: resp.nome,
            marca: resp.marca,
            valor: resp.valor
          }
        }
        resolve(item);
      });
    });
  }

  editaItem(id: String, nome: string, marca: string, valor: number): Promise <any> {
    let item = {
      nome: nome,
      marca: marca,
      valor: valor
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('items/' + id).set(item);

      resolve(item);
    });
  }

  deletaItem(id: String): Promise <any> {
    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('items/' + id).remove();
      resolve(id);
    });
  }

  adicionaItem(nome: string, marca: string, valor: number): Promise <any> {
    let item = {
      nome: nome,
      marca: marca,
      valor: valor
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('items/').push(item);
      resolve(item)
    });
  }

}