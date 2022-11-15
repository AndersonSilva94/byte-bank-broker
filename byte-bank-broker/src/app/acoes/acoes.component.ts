import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from 'src/app/acoes/modelo/acoes'
import { AcoesService } from 'src/app/acoes/acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();
  acoes: Acoes;

  constructor(
    private acoesService: AcoesService
  ) {}

  ngOnInit(): void {
    this.acoesService.getAcoes()
      .subscribe(
        res => this.acoes = res.payload
      )
  }
}
