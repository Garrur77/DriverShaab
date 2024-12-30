import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ProfileEditIcon = (props: SvgProps) => {
  return (
    <Svg
    
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#F50"
      d="M14.82 0H5.18A5.18 5.18 0 0 0 0 5.18V19a1 1 0 0 0 1 1h13.8a5.18 5.18 0 0 0 5.2-5.18V5.18A5.18 5.18 0 0 0 14.82 0ZM10 14.62a1.73 1.73 0 0 1-.9.63L6.77 16A1.42 1.42 0 0 1 5 14.57v-2.52A1.86 1.86 0 0 1 5.34 11l2.8-3.78A5.56 5.56 0 0 0 10 9.73a5.37 5.37 0 0 0 2.86 1.11L10 14.62Zm4.63-6.26-.74 1a3.82 3.82 0 0 1-3.13-.75A4 4 0 0 1 9.2 5.74l.74-1a1.86 1.86 0 0 1 2.65-.38l1.67 1.29a2 2 0 0 1 .4 2.71h-.03Z"
    />
  </Svg>
  )
}

export default ProfileEditIcon





