import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  conection
  constructor(public navCtrl: NavController) {
  
  }

  ngOnInit() { 
    this.conection = "Wi-Fi"
    console.log(this.conection)
  }
}
