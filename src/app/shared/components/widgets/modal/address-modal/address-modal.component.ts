import { Component, TemplateRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Select, Store } from "@ngxs/store";
import { map, Observable } from "rxjs";
import {
  Select2Data,
  Select2Module,
  Select2UpdateEvent,
} from "ng-select2-component";
import {
  CreateAddress,
  UpdateAddress,
} from "../../../../action/account.action";
import { CountryState } from "../../../../state/country.state";
import { StateState } from "../../../../state/state.state";
import { UserAddress } from "../../../../interface/user.interface";
import * as data from "../../../../data/country-code";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "../../button/button.component";
import { CommonModule } from "@angular/common";
import { API_ENDPOINTS } from "../../../../Api-Services/API_ENDPOINTS";
import { genders } from "../../../../interface/Models/City/CityModel";
import { ICustomerAttachment } from "../../../../interface/Models/Attachment/attachment";
import { GenericService } from "../../../../Api-Services/generic.service";
import Swal from "sweetalert2";
import { NgSelectModule } from "@ng-select/ng-select";
import { GenericResponse } from "../../../../interface/Models/generic-response";
import { environment } from "../../../../../../environments/environment.development";

@Component({
  selector: "app-address-modal",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgSelectModule,
    Select2Module,
    ButtonComponent,
  ],
  templateUrl: "./address-modal.component.html",
  styleUrl: "./address-modal.component.scss",
})
export class AddressModalComponent {
  public form: FormGroup;
  public closeResult: string;
  public modalOpen: boolean = false;

  public address: UserAddress | null;

  @ViewChild("addressModal", { static: false })
  AddressModal: TemplateRef<string>;
  @Select(CountryState.countries) countries$: Observable<Select2Data>;

  public attachment: ICustomerAttachment | null;
  public AttachmentType: any[] = [];

  //  public CustomerAttachment: ICustomerAttachment | null;
  constructor(
    private modalService: NgbModal,
    public OrderService: GenericService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [""],
      attachmentText: ["", Validators.required],
      attachmentId: ["", Validators.required],
      attachmentFileUrl: ["", Validators.required],
    });

    this.GetAllForListAttachment();
  }

  get fc() {
    return this.form.controls;
  }

  async openModal(value?: ICustomerAttachment) {
    this.modalOpen = true;
    this.patchForm(value);
    this.modalService
      .open(this.AddressModal, {
        ariaLabelledBy: "address-add-Modal",
        centered: true,
        windowClass: "theme-modal modal-lg address-modal",
      })
      .result.then(
        (result) => {
          `Result ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

  patchForm(value?: ICustomerAttachment) {
    if (value) {
      this.attachment = value;
      this.imageLogo =environment.serverFirstHalfOfImageUrl +value.filePath;

      this.form.patchValue({
        id: value?.id,
        attachmentFileUrl: value?.filePath,
        attachmentId: value?.attachmentId,
        attachmentText: value?.attachmentText,
      });
    } else {
      // this.attachment = null;
      this.form.reset();
    }
  }

  onSubmit_() {
    this.form.markAllAsTouched();

    // let action = new Createattachment(this.form.value);

    // if (this.attachment) {
    //   action = new UpdateAddress(this.form.value, this.address.id);
    // }

    // if (this.form.valid) {
    //   this.store.dispatch(action).subscribe({
    //     complete: () => {
    //       this.form.reset();
    //       if (!this.address) {
    //         this.form?.controls?.["country_code"].setValue("91");
    //       }
    //     },
    //   });
    // }
  }

  GetAllForListAttachment() {
    this.OrderService.getAll<any>(
      API_ENDPOINTS.CustomerAttachment.GetAllForListAttachment
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

  protected selectedFile!: File;
  pdfFile: any;
  imageLogo: any;

  previewChatFiles(files: any) {
    if (files.length === 0) return;

    const mimeType = files[0].type;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    const fileType = mimeType.split("/")[0];

    if (mimeType === "application/pdf") {
      this.selectedFile = files[0];
      reader.onload = (_event) => {
        this.pdfFile = reader.result;
        this.fc["attachmentFileUrl"].setValue(this.pdfFile);
      };
    } else if (fileType === "image") {
      this.selectedFile = files[0];
      reader.onload = (_event) => {
        this.imageLogo = reader.result;
        this.fc["attachmentFileUrl"].setValue(this.imageLogo);
      };
    } else {
      Swal.fire({ icon: "error", title: `نوع صورة غير مقبول` });
    }
  }

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

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertOrUpdateData();
    }
  }


  InsertOrUpdateData() {
    this.OrderService.submit = false;
    this.loopform();

    this.OrderService.create<GenericResponse<any>, FormData>(
      API_ENDPOINTS.CustomerAttachment.Create,
      this.logoForm
    ).subscribe(
      (res: any) => {
        const response = res.data;

        this.form.reset();
        this.modalService.dismissAll();
        this.OrderService.submit = true;
      },
      (err) => {
        // this.form.reset()
        this.OrderService.submit = true;
      }
    );
  }
  logoForm:FormData;
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
      this.logoForm.append("FilePath", this.selectedFile);
  }
}
