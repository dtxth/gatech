import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from "next/config";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { publicRuntimeConfig } = getConfig();
    const { method } = req
    let data;
    switch (method) {
      case 'POST':
        data = await fetch('http://' + publicRuntimeConfig.API_URL  + `/api/v1/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        })  
        return res.status(data.status).json(await data.json());        
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)    
    }
}
