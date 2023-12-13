import { callApi } from '@/app/(server)/api/devices/route';

export default function Component() {
    const callApi = async () => {
        await fetch('../../api/devices', {
            method: 'GET'
        });
    }
    callApi();
    // const res = await callApi();
    return <button>Devices page!</button>
}