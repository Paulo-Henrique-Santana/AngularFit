import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../components/alerta/services/alerta.service';
import { MsgErroFormControlComponent } from '../../components/msg-erro-form-control/msg-erro-form-control.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, MsgErroFormControlComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  alertaService = inject(AlertaService);
  router = inject(Router);

  form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
    confirmarSenha: ['', [Validators.required, this.validadorConfirmarSenha.bind(this)]],
  });

  msgsErrosConfirmarSenha = {
    senhaDiferente: 'As senhas devem ser iguais'
  }

  validadorConfirmarSenha(control: AbstractControl) {
    return control.value !== this.form?.value.senha ? { senhaDiferente: true } : null;
  }

  cadastrar() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsDirty();
      control.markAsTouched();
    })

    if (this.form.invalid) return;

    this.usuarioService.cadastrar(this.form.value).subscribe({
      next: () => {
        this.alertaService.alertaConfigs.set({ msg: 'Usuário cadastrado com sucesso', tipo: 'success' });
        this.router.navigate(['/login'])
      }
    })
  }
}
