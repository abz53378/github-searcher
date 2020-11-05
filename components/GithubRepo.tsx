import { Card, Typography } from 'antd';
import { StarOutlined, EyeOutlined, ForkOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export type GithubRepoType = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  },
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
}

type Props = {
  style: React.CSSProperties;
  item: GithubRepoType;
}

export default function GithubRepo(props: Props) {
  const { style, item } = props;
  return (
    <Card
      style={{ ...style }}
      size="small"
    >
      <Title ellipsis level={5} style={{ margin: 0 }}>
        <a
          style={{ color: 'inherit' }}
          href={item.html_url}
          target="__blank"
        >
          {item.full_name}
        </a>
      </Title>
      <Text>
        <a
          style={{ color: 'inherit' }}
          href={item.owner.html_url}
          target="__blank">
          {item.owner.login}
        </a>
      </Text>
      <div>
        <Label title={<StarOutlined />} value={item.stargazers_count} />
        <Label title={<EyeOutlined />} value={item.watchers_count} />
        <Label title={<ForkOutlined />} value={item.forks_count} />
        <Label title={<ExclamationCircleOutlined />} value={item.open_issues_count} />
      </div>
    </Card>
  )
}

type LabelProps = {
  title: React.ReactNode;
  value: React.ReactNode;
}

function Label(props: LabelProps) {
  const { title, value } = props;
  return (
    <div style={{ display: 'inline-flex', marginRight: 8 }}>
      <div style={{ marginRight: 4 }}>
        {title}
      </div>
      <div>
        {value}
      </div>
    </div>
  )
}