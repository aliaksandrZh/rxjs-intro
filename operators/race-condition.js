import {
    finalize,
    forkJoin,
    Observable,
    tap,
    switchMap,
    of,
    combineLatest,
    map,
    mergeMap,
    take,
    interval, concatMap, exhaustMap
} from "rxjs";

const someAction = () => console.log('some action is invoked after all requests are resolved');

const someAction$ = () => of('some action$ is invoked after all requests are resolved');

const httpReq = (timer = 1000) => new Observable((subscriber) => {
    setTimeout(() => {
        subscriber.next(`req://${timer}`);
        subscriber.complete();
    }, timer);
});

// wait for all requests
// action is a side effect
// forkJoin([
//     httpReq(1000).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq(2000).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         tap((v) => console.log(v)),
//         tap(() => someAction())
//     )
//     .subscribe();


// do action once 2 requests are resolved
// forkJoin([
//     httpReq(1000).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq(2000).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         switchMap(() => httpReq(5000).pipe(
//             finalize(() => console.log('req 3 is done'))
//         )),
//     )
//     .subscribe(x => console.log('req 3', x));

// forkJoin([
//     httpReq(1000).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq(2000).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         switchMap(() => httpReq(5000).pipe(
//             finalize(() => console.log('req 3 is done'))
//         )),
//         switchMap(() => httpReq(100).pipe(
//             finalize(() => console.log('req 4 is done'))
//         )),
//     )
//     .subscribe(x => console.log('req 4', x));


// one by one request
//     httpReq(1000).pipe(
//         finalize(() => console.log('req 1 is done')),
//         switchMap(() => httpReq(2000).pipe(
//             finalize(() => console.log('req 2 is done'))
//         )),
//         switchMap(() => httpReq(1500).pipe(
//             finalize(() => console.log('req 3 is done'))
//         )),
//         switchMap(() => httpReq(500).pipe(
//             finalize(() => console.log('req 4 is done'))
//         )),
//     )
//     .subscribe(x => console.log('req 4', x));

// Once any of the request is resolved
// combineLatest([
//     httpReq(1000).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq(2000).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         tap(() => someAction())
//     )
//     .subscribe();




