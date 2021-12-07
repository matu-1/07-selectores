import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { PaisSmall } from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  form = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });
  regiones = this.paisService.regiones;
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private paisService: PaisService) {}

  ngOnInit(): void {
    this.form
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.isLoading = true;
          this.form.get('pais')?.reset('');
        }),
        switchMap((value) => this.paisService.getByRegion(value))
      )
      .subscribe((res) => {
        this.paises = res;
        this.isLoading = false;
      });

    this.form
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.fronteras = [];
          this.form.get('frontera')?.reset('');
          this.isLoading = true;
        })
      )
      .subscribe((value) => {
        if (value)
          this.paisService
            .getByCode(value)
            .pipe(switchMap((res) => this.paisService.getByCodes(res.borders)))
            .subscribe((res) => {
              this.fronteras = res;
              this.isLoading = false;
            });
      });
  }

  guardar() {
    console.log('value', this.form.value);
  }
}
