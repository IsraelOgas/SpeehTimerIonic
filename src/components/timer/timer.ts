import { Component, Input } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { ITimer } from '../timer/itimer';

import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'timer',
  templateUrl: './timer.html',
})
export class TimerComponent {

  @Input() timeInSeconds: number;
  public timer: ITimer;

  max = 0
  color = '#00C853'
  stroke = 20

  public alerts = {
    greenAlert: '00:00:00',
    yellowAlert: '00:00:00',
    redAlert: '00:00:00',
  }

  constructor(
    public toastCtrl: ToastController, private nativeAudio: NativeAudio, public navCtrl: NavController) {
  }

  ngOnInit() {
    // if (!this.timeInSeconds) { this.timeInSeconds = 0; }
    this.nativeAudio.preloadSimple('secondary_alert', 'assets/sounds/secondary_alert.mp3').then(data => { console.log(data)}, err => {console.log(err)});
    this.nativeAudio.preloadSimple('stop_alert', 'assets/sounds/stop_alert.mp3').then(data => { alert(data)}, err => {alert(err)});
    // this.nativeAudio.play('secondary_alert').then(data => { console.log(data)}, err => {console.log(err)});
    this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }
    this.color = '#00C853'
    this.timer = <ITimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    this.max = this.timeInSeconds
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    this.pauseToast();
    setTimeout(() => {
      this.timer.runTimer = false;
    }, 5000);
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      // console.log('ALERT'+this.convertDate(this.alerts.yellowAlert))
      if (this.timer.secondsRemaining == this.convertDate(this.alerts.yellowAlert)) {
        // console.log('amarillo'+this.timer.secondsRemaining)
        // this.nativeAudio.preloadSimple('secondary_alert', 'assets/sounds/secondary_alert.mp3').then(data => { console.log(data)}, err => {console.log(err)});
        this.nativeAudio.play('secondary_alert').then(data => { console.log(data)}, err => {console.log(err)});

        this.color = '#FFEB3B'
      }

      if (this.timer.secondsRemaining == this.convertDate(this.alerts.redAlert)) {
        this.nativeAudio.play('secondary_alert').then(data => { console.log(data)}, err => {console.log(err)});
        this.color = '#ED1616'
      }
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
        // if (this.timeInSeconds == this.parseTime(this.alerts.yellowAlert)) {
        //   console.log('amarillo'+this.timer.secondsRemaining)
        // }
      }
      else {
        this.timer.hasFinished = true;
        this.color = '#ED1616'
        // this.nativeAudio.preloadSimple('stop_alert', 'assets/sounds/stop_alert.mp3').then(data => { alert(data)}, err => {alert(err)});
        this.nativeAudio.play('stop_alert').then(data => { console.log(data)}, err => {alert(err)});
        this.finishToast();
      }
    }, 1000);
    console.log(this.timer.secondsRemaining)
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  finishToast() {
    const toast = this.toastCtrl.create({
      message: 'El tiempo se ha acabado',
      duration: 3000
    });
    toast.present();
  }

  pauseToast() {
    const toast = this.toastCtrl.create({
      message: 'El tiempo se detendrá dentro de unos segundos',
      duration: 3000
    });
    toast.present();
  }

  parseTime(hms) {
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    this.timeInSeconds = seconds
    this.initTimer()
    // console.log('IT ' + this.initialTime)
    // console.log(seconds);

    return seconds
  }

  convertDate(date) {
    var a = date.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds
  }

  verifyAlert(date) {
    if (this.convertDate(date) >= this.timeInSeconds){
      alert('Debe ser menor respecto a las demas alertas')
    }
  }

}