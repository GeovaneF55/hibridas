import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//nativo 
import { CameraPage } from '../pages/camera/camera';

// FireBase DB
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { ItensPage } from '../pages/itens/itens';
import { ItemPage } from '../pages/item/item';
import { ComprasPage } from '../pages/compras/compras';
import { CompraPage } from '../pages/compra/compra';

// Providers
import { ComprasProvider } from '../providers/compras/compras';
import { ItensProvider } from '../providers/itens/itens';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ItensPage,
    ItemPage,
    ComprasPage,
    CompraPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ItensPage,
    ItemPage,
    ComprasPage,
    CompraPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComprasProvider,
    ItensProvider
  ]
})
export class AppModule {}
