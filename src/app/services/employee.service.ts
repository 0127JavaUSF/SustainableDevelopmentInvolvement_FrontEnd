import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SD_StringExternalisation} from 'src/app/models/StringExternalisation';
import { EmployeeInvolvement } from '../models/EmployeeInvolvement';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  constructor(private http:HttpClient ) { }

  private  stringExternalisation  = new SD_StringExternalisation();
  private base_url=this.stringExternalisation.base_url;

  createEmployeeInvolvement(employeeProfile:Object):Observable<Object>{
      return this.http.post(`${this.base_url}/employees`,employeeProfile);
  }

  getAllInvolvedUsers():Promise<any>{
    return this.http.get(`${this.base_url}/employees`).toPromise();    
    //console.log("Service: getAllInvolvements: "+results); //Not a function error solved by removing those lines.
    //return results;
  }
}
