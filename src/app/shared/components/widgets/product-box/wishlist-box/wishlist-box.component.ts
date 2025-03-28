import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  output,
  PLATFORM_ID,

} from "@angular/core";
import { NgbModule, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CurrencySymbolPipe } from "../../../../pipe/currency-symbol.pipe";
import { TitleCasePipe } from "../../../../pipe/title-case.pipe";
import { ButtonComponent } from "../../button/button.component";
 import { TranslateModule } from "@ngx-translate/core";
import { Iwishlist } from "../../../../interface/Models/wishlist/iwishlist";
import { GenericService } from "../../../../Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../../Api-Services/API_ENDPOINTS";
import { TruncatePipe } from "../../../../pipe/truncate.pipe";

@Component({
  selector: "app-wishlist-box",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    ButtonComponent,
    TruncatePipe,
  ],
  providers: [CurrencySymbolPipe],
  templateUrl: "./wishlist-box.component.html",
  styleUrl: "./wishlist-box.component.scss",
})
export class WishlistBoxComponent {
  @Input() service: Iwishlist;
  @Input() class: string;
  @Input() close: boolean;
  @Output() clickOutside: EventEmitter<boolean> = new EventEmitter();


  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(
    private _wishlistService: GenericService,
    @Inject(PLATFORM_ID) private platformId: Object,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

 

  removeWishlist(id: number) {
    const params = { customerwishlistId: id };
    this._wishlistService.subscription.add(
      this._wishlistService
        .getAll<any>(API_ENDPOINTS.CustomerWishlists.RemoveFromWishList, params)
        .subscribe(
          (data) => {
            this.clickOutside.emit(true);
          },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }

  navigate(isInvalid: boolean) {
    // this.clickOutside.emit(isInvalid);
  }

  externalProductLink(link: string) {
    // if (link && isPlatformBrowser(this.platformId)) {
    //   window.open(link, "_blank");
    // }
  }
}
