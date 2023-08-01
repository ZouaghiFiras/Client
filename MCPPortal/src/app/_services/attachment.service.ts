import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'https://localhost:7023/File'; // Replace with your API base URL

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  /**
   * Uploads documents for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @param files - An array of documents to upload.
   * @returns An Observable representing the upload response.
   */
  uploadFiles(assignmentNumber: string, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file, file.name);
    });

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.post(`${this.baseUrl}/upload?assignmentNumber=${assignmentNumber}`, formData, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error uploading documents:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Updates a file for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @param fileName - The name of the file to update.
   * @param file - The updated file.
   * @returns An Observable representing the update response.
   */
  updateFile(assignmentNumber: string, fileName: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.put(`${this.baseUrl}/Update?assignmentNumber=${assignmentNumber}&fileName=${fileName}`, formData, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error updating file:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Downloads a file for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @param fileName - The name of the file to download.
   * @returns An Observable representing the file download.
   */
  downloadFile(assignmentNumber: string, fileName: string): Observable<Blob> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/download?assignmentNumber=${assignmentNumber}&fileName=${fileName}`, {
          responseType: 'blob',
          headers
        });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error downloading file:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Deletes a file for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @param fileName - The name of the file to delete.
   * @returns An Observable representing the delete response.
   */
  deleteFile(assignmentNumber: string, fileName: string): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.delete(`${this.baseUrl}/delete?assignmentNumber=${assignmentNumber}&fileName=${fileName}`, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error deleting file:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves all documents for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @returns An Observable representing the list of documents.
   */
  getAllFiles(assignmentNumber: string): Observable<string[]> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string[]>(`${this.baseUrl}/get?assignmentNumber=${assignmentNumber}`, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error retrieving documents:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves photos for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @returns An Observable representing the list of photos.
   */
  getPhotos(assignmentNumber: string): Observable<string[]> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string[]>(`${this.baseUrl}/getphotos?assignmentNumber=${assignmentNumber}`, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error retrieving photos:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Retrieves documents for a specific assignment.
   * @param assignmentNumber - The assignment number.
   * @returns An Observable representing the list of documents.
   */
  getDocuments(assignmentNumber: string): Observable<string[]> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<string[]>(`${this.baseUrl}/getdocuments?assignmentNumber=${assignmentNumber}`, { headers });
      }),
      catchError((error) => {
        // Handle error here
        console.error('Error retrieving documents:', error);
        return throwError(error);
      })
    );
  }
}
