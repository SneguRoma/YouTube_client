import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [LoginComponent, AdminComponent],
  imports: [
  CommonModule, FormsModule, AuthRoutingModule, ReactiveFormsModule
  ],
  exports: [
  LoginComponent, AdminComponent
  ],
  })
export class AuthModule { }
