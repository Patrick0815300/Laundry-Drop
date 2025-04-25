import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    exports: [
        PaginatorModule,
        ButtonModule,
        ProgressSpinnerModule
    ]
})
export class PrimeNgModule { }
