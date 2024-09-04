import { Component, effect, inject, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertaService } from './services/alerta.service';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.scss',
})
export class AlertaComponent implements OnInit {
  alertaService = inject(AlertaService);

  exibirAlerta = false;
  alertaConfigs?: {
    tipo: string;
    msg: string;
    tempo?: number;
  };

  constructor() {
    effect(() => {
      if (!this.alertaService.alertaConfigs()) return;

      this.exibirAlerta = true;
      this.alertaConfigs = this.alertaService.alertaConfigs()!;

      setTimeout(() => {
        this.exibirAlerta = false;
      }, this.alertaConfigs.tempo || 4000);
    });
  }

  ngOnInit() {}
}
