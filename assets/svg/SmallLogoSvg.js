import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SmallLogoSvg = props => (
  <Svg
    width={35}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.57 5.267c.45-.022.881.075 1.296.29.414.205.72.485.915.84.22.377.323.749.311 1.115 0 .366-.115.765-.345 1.196a5.886 5.886 0 0 1-.329.517c-.103.161-.23.328-.38.5-.138.173-.305.361-.5.566-.196.194-.432.415-.709.662a25.515 25.515 0 0 1-2.056 1.697c-.714.549-1.44 1.044-2.176 1.486-.738.442-1.457.824-2.16 1.147-.702.323-1.353.565-1.952.727-.645.172-1.175.21-1.59.113-.403-.097-.673-.29-.811-.582-.127-.28-.11-.635.051-1.066.162-.43.496-.894 1.002-1.39l.588-.58-.017-.518v-.323c0-.086.011-.188.034-.307l.086-.404a24.502 24.502 0 0 1 .466-1.632c.116-.366.237-.721.364-1.066.126-.355.253-.694.38-1.017.126-.334.253-.636.38-.905l.432-.905c.15-.323.3-.63.449-.92.15-.291.294-.555.432-.792s.253-.431.345-.582c.092-.15.173-.275.242-.371a1.06 1.06 0 0 0 .104-.178c0-.01-.029.005-.087.048l-.224.13c-.3.204-.61.43-.933.678-.322.248-.633.506-.933.776-.3.269-.582.533-.846.791a8.08 8.08 0 0 0-.657.711 7.88 7.88 0 0 0-.345.42c-.081.108-.144.2-.19.275a.494.494 0 0 0-.087.177c0 .043.006.087.017.13.023.086.012.15-.034.193-.035.033-.086.049-.156.049a.592.592 0 0 1-.207-.097.493.493 0 0 1-.155-.21c-.081-.183-.058-.404.069-.662.138-.27.409-.636.812-1.099a17.792 17.792 0 0 1 2.798-2.682C5.266 1.45 6.245.878 7.201.501c.45-.183.847-.313 1.192-.388A5.094 5.094 0 0 1 9.482 0c1.14 0 2.004.382 2.591 1.147.138.183.225.323.26.42.034.086.057.215.068.388.023.41-.086.83-.328 1.26-.242.42-.64.888-1.192 1.405l-.726.679.415-.032Zm-.052 4.458c.323-.301.593-.576.812-.823.23-.248.415-.48.553-.695.138-.216.236-.415.294-.598a1.68 1.68 0 0 0 .103-.565c0-.216-.04-.377-.12-.485-.07-.118-.22-.232-.45-.34a1.424 1.424 0 0 0-.38-.096 3.966 3.966 0 0 0-.622-.032 5.275 5.275 0 0 0-1.658.258c-.277.086-.565.2-.864.34-.288.129-.599.29-.933.484a8.167 8.167 0 0 1-.622.34 4.755 4.755 0 0 1-.484.225l-.38.162a1.404 1.404 0 0 0-.276.145c-.265.162-.397.119-.397-.129 0-.097-.023-.156-.07-.178-.046-.043-.069-.118-.069-.226 0-.032.012-.064.035-.097a.601.601 0 0 1 .12-.145c.058-.054.145-.124.26-.21.115-.086.27-.194.466-.323C7.15 5.81 8.18 5.04 8.93 4.427c.748-.625 1.272-1.142 1.572-1.551.369-.507.547-.9.536-1.18 0-.29-.133-.49-.398-.597-.253-.108-.604-.14-1.054-.097a8.65 8.65 0 0 0-1.382.258 3.927 3.927 0 0 0-.5.162c-.185.064-.375.14-.57.226-.197.086-.392.178-.588.274a6.683 6.683 0 0 0-.501.259l-.311.194.19.064c.046.022.11.054.19.097.08.043.155.092.224.146.07.054.127.107.173.161.058.043.087.076.087.097 0 .022-.035.108-.104.259-.058.15-.133.323-.225.517-.126.258-.242.506-.345.743l-.294.727c-.092.258-.196.544-.31.856-.116.302-.243.652-.38 1.05-.116.323-.248.716-.398 1.18a99.67 99.67 0 0 1-.415 1.324c-.127.42-.236.787-.328 1.099-.092.323-.138.506-.138.55 0 .02.046.015.138-.017a1.89 1.89 0 0 0 .328-.162c.634-.323 1.33-.619 2.09-.888a27.916 27.916 0 0 1 3.145-.937c.15-.032.27-.049.363-.049a.41.41 0 0 1 .241.033.49.49 0 0 1 .19.113c.046.043.081.086.104.129.035.032.046.06.035.08 0 .022-.11.076-.329.162-.207.087-.46.189-.76.307-.31.119-.553.216-.725.291-.173.065-.352.135-.536.21a53.77 53.77 0 0 0-.656.275c-.242.118-.594.28-1.054.484-.795.356-1.463.679-2.004.97-.53.29-.893.527-1.089.71a2.87 2.87 0 0 1-.276.194.883.883 0 0 1-.225.146 2.124 2.124 0 0 0-.449.323c-.172.162-.345.334-.518.517a5.918 5.918 0 0 0-.45.565c-.114.183-.172.313-.172.388 0 .097.323.043.968-.162.172-.053.362-.118.57-.193a25.9 25.9 0 0 0 .639-.243c.219-.086.426-.177.622-.274.196-.087.368-.167.518-.243.53-.269 1.071-.57 1.624-.904a31.531 31.531 0 0 0 1.624-1.05c.541-.367 1.06-.749 1.555-1.147.495-.388.944-.77 1.347-1.147Zm6.615-.638c-.214.27-.514.612-.898 1.026a9.18 9.18 0 0 1-1.33 1.228c-.426.323-.772.5-1.037.533a.58.58 0 0 1-.276 0c-.046-.01-.133-.07-.26-.178-.264-.226-.425-.533-.483-.92-.058-.377-.006-.808.156-1.293.08-.248.172-.506.276-.775.115-.27.23-.523.345-.76.116-.237.225-.447.329-.63.103-.193.19-.334.259-.42.057-.075.104-.113.138-.113.035-.01.104.011.207.065.162.075.265.156.311.242.046.086.052.216.018.388a15.78 15.78 0 0 1-.208.646 186.668 186.668 0 0 0-.76 2.246 5.53 5.53 0 0 0-.173.63c-.023.14-.028.22-.017.242.012.032.046.049.104.049a.836.836 0 0 0 .242-.065 2.99 2.99 0 0 0 .38-.178c.138-.075.276-.161.414-.258.15-.086.288-.173.415-.259.138-.107.288-.237.45-.387.172-.151.339-.307.5-.469.173-.162.334-.323.484-.485.117-.134.223-.258.319-.373a.66.66 0 0 1 .091-.24c.08-.151.19-.302.328-.453.15-.15.317-.296.501-.436.185-.15.375-.275.57-.372 1.233-.603 2.074-.635 2.523-.097.184.216.161.55-.07 1.002-.218.452-.604.953-1.157 1.502l-.449.42c-.173.162-.34.313-.501.453l-.553.5.328-.016c.093-.01.317-.021.674-.032l1.192-.032c.38 0 .68-.006.899-.016.177 0 .323-.003.439-.01a1.834 1.834 0 0 1-.046-.216c-.057-.377-.005-.808.156-1.293.08-.248.173-.506.276-.775.116-.27.23-.523.346-.76.115-.237.224-.447.328-.63a2.91 2.91 0 0 1 .26-.42c.057-.075.103-.113.138-.113.034-.01.103.011.207.065.161.075.265.156.31.242.047.086.053.216.018.388-.023.086-.092.301-.207.646a395.438 395.438 0 0 0-.76 2.246 5.543 5.543 0 0 0-.173.63l-.002.01.005.006c.092.086.139.14.139.162 0 .02-.024.057-.072.112h.016a.836.836 0 0 0 .242-.064c.115-.043.242-.102.38-.178.138-.075.277-.161.415-.258.15-.086.288-.173.414-.259.139-.107.288-.237.45-.387.158-.139.312-.282.461-.43.045-.187.105-.394.18-.62.116-.324.254-.668.415-1.034.161-.367.346-.749.553-1.148.219-.409.449-.818.69-1.227.162-.259.289-.458.38-.598.105-.15.19-.253.26-.307.07-.054.133-.07.19-.048.058.021.133.064.225.129.092.075.144.134.155.177.012.033-.006.124-.052.275a5.177 5.177 0 0 1-.207.533c-.104.259-.225.539-.363.84-.368.797-.65 1.438-.846 1.923-.185.484-.334.91-.45 1.276-.057.183-.109.345-.155.485-.035.129-.046.199-.035.21.012.021.052-.006.121-.081a3.3 3.3 0 0 0 .346-.42c.161-.205.363-.474.605-.808.241-.334.535-.748.88-1.244.185-.27.335-.484.45-.646.127-.172.236-.318.328-.436.092-.119.184-.226.276-.323.104-.097.225-.216.363-.356.184-.183.305-.29.363-.323.058-.032.138-.032.242 0 .334.108.5.286.5.533 0 .054-.022.167-.068.34a5.61 5.61 0 0 1-.173.533l-.155.484c-.047.14-.07.216-.07.227 0 .021.046-.022.139-.13.092-.107.201-.242.328-.404.3-.366.576-.667.83-.904.264-.237.471-.377.621-.42.253-.097.513-.022.777.226.081.075.133.161.156.258.034.097.034.232 0 .404a5.256 5.256 0 0 1-.19.63c-.092.259-.225.582-.397.97-.242.581-.41.985-.501 1.211-.092.226-.127.35-.104.372.012.01.07-.027.173-.113.103-.087.224-.194.363-.323.15-.13.299-.27.449-.42a5.4 5.4 0 0 0 .38-.42c.115-.13.236-.28.363-.453.126-.183.218-.334.276-.452.115-.216.213-.35.294-.404.092-.065.16-.043.207.065.012.043-.012.134-.07.274-.045.14-.114.307-.206.501a9.272 9.272 0 0 1-.311.565c-.116.194-.225.361-.329.501a7.661 7.661 0 0 1-.57.663 5.718 5.718 0 0 1-.587.565 3.785 3.785 0 0 1-.536.404c-.16.108-.288.162-.38.162-.023 0-.069-.027-.138-.081a1.358 1.358 0 0 1-.207-.162 3.898 3.898 0 0 1-.208-.21.565.565 0 0 1-.138-.178c-.127-.226-.132-.538-.017-.937.115-.409.38-.996.795-1.76.115-.205.224-.404.328-.598.104-.205.178-.35.224-.436l.156-.291-.19.113a3.597 3.597 0 0 0-.64.565 13.213 13.213 0 0 0-1.4 1.81 7.388 7.388 0 0 0-.448.84c-.127.28-.247.517-.363.71-.115.194-.213.318-.293.372a.318.318 0 0 1-.173.016.902.902 0 0 1-.225-.113c-.276-.194-.414-.425-.414-.694.011-.184.092-.485.242-.905.15-.42.357-.953.622-1.6.08-.204.115-.306.103-.306-.011 0-.063.07-.155.21-.092.129-.208.296-.346.5-.138.205-.293.431-.466.679-.161.248-.317.49-.467.727-.38.614-.72 1.082-1.019 1.405-.3.334-.524.501-.674.501a.311.311 0 0 1-.12-.048.866.866 0 0 1-.57-.63 1.848 1.848 0 0 1-.02-.627 8.9 8.9 0 0 1-1.193 1.079c-.426.323-.771.5-1.036.533a.58.58 0 0 1-.277 0c-.046-.01-.132-.07-.259-.178a1.352 1.352 0 0 1-.184-.19l-.175.029c-.15.021-.288.038-.415.048a2.483 2.483 0 0 1-.414.033c-.15.01-.317.016-.501.016-.185 0-.415-.006-.691-.016-.277-.011-.507-.016-.692-.016h-.449c-.126.01-.236.021-.328.032-.092.01-.178.027-.259.048-.23.054-.466.135-.708.243a4.99 4.99 0 0 0-.622.355 2.629 2.629 0 0 1-.242.178c-.023.01-.064-.011-.121-.065a.195.195 0 0 1-.07-.145c0-.054.047-.135.14-.243.08-.107.212-.253.396-.436.185-.183.444-.425.778-.727.368-.344.72-.684 1.054-1.018.334-.333.564-.57.69-.71.162-.183.306-.361.433-.534.126-.183.23-.344.31-.484.093-.151.156-.275.19-.372.047-.097.052-.161.018-.194-.023-.021-.092-.021-.207 0a2.68 2.68 0 0 0-.398.081 9.32 9.32 0 0 0-1.002.356c-.253.118-.449.226-.587.323a3.085 3.085 0 0 0-.501.42c-.254.237-.42.371-.501.404a.103.103 0 0 1-.1-.025ZM15.06 5.929c-.287-.29-.391-.598-.31-.92.057-.216.15-.35.276-.405.127-.054.305-.037.535.049.415.15.651.344.709.581.069.237-.058.485-.38.743-.162.13-.3.194-.415.194-.115-.01-.253-.091-.415-.242Zm8.959 0c-.288-.29-.392-.598-.311-.92.058-.216.15-.35.276-.405.127-.054.305-.037.536.049.415.15.65.344.708.581.07.237-.057.485-.38.743-.161.13-.3.194-.415.194-.115-.01-.253-.091-.414-.242Zm-9.762 7.206c.023-.064-.029-.15-.155-.258a.769.769 0 0 0-.242-.146 1.013 1.013 0 0 0-.311-.032c-.208 0-.403.038-.588.113-.414.194-.8.507-1.157.937-.357.42-.691.889-1.002 1.406-.3.517-.582 1.04-.847 1.567a23.535 23.535 0 0 1-.984 1.777c-.093.15-.19.312-.294.485-.104.172-.213.35-.328.533-.115.183-.225.355-.329.517-.103.161-.213.328-.328.5a8.35 8.35 0 0 0-.31.501l-.26.453c-.08.129-.138.231-.173.307-.08.14-.178.301-.293.484-.116.183-.23.361-.346.534a5.098 5.098 0 0 1-.31.436c-.093.129-.162.21-.208.242-.023.021-.115.054-.277.097-.15.043-.322.086-.518.13-.564.128-1.06.263-1.486.403a7.05 7.05 0 0 0-1.019.42c-.253.14-.414.275-.484.404-.08.13-.057.248.07.355.057.054.109.076.155.065.035 0 .121-.038.26-.113a3.69 3.69 0 0 1 .656-.275c.265-.086.61-.183 1.036-.29.242-.054.426-.092.553-.114.138-.021.219-.016.242.017.023.032 0 .102-.07.21a4.57 4.57 0 0 1-.293.452 14.94 14.94 0 0 1-.57.743c-.207.28-.42.55-.64.808-.218.27-.425.511-.621.727-.184.226-.34.404-.467.533-.16.15-.276.253-.345.307-.07.054-.133.075-.19.064-.092-.032-.167.006-.225.114-.057.118-.08.204-.069.258.012.065.052.13.121.194.046.032.092.06.138.08.046.033.08.05.104.05.138 0 .328-.098.57-.292.253-.194.541-.463.864-.807.334-.345.69-.754 1.071-1.228.392-.463.783-.97 1.175-1.519l.69-.953.554-.065c.15-.021.362-.048.639-.08l.812-.097c.265-.022.495-.043.69-.065.208-.01.318-.01.329 0a.498.498 0 0 1-.017.13 2.99 2.99 0 0 0-.035.145 5.24 5.24 0 0 1-.034.177c-.058.259-.116.56-.173.905-.046.356-.098.7-.156 1.034-.046.345-.086.657-.12.937-.024.29-.035.495-.035.614v.307a.72.72 0 0 0 .017.178.378.378 0 0 0 .07.097.368.368 0 0 0 .12.097c.104.075.19.134.26.177a1.002 1.002 0 0 0 .501.13c.091.01.2.01.328 0 .287-.022.466-.06.535-.114.08-.043.098-.14.052-.29a1.649 1.649 0 0 1-.07-.356c-.01-.172-.028-.36-.05-.565a3.372 3.372 0 0 1-.018-.84 7.2 7.2 0 0 1 .069-.534c.046-.204.104-.49.173-.856l.276-1.486.38.016c.115 0 .23.006.346.016.115.022.201.043.259.065.23.065.363.043.397-.065.046-.097-.023-.231-.207-.404a1.126 1.126 0 0 0-.588-.274 5.114 5.114 0 0 1-.276-.065c-.08-.021-.127-.043-.138-.064-.012-.011-.006-.097.017-.259.035-.162.075-.371.121-.63s.104-.55.173-.872c.069-.323.144-.657.224-1.002l.19-.84c.058-.259.11-.512.156-.76.058-.247.115-.511.173-.791.057-.28.12-.608.19-.985.15-.722.293-1.314.432-1.778.15-.463.305-.84.466-1.13.127-.216.219-.361.276-.437.07-.075.185-.156.346-.242.23-.118.357-.21.38-.275ZM10.75 17.61c-.058.248-.12.507-.19.776l-.225.872c-.08.313-.16.62-.242.921-.069.29-.138.571-.207.84a21.2 21.2 0 0 0-.138.663 22.76 22.76 0 0 0-.225.937c-.057.258-.097.393-.12.404-.012.01-.121.032-.329.064l-.69.08c-.266.022-.525.05-.778.082a9.505 9.505 0 0 0-.467.048l-.259.049.104-.146c.023-.043.069-.124.138-.242.08-.119.161-.242.242-.372l.57-.888c.08-.119.144-.226.19-.323a.91.91 0 0 0 .086-.162.91.91 0 0 1 .087-.162l.242-.371c.103-.162.253-.41.449-.743.196-.334.397-.684.605-1.05.218-.377.426-.738.621-1.083.208-.344.369-.619.484-.824.092-.172.173-.317.242-.436.07-.118.11-.172.121-.161l-.035.161a13.29 13.29 0 0 1-.103.436c-.046.173-.104.383-.173.63Zm8.449 5.93c0-.367.05-.809.152-1.324-.12.002-.26.007-.424.015-.22 0-.41.005-.57.016l-.605.049-.26.274a5.929 5.929 0 0 1-.742.727 3.457 3.457 0 0 1-.674.42 3.521 3.521 0 0 1-.812.242c-.3.054-.53.07-.69.049-.07-.022-.122-.01-.156.032-.035.043-.098.173-.19.388-.242.603-.484.996-.726 1.18-.242.182-.518.188-.83.015-.195-.107-.276-.36-.241-.759.023-.388.121-.85.294-1.39.161-.549.368-1.14.622-1.776.264-.636.53-1.25.794-1.842.265-.592.513-1.136.743-1.632.23-.495.397-.877.501-1.147.08-.194.184-.43.311-.71.127-.28.248-.55.363-.808.127-.259.236-.485.328-.679.092-.194.15-.296.173-.307.046-.032.104-.032.173 0 .08.022.155.06.224.113.07.043.127.097.173.162.046.064.07.13.07.194 0 .032-.024.129-.07.29l-.155.534c-.058.172-.144.436-.26.791-.103.356-.218.722-.345 1.099l-.328 1.066-.208.646-.051.227.276-.162a1.92 1.92 0 0 1 .31-.162c.128-.053.243-.091.346-.113.162-.054.277-.08.346-.08.08 0 .178.016.294.048.276.075.5.248.673.517.185.258.277.555.277.889 0 .118-.029.29-.087.516a2.7 2.7 0 0 1-.19.582c-.023.054.012.086.104.097.092.01.322.021.691.032.256.008.454.02.595.034l.01-.044.013-.054c.16-.7.409-1.503.742-2.408.127-.355.242-.667.346-.936.115-.28.23-.539.346-.776.115-.248.23-.48.345-.695.127-.226.27-.457.432-.694.311-.485.53-.797.656-.937.139-.151.254-.216.346-.194.115.043.23.118.346.226.115.097.172.188.172.275 0 .032-.052.161-.155.387a8.004 8.004 0 0 1-.363.727c-.196.356-.363.679-.501.97l-.397.84c-.116.269-.225.538-.329.808-.103.269-.213.56-.328.872-.875 2.51-1.152 3.969-.83 4.378.036.054.07.075.105.065.046 0 .132-.033.259-.097.172-.076.357-.205.553-.388.207-.172.414-.377.622-.614a7.8 7.8 0 0 0 .621-.808c.082-.118.16-.238.237-.36a2.564 2.564 0 0 1 .058-.884c.058-.269.155-.533.294-.791.15-.259.316-.496.5-.711.197-.216.404-.393.623-.533.23-.151.46-.253.69-.307a2.62 2.62 0 0 1 .346-.033c.092 0 .219.027.38.081.542.13.945.329 1.21.598.16.15.299.226.414.226.115 0 .242.054.38.162.092.086.144.15.156.194.011.032-.006.107-.052.226a6.325 6.325 0 0 1-.345.695 8.207 8.207 0 0 0-.45.953c-.08.247-.12.484-.12.71-.012.291.017.469.086.534.069.053.247.043.535-.033.403-.097.83-.301 1.279-.614.46-.323.984-.78 1.572-1.373.195-.183.362-.345.5-.485.139-.15.214-.226.225-.226.023-.021.08 0 .173.065.046.032.07.07.07.113.01.032-.012.097-.07.194-.058.086-.155.21-.294.372-.126.15-.305.355-.535.613a27.11 27.11 0 0 1-.588.647 20.95 20.95 0 0 1-.483.468c-.139.13-.277.248-.415.355a5.716 5.716 0 0 1-.432.275c-.564.345-1.111.442-1.641.291-.219-.054-.42-.21-.605-.468a1.764 1.764 0 0 1-.328-.825l-.034-.29-.57.517c-.438.398-.79.64-1.054.727-.254.086-.513.037-.778-.146a1.573 1.573 0 0 1-.505-.61c-.664 1.114-1.285 1.797-1.863 2.048-.195.097-.357.146-.483.146a.79.79 0 0 1-.432-.114c-.587-.269-.881-.823-.881-1.664Zm-3.192-.873-.138.13a2.489 2.489 0 0 1-.26.16c-.114.066-.23.125-.345.179-.23.107-.397.166-.5.177-.104.011-.093-.027.034-.113.046-.032.115-.075.207-.13l.311-.16c.115-.055.225-.103.328-.146.104-.043.185-.07.242-.08.092-.022.133-.028.121-.017Zm1.4-1.664a3.2 3.2 0 0 1-.432.727.998.998 0 0 1-.277.258c-.069.033-.201.076-.397.13-.127.032-.282.08-.467.145a4.85 4.85 0 0 0-.449.162l-.449.21c-.058.021-.086.021-.086 0 0-.011.028-.108.086-.291.058-.194.133-.425.225-.695.069-.237.126-.42.172-.549.046-.14.092-.248.139-.323.046-.086.092-.156.138-.21a2.717 2.717 0 0 1 .518-.452c.138-.087.276-.162.415-.227.138-.075.265-.134.38-.177.126-.043.23-.065.31-.065.162 0 .271.065.329.194.069.13.086.296.052.5a2.238 2.238 0 0 1-.207.663Zm8.841-.113a.892.892 0 0 1 .035.226c0 .054-.029.13-.087.226-.069.13-.19.286-.362.469-.162.172-.346.35-.553.533-.207.183-.42.35-.64.5-.207.151-.385.265-.535.34-.196.086-.322.124-.38.113-.058-.01-.11-.08-.155-.21-.093-.226-.087-.522.017-.889.104-.366.27-.716.5-1.05.266-.387.56-.657.882-.807a1.305 1.305 0 0 1 1.002-.081c.092.032.15.064.173.097a.25.25 0 0 1 .034.145c0 .043.006.103.018.178.011.075.028.145.051.21Z"
      fill="#333"
    />
  </Svg>
);

export default SmallLogoSvg;