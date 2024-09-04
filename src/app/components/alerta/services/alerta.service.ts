import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  alertaConfigs = signal<{ tipo: string; msg: string; tempo?: number; } | null>(null);
}
