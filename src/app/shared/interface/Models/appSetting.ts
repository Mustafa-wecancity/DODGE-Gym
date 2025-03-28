export const ApiForImageForReport = "https://saudiaservicesapidev.azurewebsites.net/";
export const PasswordPattern = '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{6,}';
// export const EmailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const EmailPattern ="^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

// export const  ApiForImageForReport = "https://motimback.wecancity.com/";

// Universal function to transform HTML to plain text
export function transformHtml(value: string): string {
    if (!value) return ''; // إذا كان النص فارغًا أو غير موجود
  
    // التحقق إذا كنا على السيرفر أو في المتصفح
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // على السيرفر: استخدم RegEx لإزالة الوسوم
      return value.replace(/<\/?[^>]+(>|$)/g, ''); // إزالة الوسوم
    }
  
    // في المتصفح: استخدم DOM لتحويل HTML إلى نص
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    return tempElement.textContent || tempElement.innerText || '';
  }
  