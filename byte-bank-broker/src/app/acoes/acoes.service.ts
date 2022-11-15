import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(
    private http: HttpClient
  ) { }

  getAcoes() {
    return this.http.get<AcoesAPI>('http://localhost:3000/acoes')
      .pipe(
        tap(valor => console.log(valor)),
        pluck('payload'), // extrai a propriedade que vai ser utlizado no próximo método
        map(acoes => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
      )
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo) return 1;

    if(acaoA.codigo < acaoB.codigo) return -1;

    return 0
  }
}
