import { useState } from 'react';
import { useSWRInfinite } from "swr";
import { Input, Card, Typography, Alert, Spin} from 'antd';
import {GithubOutlined, LoadingOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';
import List from "./List";
const { Title, Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const fetcher = url => fetch(url).then(res => {
  if (!res.ok) throw res.statusText;
  return res.json();
});

const renderItem = (item, i, style) => (
  <Card
    style={{...style}}
    size="small"
    key={i}
  >
    <Title level={5} style={{margin: 0}}>{item.name}</Title>
    <Paragraph>{item.content}</Paragraph>
  </Card>
)

export default function GithubSeacher() {
  const [repo, setRepo] = useState("");
  const { data, error, size, isValidating, setSize } = useSWRInfinite(
    index => {
      if (!repo) return null;
      return `https://api.github.com/search/repositories?q=${repo}&page=${index +
        1}`
    },
    fetcher,
    {
      initialData: []
    }
  );
  const onChange = debounce((e) => {
    setRepo(e.target.value);
    setSize(1); //reset size
  }, 700);
  const fetchMore = ({startIndex}: {startIndex: number}) => {
    const currentSize = data.reduce((result, page) => result + page.items.length, 0);
    if (startIndex > currentSize - 20 && !isValidating) {
      setSize(size + 1);
    }
  };
  return (
    <>
      <Input size="large" prefix={<GithubOutlined />} placeholder=" Input repository name" onChange={onChange} style={{ width: '100%' }}/>
      {
        error ? (
          <Alert
            style={{marginTop: 24}}
            message="Error"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <Spin
            indicator={antIcon}
            spinning={isValidating && size === 1}
          >
            <List
              renderItem={renderItem}
              items={data.map(item => item.items || []).flat()}
              itemHeight={80}
              windowHeight={320}
              onScroll={fetchMore}
            />
          </Spin>
        )
      }
     
    </>
  );
}
