import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '../../../../../shared/interface/theme-option.interface';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';
import { LayoutService } from '../../../../Layout/layout.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { changeEnv } from '../../../../../../environments/environment.development';
import { changeEnvProd } from '../../../../../../environments/environment';
import { LocalizationLanguageService } from '../../../../Api-Services/localization-language.service';
import { TranslationService } from '../../../../Api-Services/translation.service';
import { PublicService } from '../../../../Api-Services/public.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  @Input() style: string = 'basic';

  public active: boolean = false;
  public languages: languages[] = [
    {
      language: 'English',
      code: 'en',
      dir: 'ltr',
      icon: 'us'
    },
    {
      language: 'Arabic',
      code: 'ar',
      dir: 'rtl',
      icon: 'sa'
    },

  ]
  public value: string;

  public selectedLanguage: languages = {
    language: 'English',
    code: 'en',  
    dir: 'ltr',
    icon: 'us'
  }

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object,
  public _layout: LayoutService,
  private _LocalizationLanguageService: LocalizationLanguageService,
  public translationService: TranslationService,
  private publicService: PublicService) {
    // this.selectLanguage(this.selectedLanguage)
    // this.init();
  }

  selectLanguage(language: languages){
    this.active = false;
    //  this.translate.use(language.code);
    this.selectedLanguage = language;
    // this.layout(language.dir)
    this.changeLanguage(language.code ,true)
  }

  openDropDown(){
    this.active = !this.active;
  }

  hideDropdown(){
    this.active = false;
  }
  layout(value: string){
    this.value = value;
    if (isPlatformBrowser(this.platformId)){
    if(value === 'rtl'){
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }
  }


  private init() {
    if (isPlatformBrowser(this.platformId)) 

      if (typeof localStorage !== 'undefined') {
        const language = localStorage.getItem('language');
        if (language !=null) {
          this.changeLanguage(language, false)
          if(language== 'ar')
 
            {
                         // this.selectLanguage(this.languages[1])
            this.selectedLanguage=this.languages[1];
            }
            else{
              this.selectedLanguage=this.languages[0];
              // this.changeLanguage('ar', false);
            }
        }
        else{
          this.changeLanguage('ar', false);
          this.selectedLanguage=this.languages[0];
        }
     
      }
    }


    changeLanguage(code:string, reload: boolean) {
      if (isPlatformBrowser(this.platformId)) {
        this.translate.use(code);
        if (typeof localStorage !== 'undefined') {
          const language = localStorage.getItem('language');
          if (language != code) {
            this.translate.use(code);
            localStorage.setItem('language', code);
            this._layout.config.langu = code;
            changeEnv(code);
            changeEnvProd(code);
            if (code == 'ar') {this.customizeLayoutType('rtl', reload);
          this.selectedLanguage=this.languages[1];
              
        }
            else{
              this.customizeLayoutType('ltr', reload);
            }
          } else {
            console.log(code, '==', language);
            this._layout.config.langu = code;
            changeEnv(code);
            changeEnvProd(code);
          }
        }
      }
    }
  
    public layoutType: string = 'rtl'; // default
    // Layout Type
    private customizeLayoutType(val:string, reload: boolean) {
      this._layout.config.settings.layout_type = val;
      
      if (isPlatformBrowser(this.platformId)&&typeof document !== 'undefined' )
        if (val == 'rtl') {
          document.getElementsByTagName('html')[0].setAttribute('dir', val);
          document.getElementsByTagName('html')[0].setAttribute('lang', 'ar');
          if (typeof document.body.classList !== 'undefined') {
            // access the classList property
            document.body.classList.remove('ltr');
            document.body.classList.add('rtl');
          }
          reload == true ? this._layout.reloadPage() : null;
        } else {
          document.getElementsByTagName('html')[0].removeAttribute('dir');
          document.getElementsByTagName('html')[0].setAttribute('lang', 'en');
          if (typeof document.body.classList !== 'undefined') {
            // access the classList property
            document.body.classList.remove('rtl');
            document.body.classList.add('ltr');
          }
          reload == true ? this._layout.reloadPage() : null;
        }
    }

  currentLanguage: any;

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.currentLanguage = this.publicService.getCurrentLanguage();
      }
      this.publicService?.pushUrlData?.subscribe((res: any) => {
       })
    }
  
    chnageLanguage(lang: any): void {
      this._LocalizationLanguageService.updatePathAccordingLang(lang);
      this.translationService.changeLang(lang);
    }
}
