import { Component, Inject, PLATFORM_ID } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  GetCityForList,
  genders,
} from "../../../shared/interface/Models/City/CityModel";
import {
 
  EmailPattern,
} from "../../../shared/interface/Models/appSetting";
import { GenericService } from "../../../shared/Api-Services/generic.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { ButtonComponent } from "../../../shared/components/widgets/button/button.component";
import { TranslateModule } from "@ngx-translate/core";
import { GenericResponse } from "../../../shared/interface/Models/generic-response";
import { IGetProfileLocalized } from "../../../shared/interface/Models/Customer/profileModel";
import { API_ENDPOINTS } from "../../../shared/Api-Services/API_ENDPOINTS";
import { GetRegionForList } from "../../../shared/interface/Models/Region/GetRegionModel";
import { NotificationService } from "../../../shared/services/notification.service";
import { isPlatformBrowser, NgClass } from "@angular/common";
import { environment } from "../../../../environments/environment.development";
import { BaseComponent } from "../../../shared/components/base/base.component";
import { UserService } from "../../../shared/Api-Services/user.service";
import { ErrorService } from "../../../shared/services/error.service";

@Component({
  selector: "app-edit-profile",
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgSelectModule,NgClass
  ],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.scss",
})
export class EditProfileComponent extends BaseComponent {
 
  
  public form: FormGroup;
  public closeResult: string;
  public imageLogo: string;
  public modalOpen: boolean = false;
  public flicker: boolean = false;
  public genders: genders[] = [
    { id: 1, title: "Male" },
    { id: 2, title: "Female" },
  ];

  isBrowser: boolean;

  private logoForm!: FormData;

  storageURL_ = environment.serverFirstHalfOfImageUrl;
  constructor(
    private userService: UserService,
    public _CustomerProfile: GenericService,
    private notifier: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,    private _ErrorService: ErrorService,
  ) {
    super();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.init();
    if(this.isBrowser){

 
      this.getProfile();
    }
    // console.log(this.sidebarComponent.customerData)
  }

  submit() {
     this.form.markAllAsTouched();  
    if (this.form.valid) { 
  
      this.UpdateData()
    } else {
      console.error("النموذج غير صالح.");
    }
  }
  

  
  private init(Profile?: IGetProfileLocalized) {
    this.form = this.formBuilder.group({
      fullName: [Profile?.fullName || "", [Validators.required]],
      imagePath: [Profile?.image || ""],
      genderId: [Profile?.genderId || "", [Validators.required]],

      email: [
        Profile?.email || "",
        [Validators.required, Validators.pattern(EmailPattern)],
      ],
      birthDate: [Profile?.birthDate?.toString().slice(0, 10) || "", [Validators.required]],
   
    });
  }

  get fc() {
    return this.form.controls;
  }
  private getProfile() {
    this._CustomerProfile.subscription.add(
      this._CustomerProfile
        .get<IGetProfileLocalized>(API_ENDPOINTS.Customer.GetProfileLocalized)
        .subscribe(
          (response) => {
            this.init(response);
            this.imageLogo =
              environment.serverFirstHalfOfImageUrl + response["image"];
           },
          (error) => {
            console.error("Error fetching data", error);
          }
        )
    );
  }
 

 
  protected selectedFile!: File;
  protected uploadImage(files: any) {
    const file = files.target.files[0];
    // if (file.length === 0) return;
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to megabytes

    if (fileSizeInMB > 2) {
    
      this._ErrorService.setError({ message: 'fileSizeExceeded', title: 'Error' });
  
  
          this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file
          this.imageLogo =
            environment.serverFirstHalfOfImageUrl + this.GetByName("logo");
            return
        }
        const mimeType = file.type;
    // const before_ = mimeType.substring(-1, mimeType.indexOf("/"));
    // this.selectedFile = file;
    if (mimeType.startsWith("image/")) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
    
        this.selectedFile = file;
        reader.onload = () => {
          this.imageLogo = reader.result as string;
        };
      
    } else {
      this.imageLogo =
        environment.serverFirstHalfOfImageUrl + this.GetByName("imageCustomer");
      this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file

    this._ErrorService.setError({ message: 'نوع صورة غير مقبول`', title: 'Error' });
      // Swal.fire({ icon: 'error', title: `نوع صورة غير مقبول` });
      return;
    }
  }

  public GetByName(name: string): string {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== "undefined"
    ) {
      const returned = localStorage.getItem(name);
      return returned ?? "";
    } else {
      return ""; // Return null if localStorage is not defined
    }
  }

  private UpdateData() {
    this.loopform();
    this._CustomerProfile.submit = false;
    this._CustomerProfile.subscription.add(
      this._CustomerProfile
        .create<GenericResponse<IGetProfileLocalized>, FormData>(
          API_ENDPOINTS.Customer.UpdateProfile,
          this.logoForm
        )
        .subscribe(
          (res) => {
            const response = res.data;
            if (res.success) {
              this.init(response);
              this.imageLogo =
                environment.serverFirstHalfOfImageUrl + response["image"];
              localStorage.setItem("customer_name", response["fullName"]);
              localStorage.setItem("imageCustomer", response["image"]);
              localStorage.setItem("customer_login", JSON.stringify(response));

              this.userService.updateUser(response); // Access after view is initialized
             }
            // this.notifier.showSuccess("Edit_Profile_Success");

        // this. _ErrorService.notification.next(null);
        this. _ErrorService.setNotification({message :'Edit_Profile_Success'});


            // this.form.reset()
            this._CustomerProfile.submit = true;
          },
          (err) => {
            // this.form.reset()
            this._CustomerProfile.submit = true;
          }
        )
    );
  }

  private loopform() {
    this.logoForm = new FormData();
    Object.keys(this.form.value).forEach((key) => {
      if (this.form.value[key] == null) {
        //this.form.removeControl(key);
      } else {
        if (typeof this.form.value[key] !== "object" && key !== "image")
          this.logoForm.append(key, this.form.value[key]);
        else if (typeof this.form.value[key] == "object")
          Object.keys(this.form.value[key]).forEach((subkey) => {
            this.logoForm.append(key, this.form.value[key][subkey]);
          });
      }
    });
    if (this.selectedFile && this.selectedFile.name != "dummy.txt")
      this.logoForm.append("ImagePath", this.selectedFile);
  }
}
