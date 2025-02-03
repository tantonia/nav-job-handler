import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl: string =  environment.apiUrl;
  private http = inject(HttpClient);

  // Fetch job listings from the API with pagination
  getAllJobs(page: number = 1, pageSize: number = 10): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.authToken}`,
      'Accept': 'application/json'
    });

    const url = `${this.apiUrl}?page=1&pageSize=1000`;
    return this.http.get<any>(url, { headers }).pipe(
      map(response => response.items || []),
      catchError(err => {
        console.error('Error fetching jobs:', err);
        return of([]);
      })
    );
  }

  // Fetch job details from the API
  getSingleJob(entryId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.authToken}`,
      'Accept': 'application/json'
    });

    // Define the endpoint URL using the entryId
    const url = `/api/api/v1/feedentry/${entryId}`;

    return this.http.get<any>(url, { headers }).pipe(
      map(response => {
        // Map response to include the job's data as per schema
        return {
          uuid: response.uuid,
          status: response.status,
          adContent: response.ad_content, // Contains ad details like description, job title, etc.
          published: response.ad_content?.published,
          description: response.ad_content?.description,  // The description of the job
          title: response.ad_content?.title,
          jobTitle: response.ad_content?.jobtitle,
          employerName: response.ad_content?.employer?.name,
          employerDescription: response.ad_content?.employer?.description,
          applicationUrl: response.ad_content?.applicationUrl
        };
      }),
      catchError(err => {
        console.error('Error fetching job details:', err);
        return of(null);  // Return null in case of error
      })
    );
  }
}
