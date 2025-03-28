import { Title, Meta } from "@angular/platform-browser";
// import { keywordsNames } from './../Models/project';
import { Injectable } from "@angular/core";
import { Location, isPlatformBrowser } from "@angular/common";
import { Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LayoutService } from "../Layout/layout.service";
import { environment } from "../../../environments/environment.development";
import {
  INewsKeywordsList,
  INewsKeywordsTag,
} from "../interface/Models/Bundle/PaginationModel";
import { PublicService } from "../Api-Services/public.service";

declare const addthis: any;

export interface keywordsNames {
  KeywordId: number;
  KeywordTitle: string;
}

@Injectable({
  providedIn: "root",
})
export class SeoV2Service {
  constructor(
    private http: HttpClient,
    private _Title: Title,
    private _Meta: Meta,
    private location: Location,
    private layoutService: LayoutService, private publicService: PublicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public setHostUrlIndex(event?: any): string {
    if (isPlatformBrowser(this.platformId)) {
      // This code will only run in the browser
      let host = window.location.href;

      this._Meta.updateTag({
        name: "original-source",
        content: host,
      });
      this._Meta.updateTag({
        property: "og:url",
        content: host,
      });
      if (typeof addthis !== "undefined") {
        addthis.update("share", "url", host);
        addthis.url = host;
        addthis.toolbox(".addthis_toolbox");
      }
      return host;
    }
    return "";
  }

  //  set Main address  for index
  public setTitle(title: string) {
    const lang = this.publicService.getCurrentLanguage();
    const oldTitle = lang == "ar" ? "دودچ چيم" : " DODGE-Gym";
    this._Meta.updateTag({
      name: "title",
      property: "og:title",
      content: title + "-" + oldTitle,
    });
    this._Title.setTitle(title + "-" + oldTitle);
  }

  public setMetaImage(imge: string) {
    // const url = "https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net"+imge
    const url = environment.serverFirstHalfOfImageUrl + imge;
    this._Meta.updateTag({
      property: "og:image",
      content: url,
    });
    this._Meta.updateTag({
      property: "og:image:secure_url",
      content: url,
    });
  }
  public setMetaImageStatic(imge: string) {
    // const url = "https://saudiaservicesapidev.azurewebsites.net"+imge
    const url = 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/' + imge;
    // const url = environment.storageURL + imge;
    this._Meta.updateTag({
      property: "og:image",
      content: url,
    });
    this._Meta.updateTag({
      property: "og:image:secure_url",
      content: url,
    });
  }
  public setMetaDescription(description: string) {
    this._Meta.updateTag({ property: "og:description", content: description });
    this._Meta.updateTag({ name: "description", content: description });
  }

  public setMetaKeywords(keywords: INewsKeywordsList[]) {
    let metakeywords = "";
    if (!keywords || !Array.isArray(keywords)) {
      return; // Add a guard clause to handle undefined or non-array inputs
    }

    keywords.forEach((element) => {
      metakeywords += "," + element.keywordTitle;
    });
    this._Meta.updateTag({
      name: "keywords",
      property: "schema:keywords",
      content: metakeywords,
    });
  }
  public NewsKeywordsTag(keywords: INewsKeywordsTag[]) {
    let metakeywords = "";
    if (!keywords || !Array.isArray(keywords)) {
      return; // Add a guard clause to handle undefined or non-array inputs
    }

    keywords.forEach((element) => {
      metakeywords += "," + element.title;
    });
    this._Meta.updateTag({
      name: "keywords",
      property: "schema:keywords",
      content: metakeywords,
    });
  }

  setMetaTags(translations: any) {
    this._Meta.updateTag({
      name: "description",
      content: translations.meta_description,
    });
    this._Meta.updateTag({
      name: "keywords",
      content: translations.meta_keywords,
    });
    this._Meta.updateTag({
      property: "og:description",
      content: translations.meta_description,
    });
    this._Meta.updateTag({
      property: "og:title",
      content: translations.home_title,
    });
  }
  getPath() {
    return this.location.path();
  }
  // getHost() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const fullURL = window.location.href;
  //     console.log(decodeURIComponent(fullURL));
  //     let hostname = new URL(fullURL).host;
  //     return decodeURIComponent(hostname);
  //   }
  // }

  SetPathDecodeURIComponent(path: string) {
    return decodeURIComponent(path);
  }

  getPathDecodeURIComponent() {
    const path = this.location.path().split("/")[1];
    return decodeURIComponent(path);
  }

  private baseUrl = environment.langJson; // مسار API على الخادم

  loadTranslations(lang: string): Observable<any> {
    const url = `${this.baseUrl}/${lang}`;
    return this.http.get(url).pipe(map((response: any) => response));
  }
  generateKeywords(text: string): INewsKeywordsList[] {
    const keywords: INewsKeywordsList[] = [];
    const words = text.split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      const keyword: INewsKeywordsList = {
        keywordId: i + 1,
        keywordTitle: words[i],
      };
      keywords.push(keyword);
    }

    return keywords;
  }

  updateDefaultSeo() {
    const lang = this.publicService.getCurrentLanguage();

    const oldTitle = lang == "ar" ? "دودچ چيم" : " DODGE-Gym";
    this._Meta.addTags([
      // <!-- Search Engine Optimization -->
      { name: "viewport", content: "width=device-width,initial-scale=1.0" },
      {
        name: "description",
        content: `خدمات السعوديه..

      2030 حاملة على عاتقها رؤية جديدة وآفاق اوسع في توظيف التقنية

      لتسهيل الحياة لكافة الشرائح المستفيدة من الأفراد والقطاعات الغير

      `,
      },
      {
        name: "author",
        property: "article:author",
        content: oldTitle,
      },
      {
        name: "keywords",
        property: "schema:keywords",
        content: `دودچ چيم, رؤية 2030, توظيف التقنية, تسهيل الحياة, الأفراد, القطاعات غير الحكومية, السعودية, تقنية المستقبل, تطوير الخدمات`,
      },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
      },
      {
        name: "original-source",
        content: "https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net",
      },
      {
        name: "copyright",
        content: "Copyright 2024, All rights reserved.",
      },
      // <!-- ekrameg.org Facebook Card -->
      { property: "og:locale", content: "ar_AR" },
      {
        name: "title",
        property: "og:title",
        content: oldTitle,
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        charset: "utf-8",
      },
      { name: "csrf-token", content: "" },
      { property: "og:type", content: "saudia.services" },
      { property: "og:url", content: "https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/" },
      { property: "og:image", content: "Image" },
      { property: "og:image:secure_url", content: "Image" },
      // { property: "og:image:type", content: "image/*" },
      { property: "og:image:width", content: "1080" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: oldTitle },
      { property: "og:site_name", content: oldTitle },
      { property: "og:description", content: oldTitle },

      // Additional Meta Tags
      { name: "application-name", content: oldTitle },
      // { name: 'msapplication-config', content: 'none' },
      // { name: 'msapplication-TileColor', content: '#ffffff' },
      // { name: 'msapplication-square70x70logo', content: 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/assets/images/SehatyLogo/Sehaty_Logo_70x70.png' },
      // { name: 'msapplication-square150x150logo', content: 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/assets/images/SehatyLogo/Sehaty_Logo_150x150.png' },
      // { name: 'msapplication-wide310x150logo', content: 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/assets/images/SehatyLogo/Sehaty_Logo_310X150.png' },
      // { name: 'msapplication-square310x310logo', content: 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net/assets/images/SehatyLogo/Sehaty_Logo_310X310.png' }
    ]);
  }
}
