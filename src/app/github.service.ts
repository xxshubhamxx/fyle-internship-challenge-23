import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const token = environment.patToken;

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }
  
  private apiUrl = 'https://api.github.com';


  getRepositories(username: string, page: number, perPage: number): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
  
      const apiUrl = `${this.apiUrl}/users/${username}/repos`;
      console.log('API URL:', apiUrl);
      console.log('API Parameters:', params.toString());
    
      const headers = {
        Authorization: `Bearer ${environment.patToken}`
      };

      this.http.get('https://api.github.com/rate_limit').subscribe(response => {
        console.log(response);
      });

  
      return this.http.get<any[]>(apiUrl, { params, headers });
  }
  
  getUserRepositoriesCount(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/${username}`).pipe(
      map((user: any) => user.public_repos)
    );
  }
}
