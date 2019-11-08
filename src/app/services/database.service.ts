import { Injectable, OnDestroy } from "@angular/core";
import { DataBaseProfile } from "../settings/profiles/profile.data";
declare var remote: any;

@Injectable({
  providedIn: "root"
})
export class DatabaseService implements OnDestroy {
  private mysql: any;
  private connection;

  constructor() {
    this.mysql = remote.require("mysql");
  }

  public testConnection(
    dbProfile: DataBaseProfile
  ): Promise<{ status: boolean; message: string }> {
    return new Promise(resolve => {
      this.connection = this.mysql.createConnection({
        host: dbProfile.host,
        port: dbProfile.port,
        database: dbProfile.database,
        user: dbProfile.user,
        password: dbProfile.password
      } as any);

      this.connection.connect((error: Error) => {
        if (error) {
          resolve({ status: false, message: error.message });
        } else {
          resolve({ status: true, message: "" });
        }
      });
    });
  }

  public ngOnDestroy(): void {
    this.connection.destroy();
  }
}
