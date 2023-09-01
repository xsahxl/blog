import { throttle } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { scrollTo } from '../utils';

type Props = {
  threshold?: number;
};

const BackToTop: FC<Props> = props => {
  const { threshold = 200 } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    setVisible(scrollTop > threshold);
  }, 500);

  const onClick = () => {
    scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper onClick={onClick} visible={visible}>
      <svg className="icon" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${(props: { visible: boolean }) => (props.visible ? 'inline-block' : 'none')};
  position: fixed;
  right: 20px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  padding: 12px;
  background-color: #e7eaf1;
  border-radius: 4px;
  cursor: pointer;
  > .icon {
    with: 16px;
    height: 16px;
    fill: #9aaabf;
  }
`;
export default BackToTop;
