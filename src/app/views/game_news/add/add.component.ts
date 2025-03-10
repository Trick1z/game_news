import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective, FormModule } from '@coreui/angular';
import { ApiServices } from '../apiServices';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  imports: [
    FormModule,
    FormsModule,
    ButtonDirective,
    CommonModule,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  standalone: true,
})
export class AddComponent implements OnInit {
  main_data_state: boolean = false;
  main_data: any = {};
  apiUrl: string = '';
  ngOnInit(): void {
    this.apiUrl = this.base.Api();
  }
  constructor(private http: HttpClient, private base: ApiServices) {}
  main_id: number | null = null;
  main_submit() {
    this.main_data_state = true;
    this.main_data.img = this.base64Image;
    // // console.log(this.apiUrl);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .post(`${this.base.Api()}/post.main`, this.main_data)
          .subscribe((res: any) => {
            this.main_id = res.main.id;
          });

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your data has been added!',
          showConfirmButton: false,
          timer: 600,
        });
      }

      return
    });
  }

  sub_data: any = {};

  sub_onSubmit() {
    this.sub_data.main_id = this.main_id;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post(`${this.base.Api()}/post.sub`,this.sub_data).subscribe((res:any ) =>{

          this.clear();
        })

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your data has been added!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return
    });
  }

  // base64 event
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

  clear() {
    window.location.reload();

  }
}
