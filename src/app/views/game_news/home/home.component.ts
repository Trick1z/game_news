import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [HttpClientModule,CommonModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.get_data();
  }

  constructor(private http: HttpClient, private Base: ApiServices) {}
  _data: any = [];
  get_data() {
    this.http.get(`${this.Base.Api()}/get.user.main`).subscribe((res: any) => {
      console.log(res);
      this._data = res;
    });
  }
}
