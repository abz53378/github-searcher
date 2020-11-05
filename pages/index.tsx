import { Layout } from 'antd';
import GithubSearcher from '../components/GithubSeacher'
const { Header, Footer, Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>Header</Header>
      <Content style={{ padding: '4rem 10rem', minHeight: 600 }}>
        <GithubSearcher />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by <a href="//github.com/abz53378" target="__blank">Leo</a></Footer>
    </Layout>
  )
}
