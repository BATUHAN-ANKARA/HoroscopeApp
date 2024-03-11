import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const Thunder = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M19.5 4.5V15h9l-12 16.5V21h-9l12-16.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Thunder;
