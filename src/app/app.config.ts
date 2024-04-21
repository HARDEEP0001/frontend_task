import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchQuery: string = '';
  loading: boolean = false;
  repositories: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  pageSizes: number[] = [10, 20, 50, 100];

  constructor(private http: HttpClient) {}

  searchRepositories() {
    this.loading = true;
    this.http.get<any[]>(`https://api.github.com/users/${this.searchQuery}/repos`)
      .pipe(
        tap(data => {
          this.repositories = data;
          this.totalPages = Math.ceil(data.length / this.pageSize);
          this.loading = false;
        }),
        catchError(error => {
          console.error('API error:', error);
          this.repositories = [];
          this.loading = false;
          return throwError('API error occurred');
        })
      )
      .subscribe();
  }

  changePageSize() {
    this.totalPages = Math.ceil(this.repositories.length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
