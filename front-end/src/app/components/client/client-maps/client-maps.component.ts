import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-maps',
  templateUrl: './client-maps.component.html',
  styleUrls: ['./client-maps.component.css']
})
export class ClientMapsComponent implements OnInit {

  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
  };
  latitude!: any;
  longitude!: any;
  clientList: Client[] = [];
  client!: Client;
  markers = [] as any;
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  clientName!: string;
  clientCnpj!: string;
  clientEmail!: string;
  clientTelephone!: string;
  clientLat!: number;
  clientLng!: number;


  constructor(
    private clientService: ClientService,
  ) { }


  ngOnInit() {
    this.findAllClients();
  }


  findAllClients(): void {
    this.clientService
      .findAll()
      .subscribe(
        response => {
          this.clientList = response;
        }
      )
  }



  openInfoWindowClient(markerA: MapMarker, name: string, cnpj: string, telephone: string, email: string, lat: number, lng: number) {
    this.clientName = name;
    this.clientCnpj = cnpj;
    this.clientEmail = email;
    this.clientTelephone = telephone;
    this.clientLat = lat;
    this.clientLng = lng;
    this.infoWindow.open(markerA);
    return this.clientName, this.clientCnpj, this.clientEmail, this.clientTelephone, this.clientLat, this.clientLng;
  }


}
