import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise'

import { ItensProvider } from '../itens/itens';

import { Compra } from '../../interfaces/compra';
@Injectable()
export class ComprasProvider {

  url:string = "https://my-json-server.typicode.com/GeovaneF55/hibridas-db";
  //url:string = "http://localhost:3000";

  constructor(public http: Http,
    public itensProvider: ItensProvider)
  {
    console.log('Hello ComprasProvider Provider');
  }

  getCompras(): Promise<Compra[]> {

    return new Promise(resolve => {
      this.http.get(this.url + "/compra")
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let compras : Array<Compra> = [];
        for(let i=0; i<dados.length; i++){
          compras.push({
            id: dados[i].id,
            idItem: dados[i].idItem,
            quantidade: dados[i].quantidade
          });
        }
        resolve(compras);
      });
    });
  }

  getCompra(cod: number): Promise<Compra> {

    return new Promise(resolve => {
      this.http.get(this.url + "/compra/" + cod)
      .toPromise()
      .then( resposta => {
        let dados = resposta.json();
        let compra: Compra = {
            id: dados.id,
            idItem: dados.idItem,
            quantidade: dados.quantidade
          }
        resolve(compra);
      });
    });
  }

  editaCompra(id: number, idItem: number, quantidade: number): Promise<any> {

    let headers = new Headers({"Content-type": "application/json"});

    let compra = {
      idItem: idItem,
      quantidade: quantidade
    };

    let body = JSON.stringify(compra);

    return new Promise( resolve => {
      this.http.put(this.url + '/compra/' + id, body, { headers: headers })
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

  deletaCompra(id: number): Promise<any> {

    return new Promise( resolve => {
      this.http.delete(this.url + "/compra/" + id)
      .toPromise()
      .then(resposta => {
        resolve(resposta.json());
      });
    });
  }

  adicionaCompra(idItem: number, quantidade: number): Promise<any> {

    let headers = new Headers({"Content-type": "application/json"});

    let compra = {
      idItem: idItem,
      quantidade: quantidade
    };

    let body = JSON.stringify(compra);
  
    return new Promise( resolve => {
      this.http.post(this.url + '/compra', body, { headers: headers })
      .toPromise()
      .then( resposta => {
        resolve(resposta.json());
      });
    });
  }

}
