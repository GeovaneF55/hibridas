import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  imagem: string = '';  // Imagem que será apresentada na página

  // Construtor - Plugin é recebido por injeção de dependências
  constructor( private platform: Platform,
    private camera: Camera)
  {
  }

  // Método para tirar foto
  tirarFoto() {
    // Testa se a aplicação está sendo executada em um dispositivo
    this.platform.ready().then(()=>{
      // Definições para a imagem capturada
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      // Captura uma imagem usando a câmera, na forma de um URI de dados
      this.camera.getPicture(options).then((imageData) => {
        this.imagem = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Trata o erro
      });
    });
  }

}