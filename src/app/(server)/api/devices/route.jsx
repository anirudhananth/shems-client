import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic'
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req, res) {
    try {
        const session = getSession(req, res);
        const accessToken = session?.accessToken;

        // Make the external API call
        const externalApiResponse = await fetch(`http://localhost:8080/api/v1/device/1/get`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!externalApiResponse.ok) {
            throw new Error(`HTTP error! status: ${externalApiResponse.status}`);
        }

        const data = await externalApiResponse.json();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};