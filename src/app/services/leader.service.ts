import { Injectable } from '@angular/core';
import { Leader } from  '../shared/leader';
/*import{ LEADERS } from '../shared/leaders';*/
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
            .pipe(catchError(this.processHttpMsgService.handleError));
    /* before http :- of(LEADERS).pipe(delay(1000)) */
  }

  getLeader(id : string): Observable<Leader> {  
    return this.http.get<Leader>(baseURL + 'leaders' + id)
            .pipe(catchError(this.processHttpMsgService.handleError));
    /* before http :- LEADERS.filter((leader) => (leader.id === id ))[0] */
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true')
            .pipe(map(promotions => promotions[0]))
            .pipe(catchError(this.processHttpMsgService.handleError));
    /* before http :- of(LEADERS.filter((leader) => (leader.featured))[0]).pipe(delay(1000)) */

  }
  
}
