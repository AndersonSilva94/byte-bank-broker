import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from 'src/app/acoes/modelo/acoes'
import { AcoesService } from 'src/app/acoes/acoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  acoesInput = new FormControl();
  acoes: Acoes;

  constructor(
    private acoesService: AcoesService
  ) {}

  ngOnInit(): void {
  this.subscription = this.acoesService.getAcoes()
      .subscribe(
        res => this.acoes = res
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
