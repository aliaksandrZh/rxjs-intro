/*
* https://rxjs.dev/guide/subject
* An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers.
* While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable),
*
* in the next
*  for (const observer of this.currentObservers) {
          observer.next(value);
    }
*
* https://github.com/ReactiveX/rxjs/blob/7.8.0/src/internal/Subject.ts#L9-L158
*
*
* Useful when we need to share data between different subscribers.
* Data is produced outside of observable.
*  */

import {Observable, Subject} from "rxjs";

/* NO DEFAULT VALUE*/
const subject = new Subject();

/*
* Ignore the values which were emitted before subscribe
* */
subject.next(1);
subject.next(0);

subject.subscribe(x => console.log('s1', x));

subject.next(2);

setTimeout(() => {
    /* one more data consumer */
    subject.subscribe(x => console.log('s2', x));
    subject.next(3);

    subject.complete();
}, 1000);

/*
 *
 * compare with a default observable(unicast)
 * the code of observable is executed for a new subscriber
 *
 * with shareReplay it becomes a multicast
 * */
// const obs = new Observable((subscriber) => {
//     subscriber.next(Date.now());
//     subscriber.complete();
// });
//
// obs.subscribe(x => console.log('o1', x));
// setTimeout(() => {
//     obs.subscribe(x => console.log('o2', x));
// }, 1000);

