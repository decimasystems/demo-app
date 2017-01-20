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

    print() {
        this.inventary = JSON.parse(localStorage.getItem(this.key));
        console.log(this.inventary);

        var inventar = {
            content: [

                {
                    style: 'tableHeader',
                    table: {
                        widths: [200, 160, '*', 34],
                        body: [

                            [{ text: 'Unitatea: ', alignment: 'left' }, { text: 'Fisa de inventariere', alignment: 'left' }, { text: '' }, { text: '' }
                            ],
                            [{ text: '' }, { text: 'Data: ', alignment: 'left' }, { text: '' }, { text: '' }
                            ],
                        ]
                    }

                },

                {
                    style: 'listHeader',
                    table: {
                        widths: [20, 100, '*', 34, '*', 45, '*', 55],
                        body: [
                            [{ text: 'Nr. Crt' }, { text: 'Titlu' }, { text: 'Descriere' }, { text: 'U/M' }, { text: 'Pret/buc.' }, { text: 'Moneda' }, { text: 'Nr. de Bucati' }, { text: 'Perioada de Amortizare' }],
                        ]
                    }
                },
                [table(this.inventary)]


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
                }
            }
        };

        pdfMake.createPdf(inventar).open();
    }

}

function buildTableBody(data) {
    var body = [];
    var columns = ['nr', 'title', 'description', 'unit', 'price', 'currency', 'pieces', 'period'];
    body.push();

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());

        })

        body.push(dataRow);
    });

    return body;
}

function table(data) {
    return {
        table: {
            widths: [20, 100, '*', 34, '*', 45, '*', 55],
            body: buildTableBody(data)
        },

    };
}