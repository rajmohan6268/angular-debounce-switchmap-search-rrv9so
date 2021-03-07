import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, switchMap, map, tap } from "rxjs/operators";
import { DataService } from "./data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  filteredVaules: Observable<string[]>;
  countryControl: FormControl = new FormControl();

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.filteredVaules = this.countryControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(val => this._dataService.GetFilteredCountries(val))
    );

    this.countryControl.valueChanges.subscribe(val => {
      console.log(val);
      this.filteredVaules = this._dataService.GetFilteredCountries(val);
    });

    this.countryControl.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      console.log(val);
      this.filteredVaules = this._dataService.GetFilteredCountries(val);
    });
  }
}
