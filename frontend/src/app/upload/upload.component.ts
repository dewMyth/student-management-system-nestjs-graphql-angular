import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  ngOnInit(): void {}

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const csv = event.target.files[0];
      this.myForm.patchValue({ fileSource: csv });
      console.log(csv);
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('csv', this.myForm.get('fileSource')!.value);

    console.log(formData);

    this.http
      .post('http://localhost:3000/api/students/upload', formData)
      .subscribe((data) => {
        console.log(data);
        alert('Uploaded successfully');
      });
  }
}
