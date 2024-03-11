import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Chat = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Path
      fill="#0D0D0D"
      d="M3 9a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v16.5a3 3 0 0 1-3 3h-6.879l-4.06 4.06a1.5 1.5 0 0 1-2.122 0l-4.06-4.06H6a3 3 0 0 1-3-3V9Zm27 0H6v16.5h7.5a1.5 1.5 0 0 1 1.06.44L18 29.378l3.44-3.44a1.5 1.5 0 0 1 1.06-.439H30V9Z"
    />
    <Path
      fill="#0D0D0D"
      d="M20.25 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM26.25 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM14.25 17.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    />
  </Svg>
);
export default Chat;
