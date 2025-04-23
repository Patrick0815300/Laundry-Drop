import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

@NgModule({
    exports: [
        PaginatorModule,
        ButtonModule,

    ]
})
export class PrimeNgModule { }
