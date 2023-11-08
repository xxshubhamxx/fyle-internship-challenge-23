import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { GithubService } from './github.service';


@NgModule({
  declarations: [AppComponent, RepositoryListComponent, SkeletonLoaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [GithubService],
  bootstrap: [AppComponent],
})
export class AppModule {}
