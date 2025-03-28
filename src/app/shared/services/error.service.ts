import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { PublicService } from '../Api-Services/public.service';
interface Notification {
  message: string;
}
interface ErrorForWeb {
  message: string;
  title: string;
}
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
   // notification = new BehaviorSubject<Notification | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: object, private _router:Router,private publicService:PublicService) {
    // this.notification.next('');
    // this.error.next('');

  }

  getClientErrorMessage(error: Error): string {    
    if (isPlatformBrowser(this.platformId) && navigator) {
      return navigator.onLine ? 
             error.message ? error.message : 'Something Went Wrong' : 'No Internet Connection';
    }
    return 'An error occurred.';
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return error.message;
  } 
  logOut(): void {

    if (isPlatformBrowser(this.platformId) ) {
    
    localStorage.clear();

    this._router.navigate([`/${this.publicService.getCurrentLanguage()}/auth/login`]);
  }
  }

  private notification = new BehaviorSubject<Notification | null>(null);
  // Getter for the notification as an Observable
  getNotification = this.notification.asObservable().pipe(shareReplay(1));

  // Method to set a notification
  setNotification(notification: Notification): void {
    this.notification.next(notification);
  }

  // Method to clear the notification
  clearNotification(): void {
    this.notification.next(null);
  }


    // Create a BehaviorSubject to hold the error message, initially set to null
    private errorSubject = new BehaviorSubject<ErrorForWeb | null>(null);

    // Observable to be subscribed to for getting the error
    public error = this.errorSubject.asObservable().pipe(shareReplay(1));
  
  
  
    // Method to set an error
    setError(message: ErrorForWeb): void {
      this.errorSubject.next(message); // Set the error message
    }
  
    // Method to clear the error
    clearError(): void {
      this.errorSubject.next(null); // Clear the error message
    }
}
