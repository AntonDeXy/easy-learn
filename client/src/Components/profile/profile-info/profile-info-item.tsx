import React from 'react'

type ProfileInfoItemPropsType = {
  label: string
  value: string | number
}

const ProfileInfoItem: React.FC<ProfileInfoItemPropsType> = ({
  label, value
}) => {
  return (
    <div>
    <span className='label'>{label}:</span>
    <span>{value}</span>
  </div>
  )
}

export default ProfileInfoItem