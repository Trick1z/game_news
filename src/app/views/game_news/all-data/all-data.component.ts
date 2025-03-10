import {
  ButtonDirective,
  TableColorDirective,
  TableDirective,
  TableModule,
} from '@coreui/angular';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-data',
  imports: [
    CommonModule,
    NgFor,
    ButtonDirective,
    HttpClientModule,
    TableDirective,
    TableModule,
    TableColorDirective,
  ],
  templateUrl: './all-data.component.html',
  styleUrl: './all-data.component.scss',
  standalone: true,
})
export class AllDataComponent implements OnInit {
  ngOnInit(): void {
    this.get_data();
  }

  constructor(private http: HttpClient, private base: ApiServices) {}
  main_data: any = [];
  get_data() {
    this.http.get(`${this.base.Api()}/get.main`).subscribe((res: any) => {
      console.log(res);
      this.main_data = res;
    });
  }
}
