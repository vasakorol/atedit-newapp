import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../services/storage.service";

const storageTabsId: any = [
  { id: "tab_instances" },
  { id: "tab_accounts" },
  { id: "tab_task" },
  { id: "tab_items" },
  { id: "tab_currencies" }
];

@Component({
  selector: "atv-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
  private con = 0;

  constructor(private storageService: StorageService) {}

  ngOnInit() {}

  addToStorage() {
    this.storageService.set("testing", storageTabsId);
  }

  getFromStorage() {
    console.log("res", this.storageService.get("testing"));
  }

  addToStorage2() {
    this.con++;
    this.storageService.set("count", this.con);
  }

  getFromStorage2() {
    console.log("res", this.storageService.get("count"));
  }
}
