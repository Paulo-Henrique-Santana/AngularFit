import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { GetListAPI } from '../models/get-list-api';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${environment.url}/usuarios`;
  
  http = inject(HttpClient);

  getList(params: {
    email?: string;
  }) {
    const httpParams = new HttpParams().appendAll(params);

    return this.http.get<GetListAPI<Usuario>>(this.url, { params: httpParams });
  }

  cadastrar(body: Usuario) {
    return this.http.post(this.url, body);
  }
}
