import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(TimerComponent) timer: TimerComponent;

  @Input() initialTime: number = 0;
  // initialTime = 0

  // public alerts = {
  //   greenAlert: '00:00:01',
  //   yellowAlert: '00:00:00',
  //   redAlert: '00:00:00',
  // }

  public event = {
    month: '1990-02-19',
    timeStarts: '00:00:00',
    timeEnds: '1990-02-20',
  }

  constructor(public navCtrl: NavController, private cd: ChangeDetectorRef, private network: Network, private toast: ToastController) {

  }

  ngOnInit() {

  }

  displayNetworkUpdate(connectionState: string) {

    let networkType = this.network.type
    this.toast.create({
      message: `Ahora estas en la red ${connectionState} via ${networkType}`,
      duration: 5000
    }).present();
  }

  ionViewDidEnter() {

    this.network.onConnect().subscribe(data => {
      console.log(data), error => console.error(error)
    });

    this.network.onDisconnect().subscribe(data => {
      console.log(data), error => console.error(error)
    });
  }


  // ngAfterViewInit() {
  //   this.initialTime = this.parseTime(this.alerts.greenAlert)
  //   this.cd.detectChanges();
  // }

  doSomethingWithCurrentValue(value) {
    // console.log(this.timer.timeInSeconds)
    // value = this.timer.timeInSeconds
    this.timer.initTimer()
  }

}
