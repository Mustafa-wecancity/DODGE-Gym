import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NavigationExtras } from "@angular/router";
import Swal from "sweetalert2";
import { inject } from "@angular/core";
import { ConfirmationErrorComponent } from "../components/widgets/modal/confirmation-error/confirmation-error.component";
import {
  HTTP_STATUS_CODES,
  ERROR_MESSAGES,
} from "../constants/error.constants";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlingService {
  private modal = inject(ConfirmationErrorComponent);

  handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = "";
    alert(11)

    switch (error.status) {
      case HTTP_STATUS_CODES.BAD_REQUEST:
        this.showErrorAlert("", error.error.message);
        errorMessage = error.error.message || ERROR_MESSAGES.BAD_REQUEST;
        break;

      case HTTP_STATUS_CODES.UNAUTHORIZED:
        this.showErrorAlert("خطاء", error.error.message);
        errorMessage = error.error.message || ERROR_MESSAGES.UNAUTHORIZED;
        break;

      case HTTP_STATUS_CODES.SERVER_ERROR:
        const navigationExtras: NavigationExtras = {
          state: { error: error.error },
        };
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;

      default:
        this.showErrorAlert("خطأ", ERROR_MESSAGES.UNEXPECTED);
        break;
    }

    console.error("HTTP Error:", error?.error?.message);
    console.error("HTTP Error:", error);

    if (errorMessage) {
      this.modal.openModal("error", null, errorMessage);
    }
  }

  handleGenericError(error: unknown): void {
    console.error("An error occurred:", error);
    this.modal.openModal("error", null, ERROR_MESSAGES.GENERIC);
  }

  private showErrorAlert(title: string, text: string): void {
    Swal.fire({
      icon: "error",
      title,
      text,
    });
  }
}
