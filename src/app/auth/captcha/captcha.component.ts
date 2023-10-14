import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  @Input("config") config: any = {};
  @Output() captchaCode = new EventEmitter();
  captch_input:any = null;
  code: any = null;
  resultCode:any = null;
  @Input() form:any;
  
  constructor() { }

  ngOnInit(): void {
   window.speechSynthesis.getVoices()
  }

  ngOnChanges() {
    console.log('cap config: ',this.config);
    
    if (this.config) {
      if (!this.config.font || !this.config.font.size) {
        this.config["font"]["size"] = "40px";
      }
      if (!this.config.font || !this.config.font.family) {
        this.config["font"]["family"] = "Arial";
      }
      if (!this.config.strokeColor) {
        this.config["strokeColor"] = "#f20c6c";
      }
      if (!this.config.length) {
        this.config["length"] = 6;
      }
      if (!this.config.cssClass) {
        this.config["cssClass"] = '';
      }

      if (!this.config.type) {
        this.config["type"] = 1;
      }
      
      if (!this.config.back || !this.config.back.stroke) {
        this.config["back"]["stroke"] = "";
      }
      if (!this.config.back || !this.config.back.solid) {
        this.config["back"]["solid"] = "#f2efd2";
      }

      this.createCaptcha();
    }
  }

  createCaptcha() {
    console.log('cap config createCaptcha: ',this.config);

    let char =
      Math.random()
        .toString(24)
        .substring(2, this.config.length) +
      Math.random()
        .toString(24)
        .substring(2, 4);
      this.code = this.resultCode = char.toUpperCase();

    setTimeout(() => {
      let captcahCanvas: any = document.getElementById("captcahCanvas");
      var ctx = captcahCanvas.getContext("2d");
      ctx.fillStyle = this.config.back.solid;
      ctx.fillRect(0, 0, captcahCanvas.width, captcahCanvas.height);

      ctx.beginPath();

      captcahCanvas.style.letterSpacing = 25 + "px";
      ctx.font = this.config.font.size + " " + this.config.font.family;
      ctx.fillStyle = this.config.font.color;
      ctx.textBaseline = "middle";
      ctx.fillText(this.code, 40, 50);
      if (this.config.back.stroke) {
        ctx.strokeStyle = this.config.back.stroke;
        for (var i = 0; i < 150; i++) {
          ctx.moveTo(Math.random() * 300, Math.random() * 300);
          ctx.lineTo(Math.random() * 300, Math.random() * 300);
        }
        ctx.stroke();
      }
    this.captchaCode.emit(this.code);
    }, 100);

  }

  playCaptcha() {

    var msg = new SpeechSynthesisUtterance(this.code.split('').join(' '));
    const voices = window.speechSynthesis.getVoices();
    console.log("voices: ",voices); 
    const hindiVoices = voices.filter((voice) => voice.lang === 'en-IN');
    const indianEnglishVoice = hindiVoices.length > 0 ? hindiVoices[0] : null;
    console.log("indianEnglishVoice: ",indianEnglishVoice);
    msg.pitch = 0.4;
    msg.rate = 0.9;
    msg.voice = indianEnglishVoice
    window.speechSynthesis.speak(msg);

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched)
    );
  }
}
