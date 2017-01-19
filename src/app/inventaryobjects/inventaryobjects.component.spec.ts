/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InventaryobjectsComponent } from './inventaryobjects.component';

describe('InventaryobjectsComponent', () => {
  let component: InventaryobjectsComponent;
  let fixture: ComponentFixture<InventaryobjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventaryobjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaryobjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
