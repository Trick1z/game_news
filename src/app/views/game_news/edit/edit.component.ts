import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonDirective, FormModule } from '@coreui/angular';
import { ApiServices } from '../apiServices';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    ButtonDirective,
    HttpClientModule,
    FormModule,
    FormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
})
export class EditComponent implements OnInit {
  ngOnInit(): void {
    this.get_session_id();
  }
  constructor(private http: HttpClient, private Base: ApiServices) {}

  get_session_id() {
    sessionStorage.setItem('main_id', '2');

    var get_id = sessionStorage.getItem('main_id') || null;
    // var id = get_id
    var id = 0;
    if (get_id) {
      id = parseInt(get_id);
    }

    this.main_id = id;
    return this.get_edit_data();
  }

  main_id = 0;

  data_: any = {};
  get_edit_data() {
    this.http
      .get(`${this.Base.Api()}/get.edit/ref_main=${this.main_id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.data_ = res[0];
        this.base64Image = res[0].IMG_IMG;
      });
  }

  base64Image: string | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
      reader.onerror = (error) => {
        console.error('Error converting file to Base64: ', error);
      };
    }
  }

  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    // const month = date.toLocaleString('th-TH', { month: 'long' });
    const month = date.toLocaleString('th-TH', { month: 'short' }); // Use 'short' for abbreviated month
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate},${formattedTime}น.`;
  }

  onSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
        .put(`${this.Base.Api()}/put.edit`, this.data_)
        .subscribe((res: any) => {
          console.log(res);
        });
        Swal.fire({
          title: 'Edited!',
          text: 'Your data has been edited.',
          icon: 'success',
        });

        return this.get_edit_data();
      }
      return
    });

  }
}
