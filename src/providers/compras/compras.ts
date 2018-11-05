import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { ItensProvider } from '../itens/itens';

import { Compra } from '../../interfaces/compra';
import firebase from 'firebase';
@Injectable()
export class ComprasProvider {

  constructor(public http: Http,
    public itensProvider: ItensProvider)
  {
    console.log('Hello ComprasProvider Provider');
  }

  getCompras(): Promise<Compra[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('compras/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let compras : Array<Compra> = []

        if(resp) {
          const itemKeys = Object.keys(resp);

          itemKeys.forEach(key => {
            const item = resp[key]
            compras.push({
              id: key,
              idItem: item.idItem,
              quantidade: item.quantidade
            });
          })
        }
        
        resolve(compras);
      });
    });
  }

  getCompra(cod: String): Promise<Compra> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('compras/' + cod).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let compra: Compra;
        
        if(resp) {
           compra = {
            id: resp.id,
            idItem: resp.idItem,
            quantidade: resp.quantidade
          }
        }
        
        resolve(compra);
      });
    });
  }

  editaCompra(id: String, idItem: String, quantidade: number): Promise<any> {
    let compra = {
      idItem: idItem,
      quantidade: quantidade
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('compras/' + id).set(compra);

      resolve(compra);
    });
  }

  deletaCompra(id: String): Promise<any> {

    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('compras/' + id).remove();
      resolve(id);
    });
  }

  adicionaCompra(idItem: String, quantidade: number): Promise<any> {
    let compra = {
      idItem: idItem,
      quantidade: quantidade
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('compras/').push(compra);
      resolve(compra)
    });
  }

}