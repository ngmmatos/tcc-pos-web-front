import { useState, useRef } from 'react';
// import { useSwipeable } from 'react-swipeable';

export const useCarousel = ({ p = 0, length, steps = 1 }) => {
  const [position, setPosition] = useState(p);

  const itemsRef = useRef(null);

  const next = () => {
    // 3 items
    const newPosition = position === length - 1 ? 0 : position + steps;

    setPosition(newPosition);
  };

  const prev = () => {
    const newPosition = position === 0 ? length - 1 : position - steps;

    setPosition(newPosition);
  };

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => next(),
  //   onSwipedRight: () => prev(),
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  //   trackTouch: true,
  // });

  const isAtStart = position === 0;
  const isAtEnd = position === Math.ceil(length / 2);

  return { next, prev, position, isAtStart, isAtEnd, itemsRef };
};
