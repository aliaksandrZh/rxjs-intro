/*
* https://github.com/ReactiveX/rxjs/blob/7.8.0/src/internal/BehaviorSubject.ts
* https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
*
* Subject with a default (initial) value
* It keeps the last value and emits it to a new subscriber
*
* It has getValue() method
*
* */

import {BehaviorSubject} from "rxjs";

const bs$ = new BehaviorSubject(0);

bs$.subscribe(x => console.log('bs1', x));

bs$.next(1);
bs$.next(2);

bs$.subscribe(x => console.log('bs2', x));

/*
* State management
* */
