import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    if(process.env.MYDATA === '4'){
        console.log('After Code...');
        return of([{
            id:1,
            message:'Comming from cashe'
        }])
    }

    return next
      .handle()
      .pipe(        
        map(data=>{
            console.log('After Code...');
            return{
                ...data,
                newToken:"wdcedcecfcrecr"
            }
        })
      );
  }
}