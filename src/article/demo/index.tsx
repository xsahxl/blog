import React from 'react';
import { Card, Grid, Icon } from '@alicloud/console-components';

const CardFooter = () => (
  <div>
    <div style={{ position: 'absolute', bottom: 0 }}>
      <Icon type="calendar" size="xs" style={{ verticalAlign: 'bottom' }} />
      <span style={{ marginLeft: 8 }}>2021-2-28</span>
    </div>
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <Icon type="account" size="xs" style={{ verticalAlign: 'bottom' }} />
      <span style={{ marginLeft: 8 }}>史华力</span>
    </div>
  </div>
);

const List = () => (
  <div style={{ backgroundColor: '#fff', padding: 32 }}>
    <Grid.Row gutter={32}>
      <Grid.Col>
        <a href="/article/how-to-create-blog">
          <Card title="如何搭建自己的博客">
            本次博客搭建 以 dumi 和 GitHub Pages、云服务器为例子进行演示
            <CardFooter />
          </Card>
        </a>
      </Grid.Col>
      <Grid.Col>
        <Card title="文章2">
          <div>描述</div>
          <CardFooter />
        </Card>
      </Grid.Col>
      <Grid.Col>
        <Card title="文章3">
          <div>描述</div>
          <CardFooter />
        </Card>
      </Grid.Col>
    </Grid.Row>
  </div>
);

export default List;
