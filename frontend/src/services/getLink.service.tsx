import { type Link } from "../types";
const api_url = 'http://localhost:3000/';

export const callCreateLink = async (url: string) :Promise<Link> => {
    const res = await fetch(api_url, {
        method: "POST",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            original_url: url
        })
    })

    const linkData = await res.json()
    return linkData
}