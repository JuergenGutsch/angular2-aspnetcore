import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from './person.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>My First Angular 2 App</h1>
    <ul>
    <li *ngFor="let person of persons">
    <strong>{{person.name}}</strong><br>
    from: {{person.city}}<br>
    date of birth: {{person.dob | date: 'dd/MM/yyyy'}}
    </li>
    </ul>
    `,
    providers: [
        PersonService
    ]
})
export class AppComponent extends OnInit {

    constructor(private _service: PersonService) {
        super();
    }

    ngOnInit() {
        this._service.loadData().then(data => {
            this.persons = data;
        })
    }

    persons: Person[] = [];
}

