// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const events = require('./data.json')
type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const singleEvent = events['events'].filter((evt : {slug: string}) => evt.slug === req.query.slug)
  
  res.status(200).json(singleEvent) //singleEvent
 
  
  
}