import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGridButtonComponent } from './delete-grid-button.component';

describe('DeleteGridButtonComponent', () => {
  let component: DeleteGridButtonComponent;
  let fixture: ComponentFixture<DeleteGridButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteGridButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGridButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
