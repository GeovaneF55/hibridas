import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { Item } from '../../interfaces/Item';
import firebase from 'firebase';
@Injectable()
export class ItensProvider {

  url:string = "https://my-json-server.typicode.com/GeovaneF55/hibridas-db";
  // url:string = "http://localhost:3000";

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
      // this.http.get(this.url + "/item")
      // .toPromise()
      // .then( resposta => {
      //   let dados = resposta.json();
      //   let itens : Array<Item> = [];
      //   for(let i=0; i<dados.length; i++){
      //     itens.push({
      //       id: dados[i].id,
      //       nome: dados[i].nome,
      //       marca: dados[i].marca,
      //       valor: dados[i].valor
      //     });
      //   }
      //   resolve(itens);
      // });
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
    })
    // return new Promise(resolve => {
    //   this.http.get(this.url + "/item/" + cod)
    //   .toPromise()
    //   .then( resposta => {
    //     let dados = resposta.json();
    //     let item: Item = {
    //         id: dados.id,
    //         nome: dados.nome,
    //         marca: dados.marca,
    //         valor: dados.valor
    //       }
    //     resolve(item);
    //   });
    // });
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
    })
    

    // let headers = new Headers({"Content-type": "application/json"});
    // let body = JSON.stringify(item);

    // return new Promise( resolve => {
    //   this.http.put(this.url + '/item/' + id, body, { headers: headers })
    //   .toPromise()
    //   .then( resposta => {
    //     resolve(resposta.json());
    //   });
    // });
  }

  deletaItem(id: String): Promise <any> {
    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('items/' + id).remove();
      resolve(id);
      // this.http.delete(this.url + "/item/" + id)
      // .toPromise()
      // .then(resposta => {
      //   resolve(resposta.json());
      // });
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
    })

    // let headers = new Headers({"Content-type": "application/json"});
    // let body = JSON.stringify(item);
    

    // return new Promise( resolve => {
      
    //   this.http.post(this.url + '/item', body, { headers: headers })
    //   .toPromise()
    //   .then( resposta => {
    //     resolve(resposta.json());
    //   });
    // });
  }

}
