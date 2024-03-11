import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Eye = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path fill="#0D0D0D" d="M22.5 18a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    <Path
      fill="#0D0D0D"
      d="M32.842 17.33C29.604 10.854 23.855 7.5 18 7.5S6.396 10.854 3.158 17.33a1.5 1.5 0 0 0 0 1.34C6.396 25.146 12.145 28.5 18 28.5s11.604-3.355 14.842-9.83a1.5 1.5 0 0 0 0-1.34ZM18 25.5c-4.453 0-9.003-2.431-11.806-7.5 2.803-5.069 7.353-7.5 11.806-7.5 4.453 0 9.003 2.431 11.805 7.5-2.802 5.069-7.352 7.5-11.805 7.5Z"
    />
  </Svg>
);
export default Eye;
