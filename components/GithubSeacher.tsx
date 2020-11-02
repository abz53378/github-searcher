import { useState, useCallback } from 'react';
import { useSWRInfinite } from "swr";
import { Input, Card, Typography} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import debounce from 'lodash.debounce';
import List from "./List";
const { Title, Paragraph } = Typography;

const fetcher = url => fetch(url).then(res => res.json());

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
  const { data = [], size, setSize } = useSWRInfinite(
    index =>
      `https://api.github.com/search/repositories?q=${repo}&page=${index +
        1}`,
    fetcher
  );
  console.log({data})
  const onChange = useCallback(debounce((e) => {
    console.log(e.target.value)
    setRepo(e.target.value);
  }, 700), []);
  const fetchMore = () => {
    setSize(size + 1);
  };
  return (
    <>
      <Input size="large" prefix={<GithubOutlined />} placeholder=" Input repository name" onChange={onChange} style={{ width: '100%' }}/>
      <List
        renderItem={renderItem}
        items={data.map(item => item.items || []).flat()}
        itemHeight={80}
        visibleItemSize={4}
        onScrollToBottom={fetchMore}
      />
    </>
  );
}
