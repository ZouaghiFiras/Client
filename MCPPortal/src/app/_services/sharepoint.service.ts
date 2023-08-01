import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Document } from '../_models/Document';
import { SPDocument } from '../_models/spdocument';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {
  private baseUrl = 'https://localhost:7023/SharePointApi';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFiles(assignmentNumber: string): Observable<Document[]> {
    const url = `${this.baseUrl}/Files/${assignmentNumber}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<Document[]>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching documents:', error);
        return throwError(error);
      })
    );
  }

  getFilesSrc(assignmentNumber: string): Observable<string[]> {
    const url = `${this.baseUrl}/Files/src/${assignmentNumber}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string[]>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching file sources:', error);
        return throwError(error);
      })
    );
  }

  getFileSrc(assignmentNumber: string, fileName: string): Observable<string> {
    const url = `${this.baseUrl}/Files/src/${assignmentNumber}/${fileName}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        console.log(token);
        return this.http.get<string>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching file source:', error);
        return throwError(error);
      })
    );
  }

  getProspectToken(): Observable<string> {
    const url = 'https://localhost:7023/SharePointApi/Token';

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string>(url, {headers});
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching prospect token:', error);
        return throwError(error);
      })
    );
  }

  determineDocumentSize(doc: Partial<SPDocument>): number {
    return Math.floor(((doc.toString().length * 4) / 3) + (doc.toString().length / 96) + 6);
  }

  getDocumentSize(doc: SPDocument): Observable<number> {
    const url = `${this.baseUrl}/Size?doc=${doc}`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<number>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching document size:', error);
        return throwError(error);
      })
    );
  }

  getDocumentTypes(): Observable<string[]> {
    const url = `${this.baseUrl}/Files/Types`;

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string[]>(url, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error fetching document types:', error);
        return throwError(error);
      })
    );
  }
}
