import { ViewChild, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'], // Ensure the path is correct
})
export class RepositoryListComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  username: string = '';
  repositories: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalRepositories: number = 0;

  constructor(private githubService: GithubService) {}

  generateArray(length: number): any[] {
    return new Array(length);
  }

  searchRepositories() {
    // Check if the search input is empty, if yes, don't set isLoading to true
    if (this.username.trim() === '') {
      return;
    }

    this.isLoading = true;

    // Fetch total repository count
    this.githubService
      .getUserRepositoriesCount(this.username)
      .subscribe((totalCount) => {
        this.totalRepositories = totalCount;
      });

    // Fetch repositories for the current page
    this.githubService
      .getRepositories(this.username, this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.repositories = data;
        this.isLoading = false;
      });
  }

  onPageChange(event: any) {
    console.log('Page changed to: ', event.pageIndex + 1); // Check the page number in the console
    this.currentPage = event.pageIndex + 1;
    this.searchRepositories(); // Ensure this function is being called
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.pageSize = this.paginator.pageSize;
        // Handle page change event here
        this.searchRepositories();
      });
    }
  }

  onPageSizeChange(event: any) {
    console.log('onPageSizeChange called to change pageSize');
    this.pageSize = event;
  }
}
