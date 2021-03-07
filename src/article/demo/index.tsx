import React from 'react';
import { Card, Grid, Icon } from '@alicloud/console-components';
import Link from './Link';

const CardFooter = (props: { time: string; auther?: string }) => {
  const { time, auther = '史华力' } = props;
  return (
    <div>
      <div style={{ position: 'absolute', bottom: 0 }}>
        <Icon type="calendar" size="xs" style={{ verticalAlign: 'bottom' }} />
        <span style={{ marginLeft: 8 }}>{time}</span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Icon type="account" size="xs" style={{ verticalAlign: 'bottom' }} />
        <span style={{ marginLeft: 8 }}>{auther}</span>
      </div>
    </div>
  );
};

const List = () => (
  <div style={{ backgroundColor: '#fff', padding: 32 }}>
    <Grid.Row gutter={32}>
      <Grid.Col>
        <Link href="how-to-create-blog">
          <Card title="如何搭建自己的博客">
            <div>1.dumi</div>
            <p>2.GitHub Pages</p>
            <p>3.云服务器</p>
            <CardFooter time="2021-2-28" />
          </Card>
        </Link>
      </Grid.Col>
      <Grid.Col>
        <Link href="git">
          <Card title="git 常用命令">
            主要列举一些 git 常用命令
            <CardFooter time="2021-3-7" />
          </Card>
        </Link>
      </Grid.Col>
      <Grid.Col>
        <Link href="vultr&shadowsocks">
          <Card title="vultr&shadowsocks">
            <div>1.购买vultr服务器</div>
            <p>2.通过shadowsocks搭建vpn</p>
            <CardFooter time="2021-3-7" />
          </Card>
        </Link>
      </Grid.Col>
    </Grid.Row>
  </div>
);

export default List;
