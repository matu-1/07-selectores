import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { API, routeParams } from '../../constants/api.constant';
import { PaisSmall, Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private _regiones = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private http: HttpClient) {}

  get regiones() {
    return [...this._regiones];
  }

  getByRegion(region: string) {
    return this.http.get<PaisSmall[]>(
      routeParams(API.PAIS.GET_BY_REGION, { region })
    );
  }

  getByCode(code: string) {
    return this.http.get<Pais>(
      routeParams(API.PAIS.GET_BY_CODE, { code })
    );
  }
  getByCodeSmall(code: string) {
    return this.http.get<PaisSmall>(
      routeParams(API.PAIS.GET_BY_CODE_SMALL, { code })
    );
  }

  getByCodes(codes: string[]): Observable<PaisSmall[]>{
    if(!codes) return of([]);
    const paisesObs: Observable<PaisSmall>[] = [];
    codes.forEach(code => {
      paisesObs.push(this.getByCodeSmall(code));
    });
    return combineLatest(paisesObs);
  }
}
