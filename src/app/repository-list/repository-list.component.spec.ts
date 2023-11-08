import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  repositories: any[] = [];
  isLoading: boolean = true;

  // Define the searchRepositories property
  searchRepositories: string = ''; // You can change the type according to your requirements

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.getRepositories("",-1,-1)
      .subscribe(
        (data) => {
          this.repositories = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching repositories:', error);
          this.isLoading = false;
        }
      );
  }
}
