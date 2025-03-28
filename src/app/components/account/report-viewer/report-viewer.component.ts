import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { DxReportViewerModule } from "devexpress-reporting-angular/dx-report-viewer";
import {
  api,
  environment,
} from "../../../../environments/environment.development";
import { ActivatedRoute } from "@angular/router";
import { CryptoService } from "../../../shared/Api-Services/crypto.service";
import { ExportFormatID } from 'devexpress-reporting/dx-webdocumentviewer'

@Component({
  selector: "app-report-viewer",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [DxReportViewerModule],
  templateUrl: "./report-viewer.component.html",

  styleUrls: [
    "./report-viewer.component.scss",
    // "../../../../../../node_modules/jquery-ui/themes/base/all.css",
    "../../../../../node_modules/devextreme/dist/css/dx.light.css",
    "../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css",
    "../../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css",
  ],
})
export class ReportViewerComponent {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public Route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {}
  ReportsFiter: any;
  title = "DXReportViewerSample";
  reportUrl: string = "ServiceByStatusReport"; //localStorage["ReportName"] ;
  // reportUrl: string = "Invoice"; //localStorage["ReportName"] ;

  hostUrl: string = api + "/";
  // Use this line if you use an ASP.NET MVC backend
  //invokeAction: string = "/WebDonncumentViewer/Invoke";
  // Use this line if you use an ASP.NET Core backend
  invokeAction: string = "DXXRDV";
  parametersSubmitted(event: any) {
    if (this.isBrowser) {
      const encryptedData = this.Route.snapshot.paramMap.get("orderId");

      if (encryptedData) {
        this.ReportsFiter = {
          OrderId: JSON.parse(this.cryptoService.decrypt(encryptedData)),
        };
        console.log(this.ReportsFiter);
        // var filter = localStorage.getItem("ReportUrl") as any;
        // this.ReportsFiter = JSON.parse(filter);
        Object.keys(this.ReportsFiter).forEach((e) => {
          const matchingParameters = event.args.Parameters.filter(
            (p: any) => p.Key === e
          );

          if (matchingParameters.length > 0) {
            const parameter = matchingParameters[0];
            parameter.Value =
              this.ReportsFiter[e] !== "" ? this.ReportsFiter[e] : null;
            console.log(parameter.Value);
          } else {
          }
        });
      }
    }
  }
  OnCustomizeExportOptions(event :any) {
    if (this.isBrowser) {

    event.args.HideFormat(ExportFormatID.XLS);
    }
}
}
