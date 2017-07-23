import { schema } from 'normalizr';

const airport = new schema.Entity('airports', {}, { idAttribute: 'code' });
const city = new schema.Entity('cities', {}, { idAttribute: 'code' });
const aircraft = new schema.Entity('aircrafts', {}, { idAttribute: 'code' });
const tax = new schema.Entity('taxes');
const carrier = new schema.Entity('carriers', {}, { idAttribute: 'code' });

const data = new schema.Entity('data', {
    airport: [airport],
    city: [city],
    aircraft: [aircraft],
    tax: [tax],
    carrier: [carrier]
}, { idAttribute: 'kind' });

const tripOption = new schema.Entity('tripOptions');

const trips = new schema.Entity('trips', {
    data: data,
    tripOption: [tripOption]
}, { idAttribute: 'requestId' });

const response = new schema.Entity('responses', {
    trips: trips
}, { idAttribute: 'kind' })

export default response;