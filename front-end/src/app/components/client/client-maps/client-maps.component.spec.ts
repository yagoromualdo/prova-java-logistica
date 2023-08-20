import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMapsComponent } from './client-maps.component';

describe('ClientMapsComponent', () => {
  let component: ClientMapsComponent;
  let fixture: ComponentFixture<ClientMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
