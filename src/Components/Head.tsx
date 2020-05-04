import React from 'react'

type HeadType = {
  title: string
}

const Head:React.FC<HeadType> = ({title}) => {
  return (
    <head>
      <title>{title}</title>
    </head>
  )
}

export default Head