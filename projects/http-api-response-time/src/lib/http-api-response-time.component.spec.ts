import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpApiResponseTimeComponent } from './http-api-response-time.component';

describe('HttpApiResponseTimeComponent', () => {
  let component: HttpApiResponseTimeComponent;
  let fixture: ComponentFixture<HttpApiResponseTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpApiResponseTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HttpApiResponseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
