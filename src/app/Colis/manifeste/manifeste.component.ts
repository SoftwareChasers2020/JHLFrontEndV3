import { Component, OnInit } from '@angular/core';
import {ColisService} from '../../Service/GestColisService/colis.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-manifeste',
  templateUrl: './manifeste.component.html',
  styleUrls: ['./manifeste.component.css']
})
export class ManifesteComponent implements OnInit {

  constructor(public colisService: ColisService,
              private sanitizer: DomSanitizer) { }
  imageToShow: any;

  ngOnInit(): void {

  }

  createImageFromBlob(image: Blob): any {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  getImageFromService(id) {
    this.colisService.getcodeQr(id).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => console.log(error));
  }
}
