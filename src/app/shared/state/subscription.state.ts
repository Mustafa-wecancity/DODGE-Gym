import { Injectable } from "@angular/core";
import { Store, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../services/notification.service";
import { SubscriptionService } from "../services/subscription.service";
import { Subscription } from "../action/subscription.action";

@Injectable()
export class SubscriptionState {
  
  constructor() {}

  @Action(Subscription)
  create(ctx: StateContext<any>, action: Subscription) {
    // subscription Logic Here
  }

}
