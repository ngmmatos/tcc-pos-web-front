import styled from '@emotion/styled';

export const Section = styled.section`
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1633px;
`;

export const ArrowContainer = styled.div`
  margin: 0;
  position: absolute;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  width: 100%;
  top: calc(50% - 20px);

  > svg {
    width: 3rem;
    height: 3rem;
    margin: 0;
    width: 30%;
    color: var(--gold);
    &:hover {
      transform: scale(1.2);
      color: #ffbf00;
    }
  }
`;

export const CarouselMain = styled.main`
  margin: 2rem;

  display: flex;
  transition: transform 0.25s ease-in-out;
  transform: ${({ indexElementCarousel }) =>
    indexElementCarousel === 0
      ? `translateX(33%)`
      : indexElementCarousel === 1
      ? `translateX(-${(indexElementCarousel / 33) * 33.333333}%)`
      : `translateX(-${(indexElementCarousel - 1) * 33}%)`};

  @media (max-width: 768px) {
    transform: ${({ indexElementCarousel }) =>
      `translateX(-${indexElementCarousel * 100}%)`};
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  width: 33.33333%;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: ${({ index, indexElementCarousel }) =>
    index === indexElementCarousel ? `1000` : `1`};
  object-fit: cover;
  transform: ${({ index, indexElementCarousel }) =>
    index === indexElementCarousel ? `scale(1)` : `scale(0.8)  `};
  filter: ${({ index, indexElementCarousel }) =>
    index === indexElementCarousel
      ? 'brightness(1)'
      : 'brightness(0.5) blur(0.2rem) '};

  > img {
    max-width: 33rem;
    border: 3px solid var(--gold);
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    object-fit: cover;
  }

  > span {
    font-size: 2rem;

    text-shadow: 1px 2px 2px black;
    position: absolute;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
