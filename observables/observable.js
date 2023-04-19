/*
* https://rxjs.dev/guide/observable
* https://angular.io/guide/observables
* https://www.learnrxjs.io/learn-rxjs/operators/creation
* Observable is a core class that represents a stream of data that can be observed over time.
*
* https://yakovfain.files.wordpress.com/2017/08/ch5_producer_observable_subscribers.png
*
* To invoke the Observable and see its values, we need to subscribe to it.
*
* https://www.learnrxjs.io/
* */
import { Observable, of, from} from 'rxjs';

/*
* emit 1,2,3
* wait for 1 sec
* emit 4
* complete a subscriber
* */
const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    setTimeout(() => {
        subscriber.next(4);
        // subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
const t = observable.subscribe({
    next: (x) => console.log('got value ' + x),
    error: (err) => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
});
console.log('just after subscribe');



/*
* emit hi
* every 1 sec
* */
// const interval = new Observable((subscriber) => {
//     const id = setInterval(() => {
//         console.log('setInterval')
//         subscriber.next('hi');
//     }, 1000);
//
//     return () => clearInterval(id);
// })
//
// console.log('just before subscribe');
// const interval$ = interval.subscribe(
//     (x) => console.log('got value ' + x),
//     (err) => console.error('something wrong occurred: ' + err),
//      () => console.log('done'),
// );
// console.log('just after subscribe');

/*
* To stop observable we have to unsubscribe
*
* */
// setTimeout(() => interval$.unsubscribe(), 5000);

/*
 * done isn't called
 * interval still alive and will produce new values once a new observer is subscribed
 */
// setTimeout(() => interval.subscribe(x => console.log('new listener', x)), 7000);




/*
* Other ways of creating an observable
* */

// const myArray = [1, 2, 3];
// const myObservable$ = from(myArray);
// myObservable$.subscribe(x => console.log(x));

// const myArray = [1, 2, 3];
// const myObservable$ = of(myArray);
// myObservable$.subscribe(x => console.log(x));


// const myPromise = new Promise(resolve => {
//     setTimeout(() => {
//         console.log('Time to resolve PROMISE');
//         resolve('Hello World!');
//     }, 1000);
// });
// const myObservable$ = from(myPromise);
// setTimeout(() => myObservable$.subscribe(x => console.log(x)), 2000);

