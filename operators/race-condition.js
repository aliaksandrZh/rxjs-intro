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
import {httpReq} from "../mock-req.js";

const someAction = () => console.log('some action is invoked after all requests are resolved');

const someAction$ = () => of('some action$ is invoked after all requests are resolved');


// wait for all requests
// action is a side effect
// forkJoin([
//     httpReq({timer: 1000}).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq({timer: 1000}).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         tap((v) => console.log(v)),
//         tap(() => someAction())
//     )
//     .subscribe();


// do action once 2 requests are resolved
// forkJoin([
//     httpReq({timer: 1000}).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq({timer: 2000}).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         switchMap(() => httpReq(5000).pipe(
//             finalize(() => console.log('req 3 is done'))
//         )),
//     )
//     .subscribe(x => console.log('req 3', x));

// forkJoin([
//     httpReq({timer: 1000}).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq({timer: 2000}).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         switchMap(() => httpReq({timer: 5000}).pipe(
//             finalize(() => console.log('req 3 is done'))
//         )),
//         switchMap(() => httpReq(timer: 500).pipe(
//             finalize(() => console.log('req 4 is done'))
//         )),
//     )
//     .subscribe(x => console.log('req 4', x));


// one by one request
    httpReq({timer: 1}).pipe(
        switchMap(() => httpReq({timer: 1000})),
        switchMap(() => httpReq({timer: 40})),
        switchMap(() => httpReq({timer: 500})),
    )
    .subscribe(x => console.log('req 4', x));

// Once any of the request is resolved
// combineLatest([
//     httpReq({timer: 1000}).pipe(
//         finalize(() => console.log('req 1 is done'))
//     ),
//     httpReq({timer: 500}).pipe(
//         finalize(() => console.log('req 2 is done'))
//     )])
//     .pipe(
//         tap(() => someAction())
//     )
//     .subscribe();




