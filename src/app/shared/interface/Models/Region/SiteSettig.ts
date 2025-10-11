
export interface GetContact {
  contactEmail: string;
  contactPhone: string;
  address: string;

    facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedInLink: string;
  youTubeLink: string;
}

export interface GetLogo {
  logoPath: string;
  faviconPath: string;
}


export interface SiteSettings extends GetContact, GetLogo {



  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedInLink: string;
  youTubeLink: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  otherAnalytics: string;
  hoursPlusUtc: number;
  id: number;

  lastUpdated: string | null; // DateTime? maps to nullable string
}
