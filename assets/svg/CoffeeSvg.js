import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CoffeeSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M22.5 5.625a5.625 5.625 0 1 1-.234 11.244A7.503 7.503 0 0 1 15 22.5H9.375a7.5 7.5 0 0 1-7.5-7.5V4.687a.937.937 0 0 1 .938-.937h18.75a.937.937 0 0 1 .937.938v.937Zm0 1.875V15a3.75 3.75 0 1 0 0-7.5ZM2.812 24.375h18.75a.938.938 0 0 1 0 1.875H2.813a.938.938 0 0 1 0-1.875Zm.938-18.75V15a5.625 5.625 0 0 0 5.625 5.625H15A5.625 5.625 0 0 0 20.625 15V5.625H3.75Z"
    />
  </Svg>
);
export default CoffeeSvg;
