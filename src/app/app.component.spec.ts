import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should start with initial values', () => {
    expect(component.searchQuery).toBe('');
    expect(component.loading).toBe(false);
    expect(component.repositories.length).toBe(0);
    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.totalPages).toBe(0);
    expect(component.pageSizes).toEqual([10, 20, 50, 100]);
  });

  it('should call searchRepositories method on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    spyOn(component, 'searchRepositories');
    button.click();
    expect(component.searchRepositories).toHaveBeenCalled();
  });

  it('should update repositories array after successful API call', () => {
    const mockRepos = [{ name: 'repo1', description: 'desc1' }, { name: 'repo2', description: 'desc2' }];
    spyOn(component['http'], 'get').and.returnValue(of(mockRepos));
    component.searchQuery = 'username';
    component.searchRepositories();
    expect(component.repositories).toEqual(mockRepos);
  });

  it('should handle API error by logging and clearing repositories array', () => {
    spyOn(console, 'error');
    spyOn(component['http'], 'get').and.returnValue(throwError('API error'));
    component.searchRepositories();
    expect(console.error).toHaveBeenCalled();
    expect(component.repositories.length).toBe(0);
  });

  // Add more test cases as needed
});
