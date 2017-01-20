import { Component, OnInit } from '@angular/core';
import { InventaryobjectsComponent } from '../inventaryobjects/inventaryobjects.component';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

declare let pdfMake: any;

@Component({
    selector: 'inventarylist',
    templateUrl: './inventarylist.component.html',
    styleUrls: ['./inventarylist.component.css']
})
export class InventarylistComponent implements OnInit {
    inventary: string[] = [];
    inv: string[];
    key: string = 'inv';

    constructor() { }

    ngOnInit() {
        this.inventary = JSON.parse(localStorage.getItem(this.key));
    }

    updateObject(nr: string) {
        return '/inventaryobjects/' + nr;
    }

    deleteObject(nr: string) {
        var events = _.remove(this.inventary,
            i => {
                return (i as any).nr == nr;
            });
        localStorage.setItem(this.key, JSON.stringify(this.inventary));
    }

    buildRows() {
        var rez = [];
        rez.push([{ colSpan: 3, text: 'Unitatea: ', alignment: 'left' }, { text: '' }, { text: '' }, { colSpan: 3, text: 'Fisa de inventariere', alignment: 'left' }, { text: '' }, { colSpan: 2, text: '' }, { text: '' }, { text: '' }], );
        rez.push([{ colSpan: 3, text: '' }, { text: '' }, { text: '' }, { colSpan: 3, text: 'Data: ', alignment: 'left' }, { text: '' }, { colSpan: 2, text: '' }, { text: '' }, { text: '' }]);
        rez.push([{ text: 'Nr. Crt' }, { colSpan: 2, text: 'Descriere', alignment: 'center' }, {}, { text: 'U/M' }, { colSpan: 2, text: 'Pret unitar' }, {}, { text: 'Stocuri' }, { text: 'Perioada de Amortizare' }]);
        for (var i = 0; i < this.inventary.length; i++) {
            var x = this.inventary[i] as any;
            var row = [{ text: x.nr }, { colSpan: 2, text: x.title + ' ' + x.description }, {}, { text: x.unit }, { colSpan: 2, text: x.price + ' ' + x.currency }, {}, { text: x.pieces }, { text: x.period }];
            rez.push(row);
        }
        return rez;
    }

    print() {

        var inventar = {
            content: [

                {
                    style: 'tableHeader',
                    table: {
                        widths: [20, 100, '*', 34, '*', 50, '*', 60],
                        body: this.buildRows()
                    }

                },
            ],

            styles: {

                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },

                listHeader: {
                    bold: true,
                    fontSize: 10,
                    color: 'black',
                    border: null,
                },

            }
        };

        pdfMake.createPdf(inventar).open();
    }
}




