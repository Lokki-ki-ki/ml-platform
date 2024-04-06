import { Carousel } from '@arco-design/web-react';
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  '/home-page-image2.png',
  '/architecture.png'
];

export default function ImagesBar() {
  return (
    <Carousel
      autoPlay
      animation='card'
      showArrow='never'
      indicatorPosition='outer'
      style={{ width: '100%', height: '500' }}
    >
      {imageSrc.map((src, index) => (
        <div
          key={index}
          style={{ width: '60%' }}
        >
          <img
            src={src}
            style={{ width: '100%', height: '500px'}}
            alt=''
          />
        </div>
      ))}
    </Carousel>
  );
}


