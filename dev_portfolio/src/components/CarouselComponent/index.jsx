import { useCarousel } from '../../hooks/useCarrousel';

import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { ArrowContainer, CarouselMain, ImageWrapper, Section } from './style';
import { useEffect } from 'react';

const listImagem = [
  {
    src: '/RH2.jpg',
  },
  {
    src: '/RH2.jpg',
  },
  {
    src: '/RH2.jpg',
  },
  {
    src: '/RH2.jpg',
  },
  {
    src: '/RH2.jpg',
  },
];

export function CarouselComponent() {
  const { next, prev, position, itemsRef } = useCarousel({
    length: listImagem.length,
  });

  useEffect(() => {
    let timer;
    if (position || position === 0) {
      timer = setTimeout(() => {
        next();
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [position]);

  return (
    <>
      <Section>
        <CarouselMain ref={itemsRef} indexElementCarousel={position}>
          {listImagem?.map((item, index) => (
            <ImageWrapper
              key={index}
              index={index}
              indexElementCarousel={position}
            >
              <img src={item.src} alt='' />
              <span>{item.title}</span>
            </ImageWrapper>
          ))}
        </CarouselMain>
        <ArrowContainer>
          <BiLeftArrow onClick={prev} className='arrow-left' />
          <BiRightArrow onClick={next} className='arrow-right' />
        </ArrowContainer>
      </Section>
    </>
  );
}
