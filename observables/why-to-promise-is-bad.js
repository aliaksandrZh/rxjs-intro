/*
* Observable vs Promise
* https://angular.io/guide/comparing-observables
* https://www.syncfusion.com/blogs/post/angular-promises-versus-observables.aspx
* */

import {Observable} from "rxjs";

/*
* We have an async action
* In 3 sec the id will be returned
* */
const asyncAction = new Observable((subscriber) => {
    const _id = Date.now();
    console.log(_id);

    const timeout = setTimeout(() => {
        console.log('setTimeout');

        subscriber.next({
            id: _id,
        });
        subscriber.complete();
    },3000);

    return () => clearTimeout(timeout);
});

const asyncAction$ = asyncAction
    .subscribe(
        data => console.log('received', data),
        error => console.error(error),
        () => console.log('completed')
    );

/*
* What if we no longer want to wait for the id?
* We want to drop it when we didn't get an answer in 2 sec
* */

// setTimeout(() => {
//     asyncAction$.unsubscribe();
//     console.log(asyncAction$);
// }, 2000);


/*
* What if we no longer want to wait for the id?
* We want to drop it when we didn't get an answer in 2 sec
* https://github.com/ReactiveX/rxjs/blob/0a4e8bf12b59b80b8012b8e8da044d6b48d865f5/src/internal/Observable.ts#L467
* https://rxjs.dev/deprecations/to-promise
* */

// const asyncActionPromise$ = asyncAction.toPromise()
//     .then(x => console.log('asyncActionPromise$', x))
//     .finally(() => console.log('asyncActionPromise$ is done'));

/*
* How a Promise can be aborted
* */

// const controller = new AbortController();
// const signal = controller.signal;
//
// const promise = new Promise((resolve, reject) => {
//     const timerId = setTimeout(() => {
//         resolve('Promise is resolved');
//     }, 2000);
//
//     // Abort the promise if the controller's signal is aborted
//     signal.addEventListener('abort', () => {
//         clearTimeout(timerId);
//         reject(new Error('Promise is aborted'));
//     });
// });
//
// promise
//     .then(data => console.log(promise))
//     .catch(error => console.error(error))
//     .finally(() => console.log('promise is done'))
//
// setTimeout(() => {
//     controller.abort();
// }, 1000);


/*
* emit id each 1 sec
*
* */
// const asyncActionOverTime = new Observable((subscriber) => {
//     const _id = Date.now();
//
//     const interval = setInterval(() => {
//         console.log('setInterval', _id);
//
//         subscriber.next({
//             id: _id,
//         });
//     },1000);
//
//     setTimeout(() => {
//         subscriber.complete();
//     }, 7000);
//
//     return () => clearInterval(interval);
// });

// const asyncActionOverTime$ = asyncActionOverTime.subscribe(
//     x => console.log('asyncActionOverTime', x),
//     () => {},
//     () => console.log('asyncActionOverTime is done')
// );

/* Stop listening */
// setTimeout(() => {
//     asyncActionOverTime$.unsubscribe();
//     console.log(asyncActionOverTime$);
// }, 5000);

/*
* With promise we are not able to unsubscribe
* */
// const asyncActionOverTimePromise$ = asyncActionOverTime.toPromise()
//     .then(x => console.log('asyncActionOverTimePromise$', x));

/* Our Promise is pending
* it will be resolved and value will be emitted only whe the source observable is completed */
// setTimeout(() => {
//     console.log(asyncActionOverTimePromise$)
// }, 5000);

