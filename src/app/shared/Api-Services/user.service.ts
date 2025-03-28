import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGetProfileLocalized } from '../interface/Models/Customer/profileModel';
 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSource = new BehaviorSubject<IGetProfileLocalized | null>(null);
  currentUser$ = this.userSource.asObservable();

  updateUser(user: IGetProfileLocalized) {
    this.userSource.next(user);
  }
}
