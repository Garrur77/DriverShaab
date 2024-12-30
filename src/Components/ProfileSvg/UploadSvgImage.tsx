import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UploadSvgImage = (props: SvgProps) => {
  return (
    <Svg
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      stroke="#3087D7"
      strokeLinecap="round"
      d="M10.75 5.55c1.414.009 2.18.071 2.679.57C14 6.693 14 7.612 14 9.45v.65c0 1.838 0 2.757-.571 3.329-.571.57-1.49.57-3.329.57H4.9c-1.838 0-2.758 0-3.329-.57C1 12.857 1 11.938 1 10.098v-.65c0-1.838 0-2.757.571-3.328.5-.5 1.265-.562 2.679-.57"
    />
    <Path
      stroke="#3087D7"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 9.45V1m0 0 1.95 2.275M7.5 1 5.55 3.275"
    />
  </Svg>
  )
}

export default UploadSvgImage
