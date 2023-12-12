import callApi from '../../../../../server/api/definitions/src/api/test';

export default function Component() {
    console.log('Devices page!');
    callApi().then((response) => {
    });
    return <p>Devices page!</p>
}