import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

export async function callApi() {
    try {
        const session = await getSession();
        const accessToken = session?.accessToken;
        console.log(accessToken);

        const externalApiResponse = await fetch(`http://localhost:8080/api/v1/device/1/get`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!externalApiResponse.ok) {
            throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        console.log(data);
        return new Response(JSON.stringify(data));
    } catch (err) {
        console.error("WHAT: ", err);
    }
};