import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
import { WIDTH } from "../../../Helpers/Dimentions"
import { ANDROID } from "../../../Helpers/Platform"

const MapImage = (props: SvgProps) => {
  return (
    <Svg
    width={ ANDROID?  WIDTH*0.69 : WIDTH*0.69}
    height={178}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h270v178H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use
          xlinkHref="#b"
          transform="matrix(.00123 0 0 .00187 -.195 -1.858)"
        />
      </Pattern>
      <Image
        id="b"
        width={1125}
        height={2556}
      />
    </Defs>
  </Svg>
  )
}

export default MapImage
