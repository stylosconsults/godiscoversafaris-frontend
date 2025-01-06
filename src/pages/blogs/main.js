import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { AppLayout } from '../../layouts';
import { LatestNews } from '../../components/section';
import { NewsBox } from '../../components/section';

import './index.css';

export const Destinations = () => {
  return (
    <AppLayout>
      <div className='home-body'></div>
      <LatestNews />
	  <br/>
	  <br/>
    </AppLayout>
  );
};
