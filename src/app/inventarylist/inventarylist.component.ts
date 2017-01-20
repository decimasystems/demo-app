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
                        body: [
                            [{ colSpan: 4, text: 'Unitatea:................................ ', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: 'Fisa de inventariere', alignment: 'left' },
                            { colSpan: 4, width: 200, text: '.....................................', alignment: 'center', color: 'white' },
                            { text: ' ', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: ' ', alignment: 'center' }
                            ],
                            [{ colSpan: 4, text: ' ', alignment: 'center' },
                            { text: '', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: '', alignment: 'center' },
                            { text: 'Data.................... ', alignment: 'center' },
                            { colSpan: 4, text: '', alignment: 'center' },
                            { text: '', alignment: 'center' },
                            { text: ' ', alignment: 'center' },
                            { text: '', alignment: 'center' },
                            { text: '.................', alignment: 'center', color: 'white' }
                            ],
                        ]
                    }
                    
                },
                 { text: 'Dynamic parts', style: 'header' },
                 table(this.inventary,['nr', 'title', 'description', 'unit', 'price', 'currency', 'pieces', 'period'])
            ],
            styles: {

                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black',

                }
            }
        };

        pdfMake.createPdf(inventar).open();
    }

}

function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })
        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            headerRows: 8,
            body: buildTableBody(data, columns)
        }
    };
}