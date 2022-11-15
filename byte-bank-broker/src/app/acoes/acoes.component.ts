import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from 'src/app/acoes/modelo/acoes'
import { AcoesService } from 'src/app/acoes/acoes.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  //private subscription: Subscription;

  acoesInput = new FormControl();
  //acoes: Acoes;

  acoes$ = this.acoesInput.valueChanges
    .pipe(
      tap(console.log),
      switchMap(
        (valorDigitado) => this.acoesService.getAcoes(valorDigitado)
      ), //recebe um observable e retorna um novo observable
      tap(console.log)
    )

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
