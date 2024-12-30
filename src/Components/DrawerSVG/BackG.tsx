import * as React from "react"
import Svg, { SvgProps, Path, Mask, G } from "react-native-svg"

const BackG = (props: SvgProps) => {
  return (
    <Svg
  
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path fill="red" fillOpacity={0.01} d="M0 0h30v30H0z" />
    <Path
      fill="#D3D4ED"
      fillRule="evenodd"
      d="m16.31 3.42 8.77 8.42a1.5 1.5 0 0 1-1.04 2.58h-.77V24.5a2.5 2.5 0 0 1-2.5 2.5h-11a2.5 2.5 0 0 1-2.5-2.5V14.42h-.776a1.5 1.5 0 0 1-1.035-2.58l8.77-8.42a1.5 1.5 0 0 1 2.08 0ZM13.27 18.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={21}
      height={24}
      x={5}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m16.31 3.42 8.77 8.42a1.5 1.5 0 0 1-1.04 2.58h-.77V24.5a2.5 2.5 0 0 1-2.5 2.5h-11a2.5 2.5 0 0 1-2.5-2.5V14.42h-.776a1.5 1.5 0 0 1-1.035-2.58l8.77-8.42a1.5 1.5 0 0 1 2.08 0ZM13.27 18.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#C1C0C9" d="M0 0h30v30H0z" />
    </G>
  </Svg>
  )
}

export default BackG


