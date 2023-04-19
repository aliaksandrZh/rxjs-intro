// https://rxjs.dev/guide/operators
import {interval, take, mergeMap, map, switchMap, exhaustMap, concatMap} from "rxjs";


const outer$ = interval(1000).pipe(take(5));
/*
*  mergeMap emits the values from all the inner Observables as soon as they are emitted,
*  without waiting for any of them to complete.
* */
// outer$.pipe(
//     mergeMap((x) =>
//         interval(400).pipe(
//             take(15),
//             map(y => `outer ${x} inner ${y}`)
//         )
//     )
// ).subscribe(console.log);

/*
* when you want to preserve the order of the emitted values and only subscribe to
* the next inner Observable after the previous one has completed,
* */
// outer$.pipe(
//     concatMap((x) =>
//         // create a new obs only when inner obs is completed
//         interval(400).pipe(
//             take(15),
//             map(y => `outer ${x} inner ${y}`)
//         )
//     )
// ).subscribe(console.log);

/*
* When you use exhaustMap, it will ignore any new inner Observables until the current inner Observable has completed.
* Only when the current inner Observable completes exhaustMap allow the next inner Observable to be subscribed to.
* */
// outer$.pipe(
//     exhaustMap((x) =>
//         // create a new obs only when inner obs is completed
//         interval(400).pipe(
//             take(5),
//             map(y => `outer ${x} inner ${y}`)
//         )
//     )
// ).subscribe(console.log);

/*
* When you use switchMap, it will cancel any previous inner Observables and only emit
* the values from the latest inner Observable.
* */
outer$.pipe(
    switchMap((x) =>
        interval(300).pipe(
            take(15),
            map(y => `outer ${x} inner ${y}`)
        )
    )
).subscribe(console.log);

