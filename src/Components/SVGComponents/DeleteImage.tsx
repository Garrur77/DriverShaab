import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DeleteImage = (props: SvgProps) => {
  return (
    <Svg
   
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="red"
      d="M5.464 2.43V.607A.607.607 0 0 1 6.071 0h4.858a.607.607 0 0 1 .607.607V2.43h4.857a.607.607 0 0 1 0 1.214H.607a.607.607 0 1 1 0-1.214h4.857Zm1.215 0h3.642V1.215H6.68V2.43ZM2.429 17a.607.607 0 0 1-.608-.607V3.643H15.18v12.75a.607.607 0 0 1-.608.607H2.43Zm4.25-3.643a.607.607 0 0 0 .607-.607V6.68a.607.607 0 0 0-1.215 0v6.07a.607.607 0 0 0 .608.607Zm3.642 0a.607.607 0 0 0 .608-.607V6.68a.607.607 0 0 0-1.215 0v6.07a.607.607 0 0 0 .607.607Z"
    />
  </Svg>
  )
}

export default DeleteImage



