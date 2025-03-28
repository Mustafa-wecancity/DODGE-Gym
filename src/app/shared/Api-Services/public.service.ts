 import { Inject, Injectable, makeStateKey, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser, Location } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class PublicService {
  updateUrl = new BehaviorSubject<boolean>(false);
  pushUrlData = new BehaviorSubject<boolean>(false);
  private readonly validSegments: string[] = ['ar', 'en'];
  private readonly defaultLanguage = 'ar';
  private readonly LANGUAGE_KEY = makeStateKey<string>('CURRENT_LANGUAGE');
  private isBrowser: boolean;
  public isLoading = new BehaviorSubject(false);

  
  constructor(  @Inject(PLATFORM_ID) private platformId: Object,
     private location: Location,
    

  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId); // تحديد البيئة مرة واحدة

  }

  getCurrentLanguage__(): string | null {
    const validSegments: string[] = ['ar', 'en'];
     

    if ( this.isBrowser ) {
      // This block will run only on the client side
      const path = this.location.path().split('/')[1];

      // Check if the first segment is a valid language key
      if (validSegments.includes(path)) {
        localStorage.setItem('language', path);
        return path
        } else {
          const storedLang = localStorage.getItem('language');
          const lang = storedLang ? storedLang : 'ar';
          // const lang = storedLang ? storedLang : this.translate.getDefaultLang();
          this.updatePath(`${lang}${this.location.path()}`);
          localStorage.setItem('language', lang);
          return lang;
     }
      } else {
       // Server-side execution
       const path = this.location.path().split('/')[1]; // Using Location to get path
       // Check if the first segment is a valid language key
       if (validSegments.includes(path)) {
        // localStorage.setItem('language', path);
         return path;
       } else {
         // Provide a default language or handle the logic for SSR
         if ( this.isBrowser ) 
         {
          localStorage.setItem('language', 'ar');
         }
      
         return 'ar'; // Adjust as needed
       }
      }
      // return decodeURIComponent(path);
    }
 
    getCurrentLanguage(): string {
      // تحديد اللغة الافتراضية
      let lang = this.defaultLanguage;
  
      try {
        const pathSegment = this.location.path().split('/')[1]; // الجزء الأول من الـ URL
  
        if (this.validSegments.includes(pathSegment)) {
          lang = pathSegment;
        } else if (this.isBrowser) {
          // إذا كنا على المتصفح، نحاول استخدام اللغة المخزنة
          const storedLang = localStorage.getItem('language');
          lang = storedLang || this.defaultLanguage;
          this.updatePath(`${lang}${this.location.path()}`); // تحديث المسار بالـ URL الصحيح
        }
      } catch (error) {
        console.error('Error determining current language:', error);
      }
  
      // تخزين اللغة إذا كنا على المتصفح
      if (this.isBrowser) {
        localStorage.setItem('language', lang);
      }
  
      return lang;
    }
  
    changeTitle(newTitle: string): void {
      // تقسيم المسار الحالي إلى أجزاء
      const pathSegments = this.location.path().split('/').filter(segment => segment !== '');
    
      // اختيار آخر جزء وتحديثه
      if (pathSegments.length > 0) {
        pathSegments[pathSegments.length - 1] = newTitle; // تحديث آخر عنوان
      } else {
        pathSegments.push(newTitle); // في حال كان المسار فارغًا
      }
    
      // تحديث المسار
      const updatedPath = '/' + pathSegments.join('/');
      this.updatePath(updatedPath);
    }
  updatePath(newPath: string): void {
    if(this.location.path() != newPath)
    this.location.replaceState(newPath);
  }
}
