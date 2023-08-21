import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client/client.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
  };
  latitude!: any;
  longitude!: any;
  clientForm: FormGroup = this.builder.group({});
  action: string = '';
  client!: Client;
  markers = [] as any;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPosition!: google.maps.LatLngLiteral;
  markerPositionLat!: google.maps.LatLngLiteral;
  markerPositionLng!: google.maps.LatLngLiteral;
  ariaDisabled: boolean = false;

  addMarker(event: any) {
    this.markerPosition = event.latLng.toJSON();
    return this.markerPosition;
  }

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.action = this.activatedRoute.snapshot.url[1].path;
    this.createForm();

    if (this.action == 'visualize') {
      this.clientForm.disable();
      this.ariaDisabled = true;
    } else {
      this.ariaDisabled = false;
    }

    if (this.action !== 'create') {
      const id = Number(this.activatedRoute.snapshot.url[2].path);
      this.findById(id);
      this.markerPosition = this.client;
    }
  }

  createForm(): void {
    this.clientForm = this.builder.group({
      id: null,
      name: [null, [Validators.required]],
      cnpj: [null, [Validators.required, Validators.maxLength(18)]],
      email: null,
      telephone: null,
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
    })

  }

  onSave(): void {
    Object.keys(this.clientForm.controls).forEach((field) =>
      this.clientForm.get(field)?.markAsTouched()
    );

    this.clientService.save(this.clientForm.value).subscribe(() => {
      this.location.back()
    });
  }

  onCancel(): void {
    this.location.back()
  }

  findById(id: number): void {
    this.clientService
      .findById(id)
      .subscribe(response => {
        this.clientForm.patchValue(response);
        this.center = response;
      }
      );
    this.clientService
      .findById(id)
      .subscribe(response => this.client = response);
  }

  onAlterar(): void {
    var clientId = this.activatedRoute.snapshot.params["idClient"];
    this.router.navigate(['/client/update/' + clientId]);
    this.action = 'update';
    this.clientForm.enable();
  }

  onSaveLatLng(latitude: number, longitude: number): void {
    this.clientForm.controls['lat'].setValue(latitude);
    this.clientForm.controls['lng'].setValue(longitude);
  }

}

