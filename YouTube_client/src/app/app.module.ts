import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './auth.interseptor';
import { reducers, metaReducers } from './redux/reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  AppRoutingModule,
  CoreModule,
  HttpClientModule,
  StoreModule.forRoot(reducers, {
    metaReducers,
    }),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
  {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  },
  ],
  bootstrap: [AppComponent],
  })
export class AppModule {}
