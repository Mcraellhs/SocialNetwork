import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 @Output() cancelRegister=new EventEmitter();
  model:any={};
  constructor(private authService:AuthService, private alertify:AlertifyService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{
     this.alertify.success("Registration Successfull")
    },error=>{
      this.alertify.error("Registration Failed")
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    
  }

}
