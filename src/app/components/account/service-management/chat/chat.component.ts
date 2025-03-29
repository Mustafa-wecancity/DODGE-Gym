import { CommonModule, NgClass } from "@angular/common";

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { GenericService } from "../../../../shared/Api-Services/generic.service";
import { API_ENDPOINTS } from "../../../../shared/Api-Services/API_ENDPOINTS";
import { IMessage } from "../../../../shared/interface/Models/chat/chat.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { GenericResponse } from "../../../../shared/interface/Models/generic-response";
import { AuthService } from "../../../../shared/services/auth.service";
import { CustomPipeForImagesPipe } from "../../../../shared/pipe/custom-pipe-for-images-pipe.pipe";
import { NgbDropdownModule, NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ButtonDisableDirective } from "../../../../shared/directive/ButtonDisable.directive";
import { SafeUrl } from "@angular/platform-browser";
import { interval, takeWhile } from "rxjs";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomPipeForImagesPipe,
    NgbTooltip,
    NgClass,
    TranslateModule,
    ButtonDisableDirective,
    NgbDropdownModule,
  ],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  @Input() orderproductd: string;
  @ViewChild("scrollBottom") private chatContainer!: ElementRef;

  localStorage = inject(AuthService);

  imgURL: any;
  file: File;
  insertForm: FormGroup;
  logoForm = new FormData();

  protected selectedFile: File = new File([], "dummy.txt", {
    type: "text/plain",
  });

  public chatCustomerData: IMessage[];
  public isShow: boolean = false;
  constructor(
    public _chat: GenericService,
    private _transition: TranslateService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {
    this.init();
  }

  private init() {
    this.insertForm = this.formBuilder.group({
      orderproductd: new FormControl(this.orderproductd, [
        Validators.required,
      ]),
      comment: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
      ]),
      fileUrl: new FormControl(""),
      voiceNoteUrl: new FormControl(""),
      fileTypeId: new FormControl(""),
    });
  }
  get fc() {
    return this.insertForm.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["orderproductd"] && changes["orderproductd"].currentValue) {
      // clearInterval(this.countsInterval);
      this.orderproductd = changes["orderproductd"]?.currentValue;
      this.fc["orderproductd"].setValue(this.orderproductd);
      this.GetComments();
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Scroll error:", err);
    }
  }

  GetComments() {
    const parameters = {
      Orderproductd: this.orderproductd,
    };
    this._chat
      .getAll<IMessage>(
        API_ENDPOINTS.CustomerServiceRequestMessage.GetComments,
        parameters
      )
      .subscribe(
        (data) => {
          this.chatCustomerData = data;
          this.scrollToBottom();
        },
        (error) => {
          console.error("Error fetching data", error);
        }
      );
  }
  CreateComments() {
    const parameters = {
      Orderproductd: this.orderproductd,
    };

    const data = new FormData();
    data.append("Orderproductd", this.orderproductd);
    data.append("comment", this.fc["comment"].value);
    // if (this.selectedFile && this.selectedFile.name != "dummy.txt") {
    //   data.append("File", this.selectedFile);
    //   data.append("fileTypeId", this.fc["fileTypeId"].value);
    // }

    if (this.VoiceFile instanceof Blob) {
      data.append("VoiceNote", this.VoiceFile, `recording${Date.now()}.mp3`);
    } else {
      console.error("VoiceFile is not a Blob:", this.VoiceFile?.blog);
    }
    this._chat
      .create<GenericResponse<any>, FormData>(
        API_ENDPOINTS.CustomerServiceRequestMessage.CustomerCreateComment,
        data
      )
      .subscribe(
        (data) => {
          this.ngZone.run(() => {
            // Update the view
            this.GetComments();
            this.insertForm.reset();
            this.fc["orderproductd"].setValue(this.orderproductd);

            this.ClearFile();
            this.scrollToBottom();
            this.submit = true;
            this.cdr.detectChanges();
          });
        },
        (error) => {
          this.submit = true;
          console.error("Error fetching data", error);
        }
      );
  }

  pdfFile: any;
  imageLogo: any;

  previewChatFiles(files: any) {
    if (files.length === 0) return;
    var mimeType = files[0].type;

    const before_ = mimeType.substring(-1, mimeType.indexOf("/"));
    if (mimeType == "application/pdf") {
      this.selectedFile = files[0];
      this.fc["fileTypeId"].setValue(1);
    } else if (before_ == "image") {
      this.selectedFile = files[0];
      this.fc["fileTypeId"].setValue(2);
    } else {
      this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file

      return Swal.fire({ icon: "error", title: `نوع صورة غير مقبول` });
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.pdfFile = reader.result;
    };
  }
  DeleteSelectImage() {
    this.imgURL = "";
    this.fc["fileTypeId"].setValue("");
    this.fc["fileUrl"].setValue("");
    this.fc["comment"].setValue("");
  }

  submit: boolean = true;
  IsFile: boolean = false;
  FileSize: boolean = true; // Validators in size
  onSubmit() {
    this.submit = false;
    // Stop recording if it's still active
    if (this.isStart) this.stopRecording();
    // Check if the 'comment' form control is invalid and if the selected file's name is 'dummy.txt'
    if (
      this.fc["comment"].invalid && // Checks if the comment control is invalid
      !(this.VoiceFile instanceof Blob) && // Checks if VoiceFile is not a Blob
      this.selectedFile &&
      this.selectedFile.name === "dummy.txt" // Checks if the selected file is 'dummy.txt'
    ) {
      // Optional: Show an error to the user here if necessary
      // this.error = true;
      this.submit = true;
      return false; // Stop form submission
    } else {
      // If the conditions are not met, proceed to create the comment
      this.CreateComments();
    }

    // You can uncomment and use this logic if needed to validate the form completely
    // this.insertForm.markAllAsTouched();
    // if (this.insertForm.valid) {
    //   this.CreateComments();
    // }

    // This block checks if the file is valid and provides feedback if not
    // if (this.insertForm.valid) {
    //   if (this.selectedFile && this.selectedFile.name !== 'dummy.txt') {
    //     this.submit = false;
    //     this.CreateComments();
    //   } else {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: this._transition.instant('warning'),
    //       text: 'Image must not be empty :( ',
    //     });
    //     return;
    //   }
    // } else {
    //   this.insertForm.markAllAsTouched();
    // }
  }

  protected onSelectFile(event: any) {
    const file = event.target.files[0];
    this.FileSize = true;
    this.IsFile = true;

    if (file) {
      var mimeType = file.type;
      const before_ = mimeType.substring(-1, mimeType.indexOf("/"));
      if (file.type != "application/x-msdownload" && before_ != "video") {
        this.selectedFile = file;
        const fileSizeInMB = this.selectedFile.size / (1024 * 1024); // Convert bytes to megabytes
        if (fileSizeInMB > 2) {
          // File size exceeds 5MB
          this.FileSize = false;
          Swal.fire({
            icon: "warning",
            title: this._transition.instant("warning"),
            text: "Selected file size is greater than 2MB. Please choose a smaller file.",
          });
          this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file
          this.IsFile = false;
        }
      } else {
        this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file
        this.fc["fileUrl"].reset();
        Swal.fire({ icon: "error", title: `نوع صورة غير مقبول` });

        this.IsFile = false;
      }
    }
  }

  protected ClearFile() {
    this.selectedFile = new File([], "dummy.txt", { type: "text/plain" }); // Reset the selected file
    this.fc["fileUrl"].reset();
    this.IsFile = false;
    this.FileSize = true;
    this.VoiceFile = null;
    this.audioChunks = [];
  }

  /// Vouce Note
  isRecording = false;
  recordedTime: string | undefined;
  blobUrl: SafeUrl | undefined;
  isBrowser: boolean;

  mediaRecorder: MediaRecorder;
  audioChunks: any[] = [];
  VoiceFile: any;
  time: number = 0;

  audioUrl: string = "";
  isStart: boolean = false;
  ClaerCart: boolean = false;

  startRecording() {
    this.isStart = true;
    this.ClearFile();
    this.time = 0;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
        this.VoiceFile = event.data;
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        this.audioUrl = URL.createObjectURL(audioBlob);

        this.fc["voiceNoteUrl"].setValue(URL.createObjectURL(audioBlob));
        this.audioChunks = [];
      };
    });

    interval(1000)
      .pipe(takeWhile(() => this.isStart))
      .subscribe(() => {
        this.time++;
      });
  }

  stopRecording() {
    this.isStart = false;
    this.mediaRecorder.stop();
  }
  DeleteRecord() {
    this.clearRecordedData();
  }
  clearRecordedData() {
    this.blobUrl = "";
    this.VoiceFile = null;
    this.isStart = false;
    this.fc["voiceNoteUrl"].setValue("");
    this.fc["comment"].setValue("");
  }

  ngOnDestroy() {
    const currentUrl = this.fc["voiceNoteUrl"].value;
    if (currentUrl) {
      URL.revokeObjectURL(currentUrl);
    }
  }
}
