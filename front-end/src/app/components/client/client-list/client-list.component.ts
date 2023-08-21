import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList: Client[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  searchText!: string;

  constructor(
    protected clientService: ClientService,
    private http: HttpClient
  ) {
  }

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


  onTableDataChange(event: any) {
    this.page = event;
    this.findAllClients();
  }


  deleteCLient(id: number): void {
    this.clientService
      .deleteById(id).subscribe(
        response => {
          this.findAllClients()
        }
      );;
  }

}
