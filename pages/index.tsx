import { Layout } from 'antd';
import GithubSearcher from '../components/GithubSeacher'
const { Footer, Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '3rem 10rem', minHeight: 600 }}>
        <GithubSearcher />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by <a href="//github.com/abz53378" target="__blank">Leo</a></Footer>
    </Layout>
  )
}
