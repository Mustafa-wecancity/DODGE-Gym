import { CommonModule, NgClass } from "@angular/common";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import {
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { GenericResponse } from "../../../../shared/interface/Models/generic-response";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { NgbDropdownModule, NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonDisableDirective } from "../../../../shared/directive/ButtonDisable.directive";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { OrderServiceAttachment } from "../../../../shared/interface/Models/order-service-attachment";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";
import { genders } from "../../../../shared/interface/Models/City/CityModel";
import { NgSelectModule } from "@ng-select/ng-select";
import { ButtonComponent } from "../../../../shared/components/widgets/button/button.component";
import { DeleteModalComponent } from "../../../../shared/components/widgets/modal/delete-modal/delete-modal.component";

@Component({
  selector: "app-attachment-for-order-service",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomPipeForImagesPipe,
    NgbTooltip,
    NgClass,
    TranslateModule,
    ButtonDisableDirective,
    NgSelectModule,
    NgbDropdownModule,
    ButtonComponent,DeleteModalComponent
  ],
  templateUrl: "./attachment-for-order-service.component.html",
  styleUrl: "./attachment-for-order-service.component.scss",
})
export class AttachmentForOrderServiceComponent {
EditItem(item :OrderServiceAttachment) {
  this.rotateCard()
  this.init(item);
  this.changeType();



}
  imgURL: any;
  file: File;
  Attachment: OrderServiceAttachment[];
  AttachmentType: genders[];
  insertForm: FormGroup;
  logoForm = new FormData();
  submit: Boolean = false;
  @Input() orderproductd: string;
  public isShow: boolean = false;
  constructor(
    public OrderService: GenericService,
 
    private formBuilder: FormBuilder
  ) {
    this.init();
  }

  private init(item? :OrderServiceAttachment) {
 
     this.insertForm = this.formBuilder.group({
      id: [item?.id||""],
      customerServiceRequestId: new FormControl(this.orderproductd, [
        Validators.required,
      ]),
      attachmentDescription: new FormControl(item?.attachmentDescription||"", [
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
      ]),
      attachmentText: [item?.attachmentText||""],
      attachmentFileUrl: [item?.attachmentFilePath||""],
      attachmentTypeId: [item?.attachmentTypeId||"", Validators.required],
      ByProvider: [item?.createdByProvider||false, Validators.required],
    });
  }
  get fc() {
    return this.insertForm.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["orderproductd"] && changes["orderproductd"].currentValue) {
      // clearInterval(this.countsInterval);
      this.orderproductd = changes["orderproductd"]?.currentValue;
      this.fc["customerServiceRequestId"].setValue(this.orderproductd);
      this.GetAttachmentForOrderService();
      this.GetAttachmentTypeForList();
      // this.scrollToBottom();
    }
  }

  GetAttachmentForOrderService() {
    const parameters = {
      RequestId: this.orderproductd,
    };
    this.OrderService.getAll<OrderServiceAttachment>(
      API_ENDPOINTS.CustomerServiceRequestAttachment.GetRequestAttachment,
      parameters
    ).subscribe(
      (data) => {
        this.Attachment = data;
        // this.scrollToBottom();
       },
      (error) => {
        console.error("Error fetching data", error);
      }
    );
  }
  public imageLogo: string;
  protected selectedFile!: File;

  
  protected uploadImage(files: any) {
    const file = files.target.files[0];
    if (file.length === 0) return;
    var mimeType = file.type;
    const before_ = mimeType.substring(-1, mimeType.indexOf("/"));
    // this.selectedFile = file;
    // if (before_ == "image") {
      if (file.type != "application/x-msdownload" && before_ != "video") {
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
        this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file
        this.imageLogo = "";
      } else {
        this.selectedFile = file;
        reader.onload = () => {
          this.imageLogo = reader.result as string;
          this.fc["attachmentFileUrl"].setValue(reader.result as string);
        };
      }
    } else {
      this.imageLogo = "";
      this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file

      // Swal.fire({ icon: 'error', title: `نوع صورة غير مقبول` });
      return;
    }
  }


  GetAttachmentTypeForList() {
   
    this.OrderService.getAll<genders>(
      API_ENDPOINTS.CustomerServiceRequestAttachment.GetAttachmentType
    ).subscribe(
      (data) => {
        this.AttachmentType = data;
        // this.scrollToBottom();
       },
      (error) => {
        console.error("Error fetching data", error);
      }
    );
  }
  isRotated: boolean = false;

  rotateCard() {
    this.isRotated = !this.isRotated;
  }

  changeType() {
    // إزالة التحقق (validators) عن الحقول أولاً
    this.fc["attachmentText"].clearValidators();
    this.fc["attachmentFileUrl"].clearValidators();

    // تعيين التحقق بناءً على قيمة attachmentTypeId
    if (this.fc["attachmentTypeId"].value == 1) {
      this.fc["attachmentText"].setValidators(Validators.required);
      this.imageLogo = "";
      this.selectedFile = new File([], "dummy.txt", { type: "text/plain" });
      this.fc["attachmentFileUrl"].setValue("");
    } else if (this.fc["attachmentTypeId"].value == 2) {
      this.fc["attachmentFileUrl"].setValidators(Validators.required);
      this.fc["attachmentText"].setValue("");
    }

    // تحديث صلاحية الحقول بعد تعيين التحقق
    this.fc["attachmentText"].updateValueAndValidity();
    this.fc["attachmentFileUrl"].updateValueAndValidity();
  }

  onSubmit() {
    this.insertForm.markAllAsTouched();
     if (this.insertForm.valid) {
      this.InsertData();
    }
  }
  InsertData() {
    this.OrderService.submit = false;
    this.loopform();

    this.OrderService.create<GenericResponse<any>, FormData>(
      this.fc['id'].value? API_ENDPOINTS.CustomerServiceRequestAttachment.UpdateAttachmentForOrderService: API_ENDPOINTS.CustomerServiceRequestAttachment.AddAttachmentNeededByCustomer,
      this.logoForm
    ).subscribe(
      (res: any) => {
        const response = res.data;

        this.isRotated = false;
        this.GetAttachmentForOrderService();
        // this.rotateCard()
        // this.notifier.showSuccess("Edit_Profile_Success");

        this.init();
        this.OrderService.submit = true;
      },
      (err) => {
        // this.form.reset()
        this.OrderService.submit = true;
      }
    );
  }
  private loopform() {
    this.logoForm = new FormData();
    Object.keys(this.insertForm.value).forEach((key) => {
      if (this.insertForm.value[key] == null) {
        //this.insertForm.removeControl(key);
      } else {
        if (typeof this.insertForm.value[key] !== "object" && key !== "image")
          this.logoForm.append(key, this.insertForm.value[key]);
        else if (typeof this.insertForm.value[key] == "object")
          Object.keys(this.insertForm.value[key]).forEach((subkey) => {
            this.logoForm.append(key, this.insertForm.value[key][subkey]);
          });
      }
    });
    if (this.selectedFile && this.selectedFile.name != "dummy.txt")
      this.logoForm.append("attachmentFilePath", this.selectedFile);
  }

  @ViewChild("deleteModal") DeleteModal: DeleteModalComponent;

  
  delete(action: string, data: any) {
    
    if (action == "delete" && data)
   
    {
      this.OrderService
        .get<any>(
          API_ENDPOINTS.CustomerServiceRequestAttachment.DeleteAttachmentForOrderService,

          { id: data.id }
        )
        .subscribe(
          (res: any) => {
            

            this.GetAttachmentForOrderService();
          },
          (err) => {
            // this.form.reset()
            this.OrderService.submit = true;
          }
        );
    }
  }
}
