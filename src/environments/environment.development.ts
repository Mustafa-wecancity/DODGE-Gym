// export const api ="https://alnada-depointapi.azurewebsites.net" //live
// export const api ="https://dodgegymdev.runasp.net" //test
export const api ="https://localhost:44374" //Devolpment


//  export const baseURL= 'http://localhost:4200' //Devolpment
// export const baseURL= 'https://alnada- DODGE-Gymwebsite-dev.azurewebsites.net' // live
export const baseURL= 'httpshttps://dodge-gym.vercel.app' //  Test 


 



// For Image form server
// export const api_ ="https://localhost:44374" //test
 export const api_ ="https://dodgegymdev.runasp.net"  //live

export const environment = {
  production: false,
  baseURL_: `${api}/api/ar/`, // Default language path
  language: "ar", // Default language
  baseURL: `${api}/api/`,
  URL: `${baseURL}/assets/data`,
  storageURL: `${baseURL}`,
  imageDefault: `${baseURL}/assets/images/data/themes/madrid/2.jpg`,

  langJson: `${api}/api`,
  // langJson: 'https://localhost:7265/api/json/Saudia',
  serverFirstHalfOfImageUrl: `${api_}/`,
};

export function changeEnv(lan: string) {
  environment.language = lan;
  environment.baseURL_ = `${api}/api/${lan}/`;
}
