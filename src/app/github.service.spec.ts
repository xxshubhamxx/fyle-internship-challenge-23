import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve repositories via GET', () => {
    const dummyUsername = 'exampleuser';
    const dummyPage = 1;
    const dummyPerPage = 10;
    const mockResponse = [{ name: 'repo1' }, { name: 'repo2' }];

    service.getRepositories(dummyUsername, dummyPage, dummyPerPage).subscribe((repositories) => {
      expect(repositories).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${dummyUsername}/repos?page=${dummyPage}&per_page=${dummyPerPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve user repositories count via GET', () => {
    const dummyUsername = 'exampleuser';
    const mockResponse = 5;

    service.getUserRepositoriesCount(dummyUsername).subscribe((count) => {
      expect(count).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/users/${dummyUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
 