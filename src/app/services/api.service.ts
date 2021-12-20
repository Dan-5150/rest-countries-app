import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * API service
 *
 * Used to send requests to countries API
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  /**
   * Countries API request URL
   */
  requestUrl = 'https://restcountries.com/v3.1';

  /**
   * Constructor
   *
   * @param http Angular HTTP client
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends a GET request to the API
   *
   * @param controller Request URL
   * @param params Request params
   */
  createGetRequest(controller: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.requestUrl}/${controller}`, {
      params: params,
    });
  } 
}
