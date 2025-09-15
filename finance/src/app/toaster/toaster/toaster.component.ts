import { Component } from '@angular/core';
import { ToastService, ToastMessage } from '../toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  
  toasts: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe((toast: ToastMessage) => {
      this.toasts.push(toast);
      setTimeout(() => this.toasts.shift(), 3000); // auto dismiss after 3s
    });
  }
}

