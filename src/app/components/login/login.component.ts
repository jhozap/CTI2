import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/requestUser.class';
import { User } from 'src/app/models/user.class';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  myForm: FormGroup;
  user = new Usuario();
  usuariologin = new User();

  constructor(public fb: FormBuilder,
              private _auth: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      usuario: [undefined, Validators.required],
      contraseña: [undefined, Validators.required]
    });
  }

  submitForm = () => {
    if (this.myForm.valid) {
      this.user.Username = this.myForm.controls.usuario.value;
      this.user.Password = this.myForm.controls.contraseña.value;
      this._auth.login(this.user).subscribe((data: any) => {
        if (data) {
          this.usuariologin = data;
          sessionStorage.setItem('user', atob(JSON.stringify(this.usuariologin)));
          localStorage.setItem('isLogged', 'true');
          this.router.navigateByUrl("/home");
        } else {
          this.toastr.warning('Datos inválidos');
        }
      });
    } else {
      this.toastr.error('Ingrese todos los campos');
    }
  };

}
