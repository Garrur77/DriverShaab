import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LogoText = (props: SvgProps) => {
  return (
    <Svg
   
    width={155}
    height={17}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M-13-3h170v33H-13z" />
  </Svg>
  )
}

export default LogoText


