import Info from 'components/Info'
import Nav from 'components/Nav'
import { useInfo } from 'hooks/info'
import React from 'react'

const InfoPage = () => {
  const {
    bankInfo,
    bankInfoError,
    bankInfoLoading,
    refetch
  } = useInfo()

  return (
    <div>
      <Nav />
      {!bankInfoLoading ? (<Info
        {...{
          refetch,
          bankInfo,
          bankInfoError
        }}
      />) : (<h1>Loading...</h1>)}
    </div>
  )
}

export default InfoPage
