import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// routing
import { routing, appRoutingProviders } from './config/security/app.routing';
// guard
import { AuthGuard } from './config/security/auth.guard';
// authorization
import { AuthorizationService } from './shared/services/authorization/authorization.service'
// interceptor
import { InterceptorService } from './shared/services/interceptor/interceptor.service';
// toastr
import {ToastModule} from 'ng2-toastr/ng2-toastr';
// ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
// external libs
import { SelectModule } from 'ng2-select-compat';
import { DndModule } from 'ng2-dnd';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TopicsComponent } from './components/topics/topics.component';
import { DeleteTopicsComponent } from './components/delete-topics/delete-topics.component';
import { FilterPipe } from './shared/pipes/filter';
import { SortGridPipe } from './shared/pipes/sort';
import { SplashComponent } from './components/splash/splash.component';
import { ManagementComponent } from './components/management/management.component';
import { AddAdminModalComponent } from './components/management/add-admin-modal/add-admin-modal.component';
import { DeleteAdminModalComponent } from './components/management/delete-admin-modal/delete-admin-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MessagesComponent,
    NotificationsComponent,
    TopicsComponent,
    DeleteTopicsComponent,
    FilterPipe,
    SortGridPipe,
    SplashComponent,
    ManagementComponent,
    AddAdminModalComponent,
    DeleteAdminModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    SelectModule,
    DndModule.forRoot(),
    LMarkdownEditorModule
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AuthorizationService,
    InterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
