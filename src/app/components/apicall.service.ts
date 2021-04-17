import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { Vehicles } from '../components/vehicles';
  import{VehiclesInfo}from '../pojo/VehiclesInfo'
  import{Beacons}from '../pojo/Beacons'
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {

// val ip = "192.168.29.182";
// val port = "8080";

  constructor(private httpClient: HttpClient) {}
  getUsers()
  {
    return this.httpClient.get(`http://127.0.0.1:8080/getAllVehicles`).
        pipe(
           map((data: Vehicles[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

getThisVehicle(data:string)
{



  return this.httpClient.post(`http://127.0.0.1:8080/getUserDetails`,null,{

    headers: new HttpHeaders().set('name', data)
  }).
  pipe(
     map((data: Vehicles[]) => {
       return data;
     }), catchError( error => {
       return throwError( 'Something went wrong!' );
     })
  )



}


    getAllVechiles()
    {

return this.httpClient.get("http://127.0.0.1:8080/getVehiclesUpdate").pipe(map((data:VehiclesInfo[])=>{
return data;

}),catchError( error => {
  return throwError( 'Something went wrong!' );
})

)

    }




    getAllBeacons()
    {

return this.httpClient.get("http://127.0.0.1:8080/getAllBeaconsForServer").pipe(map((data:Beacons[])=>
{
return data;

}),catchError( error => {
  return throwError( 'Something went wrong!' );
})

)

    }
}
