import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef
} from "@angular/core";
import { PageStatusService } from "./services/page-status.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewChecked {
  update = Date.now();
  rawData: any; //all data
  generatedData = [];
  formsHeader = []; //all forms for header
  regions; //all regions array

  // percentagePassed = 0;

  closeResult: string;

  constructor(
    private pagesStatus: PageStatusService,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.pagesStatus.getPageStatus().subscribe(data => {
      this.rawData = data;
      this.regions = Object.keys(this.rawData);
      // console.log(this.regions);
      const regionData = Object.keys(data);
      this.regions = regionData;
      this.modifyDataDisplay();
    });
  }

  modifyDataDisplay() {
    for (let i = 0; i < this.regions.length; i++) {
      // ADDS ALL FORMS TO A GENERAL ARRAY - USED AS  ///    TABLE HEADERS
      let header = Object.keys(this.rawData[this.regions[i]].formStates); // adds forms to the array
      for (let j = 0; j < header.length; j++) {
        if (!this.formsHeader.includes(header[j])) {
          this.formsHeader.push(header[j]);
        }
      }
    }

    for (let k = 0; k < this.regions.length; k++) {
      //REGIONL LENGTH AND CREATION OF NEW REGION OBJECT
      let region = {
        name: this.regions[k],
        formStatus: []
      };
      let statuses = [];
      for (let n = 0; n < this.formsHeader.length; n++) {
        let status = {
          name: this.formsHeader[n],
          amountPassed: 0
        };

        let formNames = Object.keys(this.rawData[this.regions[k]].formStates);
        for (let m = 0; m < formNames.length; m++) {
          if (formNames[m] === status.name) {
            let testName = Object.keys(
              this.rawData[this.regions[k]].formStates[formNames[m]]
            );
            for (let n = 0; n < testName.length; n++) {
              status = this.rawData[this.regions[k]].formStates[formNames[m]];
            }

            let statusOk = this.rawData[this.regions[k]].formStates[
              formNames[m]
            ].OK.length;
            let statusMissingOk = this.rawData[this.regions[k]].formStates[
              formNames[m]
            ].MISSING_OK.length;
            let statusMissing = this.rawData[this.regions[k]].formStates[
              formNames[m]
            ].MISSING.length;
            let statusWarning = this.rawData[this.regions[k]].formStates[
              formNames[m]
            ].WARNING.length;
            let statusError = this.rawData[this.regions[k]].formStates[
              formNames[m]
            ].ERROR.length;
            let percentagePassed: number =
              ((statusOk + statusMissingOk) /
                (statusOk +
                  statusMissingOk +
                  statusMissing +
                  statusWarning +
                  statusError)) *
              100;
            status.amountPassed = Math.round(percentagePassed);
          }
        }
        statuses.push(status);
        // console.log(statuses);
      }
      region.formStatus = statuses;
      this.generatedData.push(region);
    }
  }
}
