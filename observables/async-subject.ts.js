/*
* The AsyncSubject is a variant where only the last value of the Observable execution is sent to its observers,
* and only when the execution completes.
*
* https://github.com/ReactiveX/rxjs/blob/f04fe72eba2f117041e1a9c1794f16473ecae697/src/internal/AsyncSubject.ts#L26
*
* https://github.com/ReactiveX/rxjs/blob/f04fe72eba2f117041e1a9c1794f16473ecae697/src/internal/AsyncSubject.ts#L16
* _checkFinalizedStatuses is override
* if the source is completed
* then the last value is emitted
*
* only when the source of the data is completed
* the last value is produced to the observers
* https://github.com/ReactiveX/rxjs/blob/f04fe72eba2f117041e1a9c1794f16473ecae697/src/internal/AsyncSubject.ts#L33
*
* https://github.com/ReactiveX/rxjs/blob/040d951f327ca173d2be6bb82a200884c21f0718/spec/subjects/AsyncSubject-spec.ts
*
* */

import {
    AsyncSubject,
    BehaviorSubject,
    interval,
    map,
    Observable,
    startWith,
    Subject,
    take,
    tap,
    withLatestFrom
} from "rxjs";

const dataOverTime = interval(1000)
    .pipe(
        take(5)
    );


dataOverTime
    .subscribe({
        next: (v) => console.log('s1', v),
        complete: () => console.log('s1 is completed'),
    });


/*
* Different part of the application
* We want to know when all actions are done
*
* User completed all steps
* */

const lastValueOfTheDataOverTime = new AsyncSubject();

dataOverTime.subscribe(lastValueOfTheDataOverTime);

lastValueOfTheDataOverTime.subscribe({
    next: (v) => console.log('a1', v),
    complete: () => console.log('a1 is completed')
});

/*
* In the different part of the app we want to know if the user completed tasks.
* */

setTimeout(() => {
    lastValueOfTheDataOverTime.subscribe({
        next: (v) => console.log('a2', v),
        complete: () => console.log('a2 is completed')
    })
}, 10000);
//

/*
* We want to be notified once a user completed with form.
* */

// const userData$ = new BehaviorSubject({});
// const step$ = new Subject();
// const whenFormFilled$ = new AsyncSubject();
//
// step$.pipe(
//     withLatestFrom(userData$),
//     tap(([dataFromStep, user]) =>{
//         userData$.next({
//             ...user,
//             ...dataFromStep,
//         })
//     }),
// ).subscribe(whenFormFilled$)
//
//
// userData$.subscribe(
//     {
//         next: (user) => {
//             console.log('user', user)
//         }
//     }
// )
//
// step$.next({
//     name: 'Some Name'
// });
//
// setTimeout(() => {
//     step$.next({
//         age: 99
//     });
//
//     step$.complete();
// }, 1000);
//
// //
// whenFormFilled$.subscribe({
//     next: () => console.log('user finished registration'),
//     complete: () => console.log('isFormFilled is done')
// });
//
//
// setTimeout(() => {
//     whenFormFilled$.subscribe({
//         next: () => console.log('user is already finished registration'),
//         complete: () => console.log('isFormFilled is already done')
//     });
// }, 4000);

// Caching

// const httpReq = new Observable((subscriber) => {
//     console.log('making a request');
//    setTimeout(() => {
//        console.log('request is resolved')
//        subscriber.next('some data from the BE');
//        subscriber.complete();
//    }, 1000);
// });
// const cachedHttpReq = new AsyncSubject();
//
// httpReq.subscribe(cachedHttpReq);
// httpReq.subscribe();
// httpReq.subscribe();
//
// cachedHttpReq.subscribe({
//     next: (v) => console.log('cached 1', v)
// });
// cachedHttpReq.subscribe({
//     next: (v) => console.log('cached 1', v)
// });
// cachedHttpReq.subscribe({
//     next: (v) => console.log('cached 1', v)
// });
