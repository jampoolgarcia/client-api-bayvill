import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token: string | null = localStorage.getItem('accessToken');
        let request = req;

        if(token){
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(request);
    }

}