import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './components';
import { LoginPage, StartingPage } from './modules';

const { Footer } = Layout;

function App() {

  return (
    <Layout className='ha-layout'>
      <AppHeader/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartingPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
      <Footer>Test footera</Footer>
    </Layout>
  )
}

export default App
