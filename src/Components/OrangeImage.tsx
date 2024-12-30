import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const OrangeImage = (props: SvgProps) => {
  return (
   
 <Svg
    
    width={45}
    height={41}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M22.867 0h16.827a5 5 0 0 1 5 5v36H22.867V0Z"
      opacity={0.6}
    />
    <Path fill="url(#b)" d="M0 0h39.694a5 5 0 0 1 5 5v24H0V0Z" opacity={0.6} />
    <Defs>
      <LinearGradient
        id="a"
        x1={33.781}
        x2={33.781}
        y1={0}
        y2={41}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F50" />
        <Stop offset={1} stopColor="#F50" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={22.347}
        x2={22.347}
        y1={0}
        y2={29}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F50" />
        <Stop offset={1} stopColor="#F50" />
      </LinearGradient>
    </Defs>
  </Svg>
  )
}

export default OrangeImage



