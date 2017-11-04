import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { HomeComponent } from '../../components/home/home.component';
import { MessagesComponent } from '../../components/messages/messages.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { TopicsComponent } from '../../components/topics/topics.component';
import { SplashComponent } from '../../components/splash/splash.component';
// Import the rest of the components here
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: 'home'}},
    {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard], data: {roles: 'messages'}},
    {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard], data: {roles: 'notifications'}},
    {path: 'topics', component: TopicsComponent, canActivate: [AuthGuard], data: {roles: 'topics'}},
    {path: 'splash', component: SplashComponent, canActivate: [AuthGuard], data: {roles: 'splash'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
