import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@NgModule({
    exports: [
        PaginatorModule,
        ButtonModule,
        ProgressSpinnerModule,
        CardModule,
        DialogModule,
        DividerModule
    ]
})
export class PrimeNgModule { }
