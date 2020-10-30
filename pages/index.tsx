import {Card, Layout, Typography} from 'antd';
import List from '../components/List';

const { Header, Footer, Content } = Layout;
const { Title, Paragraph } = Typography;
const items = [];
for (let i=0; i < 100; i++) {
  items.push({
    title: 'title',
    content: 'content'
  });
}

const renderItem = (item, i, style) => (
  <Card
    style={{...style}}
    size="small"
  >
    <Title level={5} style={{margin: 0}}>{item.title + i}</Title>
    <Paragraph>{item.content}</Paragraph>
  </Card>
)

export default function Home() {
  return (
    <Layout style={{height: '100vh'}}>
      <Header>Header</Header>
      <Content style={{ padding: '4rem 10rem', minHeight: 600 }}>
        <List
          renderItem={renderItem}
          items={items}
          itemHeight={80}
          visibleItemSize={4}
        />
      </Content>
      <Footer style={{textAlign: 'center'}}>Created by <a href="//github.com/abz53378" target="__blank">Leo</a></Footer>
    </Layout>
  )
}
