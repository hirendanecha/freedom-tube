import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  show(header: string, textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ header, textOrTpl, ...options });
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  removeAll(): void {
    this.toasts = [];
  }

  success(msg: string): void {
    this.show('Success', msg, { className: 'bg-success text-light' })
  }

  error(msg: string): void {
    this.show('Error', msg, { className: 'bg-danger text-light' })
  }

  info(msg: string): void {
    this.show('Info', msg, { className: 'bg-info text-light' })
  }
}
