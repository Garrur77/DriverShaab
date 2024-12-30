import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BankSvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={63}
    height={63}
    fill="none"
    {...props}
  >
    <Path
      fill="#4891FF"
      d="M63 16.52c-.776 1.638-2.086 2.1-3.855 2.097-18.477-.045-36.953-.045-55.43 0C1.977 18.62.756 18.08.003 16.52v-1.68c.918-.725 1.744-1.64 2.772-2.142 3.046-1.487 6.173-2.803 9.262-4.2C18.294 5.67 24.547 2.834 30.8 0h1.4c.194.115.378.246.583.339 9.25 4.166 18.515 8.299 27.735 12.533.966.445 1.66 1.484 2.481 2.248v1.4ZM.003 59.36c.747-1.677 2.1-2.108 3.841-2.106 18.46.034 36.922.034 55.382-.002 1.856-.003 3.158.57 3.771 2.388v1.12L60.757 63H2.24L0 60.76c.003-.468.003-.932.003-1.4ZM7.14 49.706V24.223c-.412-.101-.913-.081-1.165-.322-.395-.381-.927-1.005-.837-1.403.106-.482.759-.893 1.249-1.22.23-.152.635-.043.963-.043h48.152c.28 0 .627-.103.826.023.566.364 1.07.82 1.599 1.243-.443.515-.86 1.053-1.339 1.529-.131.131-.442.08-.742.126V49.71c.3.04.602.076.905.123 1.674.264 2.738 1.52 2.606 3.08-.128 1.53-1.26 2.57-2.945 2.576-6.765.026-13.532.02-20.296.02-9.752 0-19.504 0-29.256-.014-2.226-.003-3.59-1.476-3.203-3.4.282-1.382 1.254-2.068 3.483-2.39Zm14.26.075V24.17h-8.42V49.78h8.42Zm14.315-.003v-25.62H27.26v25.62h8.455Zm14.29.003V24.17h-8.432V49.78h8.433Z"
    />
  </Svg>
)
export default BankSvg
