import { Component, EventEmitter, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Menu, MenuModel } from '../../../interface/menu.interface';
 import { Product } from '../../../../shared/interface/product.interface';
import { BlogState } from '../../../../shared/state/blog.state';
import { Blog, BlogModel } from '../../../../shared/interface/blog.interface';
import { Router, RouterModule } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { Option } from '../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LinkBoxComponent } from './link-box/link-box.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { PublicService } from '../../../Api-Services/public.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

   @Select(BlogState.blog) blog$: Observable<BlogModel>;
  // @Select(MenuState.menu) menu$: Observable<MenuModel>;
 
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public menu: Menu[] = [];
  public products: any[];
  public blogs: Blog[];

  constructor(private store: Store, private router: Router, public menuService: MenuService, private publicService: PublicService){
    // this.menu$.subscribe(menu => {
    //   const productIds = Array.from(new Set(this.concatDynamicProductKeys(menu, 'product_ids')));
    //   if(productIds && productIds.length){
    //     this.store.dispatch(new GetMenuProducts({ids: productIds?.join()})).subscribe({
    //       next: (val) => {
    //         this.products = val.product.menuProducts.slice(0,2);
    //       }
    //     })
    //   }

    //   const blogIds = Array.from(new Set(this.concatDynamicProductKeys(menu, 'blog_ids')));
    //   if(blogIds && blogIds.length){
    //     this.store.dispatch(new GetSelectedBlogs({status: 1, ids: blogIds?.join()})).subscribe({
    //       next: (val) => {
    //         this.blogs = val.blog.selectedBlogs.slice(0,2);
    //       }
    //     })
    //   }
    // })
  }
  @Output() setmenu: EventEmitter<boolean> = new EventEmitter();

 
  redirect(path:string){
    this.setmenu.emit(false);
    const language = this.publicService.getCurrentLanguage() ?? 'ar';
    const url = `/${language}${path}`;  // Corrected the URL formation
    this.router.navigateByUrl(url)
  }

  toggle(menu: Menu){
    if(!menu.active){
      this.menu.forEach(item => {
        if(this.menu.includes(menu)){
          item.active = false;
        }
      })
    }
    menu.active = !menu.active;
  }

  concatDynamicProductKeys(obj: any, keyName: string) {
    const result: number[] = [];
    function traverse(obj: any) {
      for (const key in obj) {
        if (key === keyName && Array.isArray(obj[key])) {
          result.push(...obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        }else {
          if(key === keyName && obj.product_ids){
            result.push(obj.product_ids)
          };
        }
      }
    }
    traverse(obj);
    return result;
  }
   

}
