/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InventarylistComponent } from './inventarylist.component';

describe('InventarylistComponent', () => {
  let component: InventarylistComponent;
  let fixture: ComponentFixture<InventarylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
