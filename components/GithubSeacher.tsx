import { useState } from 'react';
import { useSWRInfinite } from "swr";
import { Input, Alert, Spin } from 'antd';
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons';
import GithubRepo, { GithubRepoType } from './GithubRepo';
import debounce from 'lodash.debounce';
import List from "./List";

type GithubRepoResult = {
  total_count: number,
  items: Array<GithubRepoType>
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const fetcher = url => fetch(url).then(res => {
  if (!res.ok) throw res.statusText;
  return res.json();
});

const renderItem = (item: GithubRepoType, i: number, style: React.CSSProperties) => (
  <GithubRepo item={item} key={i} style={style} />
)

export default function GithubSeacher() {
  const [repo, setRepo] = useState("");
  const { data, error, size, isValidating, setSize } = useSWRInfinite<GithubRepoResult>(
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
  const fetchMore = ({ startIndex }: { startIndex: number }) => {
    const currentSize = data.reduce((result, page) => result + page.items.length, 0);
    if (startIndex > currentSize - 20 && !isValidating) {
      setSize(size + 1);
    }
  };
  return (
    <>
      <Input size="large" prefix={<GithubOutlined />} placeholder=" Input repository name" onChange={onChange} style={{ width: '100%' }} />
      {
        error ? (
          <Alert
            style={{ marginTop: 24 }}
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
              <List<GithubRepoType>
                key={repo} // remount component when repo changes
                renderItem={renderItem}
                items={data.map(item => item.items || []).flat()}
                itemHeight={100}
                windowHeight={500}
                onScroll={fetchMore}
              />
            </Spin>
          )
      }

    </>
  );
}
