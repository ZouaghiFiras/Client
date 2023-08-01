import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'https://localhost:7023/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  /**
   * Sends an email using the provided parameters.
   * @param to - The recipient email address.
   * @param toName - The recipient name.
   * @param subject - The email subject.
   * @param body - The email body.
   * @returns An Observable representing the HTTP POST request.
   */
  sendEmail(to: string, toName: string, subject: string, body: string): Observable<any> {
    const url = `${this.baseUrl}Contact`;
    const requestBody = {
      To: to,
      ToName: toName,
      Subject: subject,
      Body: body
    };

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post(url, requestBody, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error sending email:', error);
        return throwError(error);
      })
    );
  }
}
