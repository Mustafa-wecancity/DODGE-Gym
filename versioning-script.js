 
// const fs = require('fs');
// const path = require('path');

// // تحديد المسار إلى package.json
// const packageJsonPath = path.join(__dirname, 'package.json');

// // قراءة package.json
// const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// // تقسيم رقم الإصدار الحالي إلى [major, minor, patch]
// let versionParts = packageJson.version.split('.').map(Number);

// // زيادة رقم patch
// versionParts[2] += 1;

// // تحديث رقم الإصدار في package.json
// packageJson.version = versionParts.join('.');
// console.log(`Updated version in package.json to ${packageJson.version}`);

// // كتابة الإصدار الجديد إلى package.json
// fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

// // تحديد المسار إلى version.json
// const versionFilePath = path.join(__dirname, 'src', 'assets', 'version.json');

// // تحديث appVersion في version.json
// const versionData = {
//   appVersion: packageJson.version // استخدام الإصدار الجديد من package.json
// };

// // كتابة البيانات إلى version.json
// fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');

// console.log(`Updated version.json with appVersion: ${versionData.appVersion}`);



const fs = require('fs');
const path = require('path');

// تحديد المسار إلى package.json
const packageJsonPath = path.join(__dirname, 'package.json');

// قراءة package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// تقسيم رقم الإصدار الحالي إلى [major, minor, patch]
let versionParts = packageJson.version.split('.').map(Number);

// زيادة رقم patch
versionParts[2] += 1;

// تحديث رقم الإصدار في package.json
packageJson.version = versionParts.join('.');
console.log(`Updated version in package.json to ${packageJson.version}`);

// كتابة الإصدار الجديد إلى package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

// تحديد المسار إلى version.json
const versionFilePath = path.join(__dirname, 'src', 'assets', 'version.json');

// تحديث appVersion في version.json
const versionData = {
  appVersion: packageJson.version // استخدام الإصدار الجديد من package.json
};

// كتابة البيانات إلى version.json
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');

console.log(`Updated version.json with appVersion: ${versionData.appVersion}`);
