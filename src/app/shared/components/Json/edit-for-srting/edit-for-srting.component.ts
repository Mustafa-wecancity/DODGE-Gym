// src/app/shared/core/json-editor/json-editor.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonEditorService } from '../../../Api-Services/Json/json-editor.service';
import Swal from 'sweetalert2';
 
interface DataItem {
  key: string;
  value: any;
}
@Component({
  selector: 'app-edit-for-srting',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './edit-for-srting.component.html',
  styleUrl: './edit-for-srting.component.scss'
})
export class EditForSrtingComponent implements OnInit {
  data: any;
  jsonData: any = {};
  flattenedData: DataItem[] = [];
  filteredData: DataItem[] = [];
  editKey: string | null = null;
  editValue: any;
  selectedLanguage: string = 'en'; // Default language
  searchText: string = ''; // متغير لتخزين نص البحث

  constructor(private jsonEditorService: JsonEditorService) {}

  ngOnInit(): void {
    this.loadJson();
  }

  onLanguageChange(): void {
    this.loadJson();
  }

  loadJson(): void {
    // this.jsonEditorService.getStrings(this.selectedLanguage).subscribe((data) => {
    //   this.data = data;
    //   this.jsonData = data;
    //   console.log(this.data);
    //   this.flattenedData = []; // Clear previous data
    //   this.flattenData(this.data);
    //   this.filteredData = this.flattenedData; // Initialize filtered data
    // });
  }

  flattenData(obj: any, parentKey: string = ''): void {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.flattenData(obj[key], newKey);
      } else {
        this.flattenedData.push({ key: newKey, value: obj[key] });
      }
    }
  }

  // applyFilter(): void {
  //   const filterValue = this.searchText.toLowerCase();
  //   this.filteredData = this.flattenedData.filter((item) =>
  //     item.key.toLowerCase().includes(filterValue) || item.value.toLowerCase().includes(filterValue)
  //   );
  // }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredData = this.flattenedData.filter((item) =>
      item.value && item.value.toLowerCase().includes(filterValue)
    );
  }
  startEdit(key: string, value: any): void {
    this.editKey = key;
    this.editValue = value;
  }

  saveEdit(key: string): void {
    if (this.editKey) {
      this.setValueByKey(this.data, key.split('.'), this.editValue);
      // تحديث القيمة في flattenedData لتعكس التعديل
      const item = this.flattenedData.find(item => item.key === key);
      if (item) {
        item.value = this.editValue;
      }
      this.editKey = null;
      this.editValue = null;
      this.applyFilter(); // إعادة تطبيق الفلتر بعد التعديل
    }

    this.jsonEditorService.updateJson(this.selectedLanguage, this.data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'successfully',
          text: 'JSON updated successfully',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'JSON Error updating JSON',
        });
        console.error('Error updating JSON', error);
      }
    );
  }

  cancelEdit(): void {
    this.editKey = null;
    this.editValue = null;
  }

  setValueByKey(obj: any, keys: string[], value: any): void {
    const key = keys.shift();
    if (key && keys.length === 0) {
      obj[key] = value;
    } else if (key && obj[key]) {
      this.setValueByKey(obj[key], keys, value);
    }
  }
}
