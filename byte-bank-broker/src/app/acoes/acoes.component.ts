import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from 'src/app/acoes/modelo/acoes'
import { AcoesService } from 'src/app/acoes/acoes.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  //private subscription: Subscription;

  acoesInput = new FormControl();
  //acoes: Acoes;
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(() => { console.log('fluxo inicial') }));
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => {
      console.log('fluxo do filtro')
    }),
    tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap(
      (valorDigitado) => this.acoesService.getAcoes(valorDigitado)
    )
  )

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$)

  constructor(
    private acoesService: AcoesService
  ) {}

  /* ngOnInit(): void {
  this.subscription = this.acoesService.getAcoes()
      .subscribe(
        res => this.acoes = res
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  } */
}
