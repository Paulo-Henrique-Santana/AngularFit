import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';
import { AlertaService } from '../../components/alerta/services/alerta.service';
import { MsgErroFormControlComponent } from '../../components/msg-erro-form-control/msg-erro-form-control.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, MsgErroFormControlComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  alertaService = inject(AlertaService);
  router = inject(Router);

  form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
    confirmarSenha: ['', Validators.required],
  });

  ngOnInit() {
    this.validarEmailCadastrado();
    this.validarConfirmacaoSenha();
  }

  validarEmailCadastrado() {
    const controlEmail = this.form.get('email');

    controlEmail?.valueChanges
      .pipe(
        filter((value) => value?.length),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((value: string) =>
          this.usuarioService.getList({ email: value })
        )
      )
      .subscribe({
        next: (res) => {
          if (res.count) {
            controlEmail.setErrors({
              ...controlEmail.errors,
              emailCadastrado: true,
            });
          } else {
            delete controlEmail.errors?.['emailCadastrado'];
          }
        },
      });
  }

  validarConfirmacaoSenha() {
    const controlSenha = this.form.get('senha')!;
    const controlConfirmarSenha = this.form.get('confirmarSenha')!;

    combineLatest([
      controlSenha.valueChanges,
      controlConfirmarSenha.valueChanges,
    ]).subscribe(([senha, confirmarSenha]) => {
      if (senha !== confirmarSenha) {
        controlConfirmarSenha.setErrors({
          ...controlConfirmarSenha.errors,
          senhaDiferente: true,
        });
      } else {
        delete controlConfirmarSenha.errors?.['senhaDiferente'];
      }
    });
  }

  cadastrar() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsDirty();
      control.markAsTouched();
    });

    console.log(this.form);

    if (this.form.invalid) return;

    this.usuarioService.cadastrar(this.form.value).subscribe({
      next: () => {
        this.alertaService.alertaConfigs.set({
          msg: 'Usuário cadastrado com sucesso',
          tipo: 'success',
        });
        this.router.navigate(['/login']);
      },
    });
  }
}
