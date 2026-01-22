import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserComponent } from './header-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUserComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
