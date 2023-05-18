import { Actions, LinkButton } from '@xsahxl/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

const Basic: React.FC<{}> = () => {
  return (
    <Container>
      <div style={{ height: '400px' }} className="block">
        <Actions>
          <LinkButton Component={Link} to="/components/key-value">
            KeyValue
          </LinkButton>
          <LinkButton Component={Link} to="/components/time-container">
            TimeContainer
          </LinkButton>
          <LinkButton Component={Link} to="/components/tag-container">
            TagContainer
          </LinkButton>
          <LinkButton Component={Link} to="/components/qr-code">
            QRCode
          </LinkButton>
          <LinkButton Component={Link} to="/components/copy">
            Copy
          </LinkButton>
        </Actions>
      </div>
    </Container>
  );
};

export default Basic;
