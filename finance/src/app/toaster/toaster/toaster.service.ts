import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.toastSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.toastSubject.next({ type: 'error', message });
  }

  showWarning(message: string) {
    this.toastSubject.next({ type: 'warning', message });
  }

  showApiError(err: any) {
  let message = 'An unexpected error occurred';
  const errorObj = err?.error;

  if (errorObj?.errors) {
      const keys = Object.keys(errorObj.errors);
      if (keys.length === 1) {
        const firstError = errorObj.errors[keys[0]];
        message = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        message = 'An unexpected error occurred';
      }
  } else if (errorObj?.message) {
    message = errorObj.message;
  } else if (errorObj?.title) {
    message = errorObj.title;
  } else if (typeof errorObj === 'string') {
    message = errorObj;
  } else if (err?.message) {
    message = err.message;
  }

  this.toastSubject.next({ type: 'error', message });
  }
}
