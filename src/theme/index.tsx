'use client';

import React from 'react';

import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
