import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './post-data';

@Injectable()
export class DataService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl  = 'https://api.snowroll.me/v1/snowroll/getpostexternal?post_id=';

    constructor(private http: Http) { }

    getPostData(id: number): Promise<Post> {
        const url = this.apiUrl + id;
        return this.http.get(url).toPromise().then(response => this.parseResponse(response.json()) as Post).catch(this.handleError);
    }

    private parseResponse(response: any) {
        if (response.status === 'success') {
            console.log(response.data);
            return response.data;
        }
        return false;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
