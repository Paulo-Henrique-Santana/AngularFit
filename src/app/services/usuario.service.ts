import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${environment.url}/usuarios`;
  
  http = inject(HttpClient);

  cadastrar(body: Usuario) {
    return this.http.post(this.url, body);
  }
}
