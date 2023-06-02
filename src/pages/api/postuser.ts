// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const resFromBack = await axios.post('http://164.90.213.182/users/', req.body)
  res.status(200).json({ data: 'what the heck?' })
};


// export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   console.log('api request')
//   // const resFromBack = await axios.post('http://164.90.213.182/users/', req.body)
//   res.status(200).json({ data: 'My data' })
// }
