import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ItensPage } from '../pages/itens/itens';
import { ItemPage } from '../pages/item/item';
import { ComprasPage } from '../pages/compras/compras';
import { CompraPage } from '../pages/compra/compra';

import { ComprasProvider } from '../providers/compras/compras';
import { ItensProvider } from '../providers/itens/itens';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ItensPage,
    ItemPage,
    ComprasPage,
    CompraPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ItensPage,
    ItemPage,
    ComprasPage,
    CompraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComprasProvider,
    ItensProvider
  ]
})
export class AppModule {}
