import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { PageStatus } from "../models/page-status.model";

@Injectable()
export class PageStatusService {
  constructor(private http: HttpClient) {}

  private _url = "../assets/page-status/report.json";

  getPageStatus(): Observable<PageStatus[]> {
    console.log(this._url);
    return this.http.get<PageStatus[]>(this._url);
  }
}
