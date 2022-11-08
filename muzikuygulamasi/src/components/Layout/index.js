import React from 'react';
import Tracks from '../tracks/';
import Search from '../tracks/search';

const Index () => {
  return (
    <React.Fragment>
    <search/>
    <Tracks/>
    </React.Fragment>
  );
};

export default Index;