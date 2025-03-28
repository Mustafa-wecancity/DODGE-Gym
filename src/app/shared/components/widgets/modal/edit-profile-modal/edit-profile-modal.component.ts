import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from "../../../../interface/account.interface";
import { AccountState } from '../../../../state/account.state';
import { UpdateUserProfile } from '../../../../action/account.action';
import * as data from '../../../../data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { ButtonComponent } from '../../button/button.component';
import { GenericService } from '../../../../Api-Services/generic.service';
import {  IGetProfileLocalized } from '../../../../interface/Models/Customer/profileModel';
import { API_ENDPOINTS } from '../../../../Api-Services/API_ENDPOINTS';
import { ApiForImageForReport } from '../../../../interface/Models/appSetting';
import { GetRegionForList } from '../../../../interface/Models/Region/GetRegionModel';
import { GetCityForList, genders } from '../../../../interface/Models/City/CityModel';
import { NgSelectModule } from '@ng-select/ng-select';
import { GenericResponse } from '../../../../interface/Models/generic-response';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, Select2Module,
            ButtonComponent,
            NgSelectModule
  ],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.scss'
})
export class EditProfileModalComponent {
  public form: FormGroup;
  public closeResult: string;
  public imageLogo: string;
  public modalOpen: boolean = false;
  public flicker: boolean = false;
  public codes = data.countryCodes;
  public genders: genders[] = [{ id: 1, title: 'Male' }, { id: 2, title: 'Female' }];
  private logoForm!: FormData;

  @ViewChild("profileModal", { static: false }) ProfileModal: TemplateRef<string>;
  storageURL_ = ApiForImageForReport;
  constructor(private modalService: NgbModal,
    public _CustomerProfile: GenericService,

    private store: Store,
    private formBuilder: FormBuilder) {
   
  }
  
  ngOnInit(): void {
    this.init()
    this.getAllFunction()
    this.getProfile()
  }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.ProfileModal, {
      ariaLabelledBy: 'profile-Modal',
      centered: true,
      windowClass: 'theme-modal modal-lg address-modal'

    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.UpdateData();

    }
  }

  ngOnDestroy() {
    if(this.modalOpen) {
      this.modalService.dismissAll();
    }
    this._CustomerProfile.unsubscribe()
  }
  private init(Profile?: IGetProfileLocalized) {
    this.form = this.formBuilder.group({
      fullName: [Profile?.fullName || "", [Validators.required]],
      imagePath: [Profile?.imagePath ||'' ],
      gender: [Profile?.genderId || null, ],
      cityId: [Profile?.cityId || "", [Validators.required]],
      regionId: [Profile?.regionId || "", [Validators.required]],
      email: [Profile?.email || "", [Validators.required]],
      address: [Profile?.address || "",],
      passportId: [Profile?.passportId || "",],
      nationalId: [Profile?.nationalId || "",],
      birthDate: [Profile?.birthDate?.toString().slice(0, 10) || "", [Validators.required]],

    })
  }
  
  get fc() {
    return this.form.controls;
  }
  private getProfile() {
  

    this._CustomerProfile.subscription.add(this._CustomerProfile.get<IGetProfileLocalized>(API_ENDPOINTS.Customer.GetProfileLocalized).subscribe(
      response => {
        this.init(response)
        this.imageLogo = this.storageURL_  + response['imagePath'];
        this.SelectedRegion();

      },
      error => {
        console.error('Error fetching data', error);
      }
    ));

  }


  public region: any
  public cityList: GetCityForList[] 
  getAllFunction() {
 
    this._CustomerProfile.subscription.add(this._CustomerProfile.getAll<GetRegionForList>(API_ENDPOINTS.Region.GetAllForList).subscribe(
      response => {
        this.region= response
        // response?.map(cn => {
        //   return { label: cn?.name, value: cn?.id }
        // });
   
      },
      error => {
        console.error('Error fetching data', error);
      }
    ));

  }

  ChangRegione() {
    this.fc['cityId'].setValue(null);
    this.SelectedRegion();


  }
  // get from city
  SelectedRegion() {
    // this.fc.fromCityId.setValue(null)
    if (this.fc['regionId'].value !== null) {
      const params = { regionId: this.fc['regionId'].value  }
      this._CustomerProfile.subscription.add(this._CustomerProfile.getAll<GetCityForList>(API_ENDPOINTS.City.GetAllCitieswithRegion,params).subscribe(
        response => {
          this.cityList= response
          // response?.map(cn => {
          //   return { label: cn?.name, value: cn?.id }
          // });
     
        },
        error => {
          console.error('Error fetching data', error);
        }
      ));
 
    } else
      this.cityList = []
  }


  protected selectedFile!: File;
protected  uploadImage(files: any) {
  

    const file = files.target.files[0];
    if (file.length === 0) return;
    var mimeType = file.type;
    const before_ = mimeType.substring(-1, mimeType.indexOf('/'));
    // this.selectedFile = file;
    if (before_ == 'image') {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes
      if (fileSizeInMB > 2) {
        // File size exceeds 5MB
        // this.FileSize=false
        // Swal.fire({
        //   icon: 'warning',
        //   title: this._transition.instant('warning'),
        //   text: 'Selected file size is greater than 2MB. Please choose a smaller file.',
        // });
        this.selectedFile = new File([], 'dummy.txt', { type: 'text/plain' }); // Reset the selected file
        this.imageLogo =
   this.storageURL_  +
          this.GetByName('logo');
      } else {
        this.selectedFile = file;
        reader.onload = () => {
          this.imageLogo = reader.result as string;
        };
      }
    } else {
      this.imageLogo =
 this.storageURL_  +
      this.GetByName('logo');
      this.selectedFile = new File([], 'dummy.txt', { type: 'text/plain' }); // Reset the selected file

      // Swal.fire({ icon: 'error', title: `نوع صورة غير مقبول` });
      return;
    }
  }
  public GetByName(name:string): string  {
    if (typeof localStorage !== 'undefined') {
      const returned = localStorage.getItem(name);
      return returned ??"";
    } else {
      return ""; // Return null if localStorage is not defined
    }
  }


  private UpdateData() {
    this.loopform();
    this._CustomerProfile.submit=false;

    this._CustomerProfile.subscription.add( this._CustomerProfile.create<GenericResponse<IGetProfileLocalized>,FormData>(API_ENDPOINTS.Customer.UpdateProfile,this.logoForm).subscribe(res=>{
      const response= res.data
      if (res.success) {
        this.init(response)
        this.imageLogo =this.storageURL_  + response['imagePath'];
        this.SelectedRegion();

      }
      this.form.reset()

      this._CustomerProfile.submit = true;
    },
    (err) => {
      // this.form.reset()
      this._CustomerProfile.submit  = true;
    }
  ));

  }

 
  private loopform() {
    this.logoForm = new FormData();
    Object.keys(this.form.value).forEach((key) => {
      if (this.form.value[key] == null) {
        //this.form.removeControl(key);
      } else {
        if (typeof this.form.value[key] !== 'object' && key !== 'image')
          this.logoForm.append(key, this.form.value[key]);
        else if (typeof this.form.value[key] == 'object')
          Object.keys(this.form.value[key]).forEach((subkey) => {
            this.logoForm.append(key, this.form.value[key][subkey]);
          });
      }
    });
    if (this.selectedFile && this.selectedFile.name != 'dummy.txt')
      this.logoForm.append('ImagePath', this.selectedFile);
  } 
}
