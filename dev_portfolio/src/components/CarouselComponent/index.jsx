import { useCarousel } from '../../hooks/useCarrousel';

import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { ArrowContainer, CarouselMain, ImageWrapper, Section } from './style';
import { useEffect } from 'react';
import Rh1 from '../../resources/RH1.jpg'
import Rh2 from '../../resources/RH2.jpg'
import Rh3 from '../../resources/RH3.jpg'
import Rh4 from '../../resources/RH4.jpg'
import Rh7 from '../../resources/RH7.jpg'
import Rh6 from '../../resources/RH6.jpg'
import Rh8 from '../../resources/RH8.jpg'

const listImagem = [
  {
    src: Rh1,
  },
  {
    src: Rh2,
  },
  {
    src: Rh3,
  },
  {
    src: Rh4,
  },
  {
    src: Rh6,
  },
  {
    src: Rh7,
  },
  {
    src: Rh8,
  }
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
