/*
* https://rxjs.dev/guide/subject#replaysubject
* A ReplaySubject is similar to a BehaviorSubject in that it can send old values to new subscribers,
*
* https://github.com/ReactiveX/rxjs/blob/master/src/internal/ReplaySubject.ts
* */


import { ReplaySubject } from 'rxjs';
// const subject = new ReplaySubject(3 );
//
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`),
// });


const subjectWithBufferReset$ = new ReplaySubject(3, 500);

subjectWithBufferReset$.next(1);
subjectWithBufferReset$.next(2);
subjectWithBufferReset$.next(3);
subjectWithBufferReset$.next(4);

setTimeout(() => {
    subjectWithBufferReset$.subscribe({
        next: (v) => console.log(`observer: ${v}`),
    });

    subjectWithBufferReset$.next(6);
}, 1000);


/*
*  analytics
* */
