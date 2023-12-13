import { callApi } from '@/app/(server)/api/devices/route';

export default async function Component() {
    await callApi();
    // const res = await callApi();
    return <button>Devices page!</button>
}