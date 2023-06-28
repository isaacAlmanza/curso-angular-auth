import { DataSource } from '@angular/cdk/collections';
import { ResponseUsers } from '@models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser extends DataSource<ResponseUsers> {

  data = new BehaviorSubject<ResponseUsers[]>([]);
  originalData: ResponseUsers[]= [];

  connect(): Observable<ResponseUsers[]> {
    return this.data;
  }

  init(data: ResponseUsers[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
