import { ButtonDirective } from '@coreui/angular';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-data',
  imports: [CommonModule, NgFor, ButtonDirective, HttpClientModule],
  templateUrl: './all-data.component.html',
  styleUrl: './all-data.component.scss',
  standalone: true,
})
export class AllDataComponent implements OnInit {
  ngOnInit(): void {
    this.get_data()
  }

  constructor(private http: HttpClient, private base: ApiServices) {}

  get_data() {
    this.http.get(`${this.base.Api()}/get.main`).subscribe((res: any) => {
      console.log(res);

    });
  }

  data: any = [
    {
      asd: 1,
    },
    { asd: 2 },
  ];
}
