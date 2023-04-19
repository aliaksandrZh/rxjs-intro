import {Observable} from "rxjs";

export const httpReq = ({ timer, throwError}) => new Observable((subscriber) => {
    const req = `req://${timer}`;
    console.log('Making a request... ', req);
    setTimeout(() => {
        if (throwError) {
            console.log('ERROR ', req);
            subscriber.error(`Something went wrong ${req}`);
            return;
        }
        console.log('Resolved', req)
        subscriber.next(req);
        subscriber.complete();
    }, timer);
});
