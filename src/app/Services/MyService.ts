import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class MyService
{
    myEventEmiter:EventEmitter<string> = new EventEmitter<string>();
}