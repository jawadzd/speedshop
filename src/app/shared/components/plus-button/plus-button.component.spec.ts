import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlusButtonComponent } from './plus-button.component';
import { DebugElement } from '@angular/core';

describe('PlusButtonComponent', () => {
  let component: PlusButtonComponent;
  let fixture: ComponentFixture<PlusButtonComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlusButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.itemPrice = 10; // Initialize itemPrice
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count 1', () => {
    expect(component.count).toBe(1);
  });

  it('should show total price equal to itemPrice when count is 1', () => {
    expect(component.totalPrice).toBe(component.itemPrice);
  });

  it('should increment count and update totalPrice when increment button is clicked', () => {
    const incrementButton = de.query(By.css('.increment-button')).nativeElement;
    incrementButton.click();
    fixture.detectChanges();
    expect(component.count).toBe(2);
    expect(component.totalPrice).toBe(2 * component.itemPrice);
  });

  it('should decrement count and update totalPrice when decrement button is clicked', () => {
    component.increment(); // Ensure count is > 1
    fixture.detectChanges();
    const decrementButton = de.query(By.css('.decrement-button')).nativeElement;
    decrementButton.click();
    fixture.detectChanges();
    expect(component.count).toBe(1);
    expect(component.totalPrice).toBe(component.itemPrice);
  });

  it('should not decrement below 1', () => {
    component.decrement();
    fixture.detectChanges();
    expect(component.count).toBe(1); // Should still be 1
  });

  it('should toggle expanded state when toggle method is called', () => {
    expect(component.expanded).toBeTrue();
    component.toggle();
    fixture.detectChanges();
    expect(component.expanded).toBeFalse();
    component.toggle();
    fixture.detectChanges();
    expect(component.expanded).toBeTrue();
  });

  it('should emit itemCountChange event when count changes', () => {
    spyOn(component.itemCountChange, 'emit');
    component.increment();
    fixture.detectChanges();
    expect(component.itemCountChange.emit).toHaveBeenCalledWith(2);
  });

  it('should show "Go to Cart" button when count is greater than 0', () => {
    component.count = 1;
    fixture.detectChanges();
    const buttonElement = de.query(By.css('.go-to-cart-button')).nativeElement;
    expect(buttonElement).toBeTruthy(); // Button should be present
  });

  it('should hide "Go to Cart" button when count is 0', () => {
    component.count = 0;
    fixture.detectChanges();
    const buttonElement = de.query(By.css('.go-to-cart-button')).nativeElement;
    expect(buttonElement).toBeFalsy(); // Button should be absent
  });
});
