import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { Item } from '../../interfaces/Item';

@Injectable()
export class ItensProvider {

  //url:string = "https://my-json-server.typicode.com/GeovaneF55/hibridas-db";
  url:string = "http://localhost:3000";

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens(): Promise<Item[]> {
    return new Promise(resolve => {
      this.http.get(this.url + "/item")
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let itens : Array<Item> = [];
        for(let i=0; i<dados.length; i++){
          itens.push({
            id: dados[i].id,
            nome: dados[i].nome,
            marca: dados[i].marca,
            valor: dados[i].valor
          });
        }
        resolve(itens);
      });
    });
  }

  getItem(cod: number): Promise<Item> {
    return new Promise(resolve => {
      this.http.get(this.url + "/item/" + cod)
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let item: Item = {
            id: dados.id,
            nome: dados.nome,
            marca: dados.marca,
            valor: dados.valor
          }
        resolve(item);
      });
    });
  }

  editaItem(id: number, nome: string, marca: string, valor: number): Promise <any> {
    let headers = new Headers({"Content-type": "application/json"});

    let item = {
      nome: nome,
      marca: marca,
      valor: valor
    };

    let body = JSON.stringify(item);

    return new Promise( resolve => {
      this.http.put(this.url + '/item/' + id, body, { headers: headers })
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  deletaItem(id: number): Promise <any> {
    return new Promise( resolve => {
      this.http.delete(this.url + "/item/" + id)
      .toPromise()
      .then(resposta => {
        resolve(resposta.json());
      });
    });
  }

  adicionaItem(nome: string, marca: string, valor: number): Promise <any> {
    let headers = new Headers({"Content-type": "application/json"});

    let item = {
      nome: nome,
      marca: marca,
      valor: valor
    };

    let body = JSON.stringify(item);

    return new Promise( resolve => {
      this.http.post(this.url + '/item', body, { headers: headers })
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

}
