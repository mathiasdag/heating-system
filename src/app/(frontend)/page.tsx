import { getPayload } from 'payload'
import config from '@/payload.config'
import FeatureBlock from '@/components/blocks/FeatureBlock'
import React from 'react'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch the homepage (by slug)
  const { docs: [page] = [] } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'hem' } },
  })

  return (
    <div>
      {page?.layout?.map((block: any, i: number) => {
        switch (block.blockType) {
          case 'feature':
            return <FeatureBlock key={i} {...block} />
          // Add more cases for other block types
          default:
            return null
        }
      })}
    </div>
  )
}
