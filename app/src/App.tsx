import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './components';
import { AppContextProvider } from './context';
import { LoginPage, PanelPage, StartingPage } from './modules';

const { Footer } = Layout;

function App() {

  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout className='ha-layout ha-v-flexbox'>
          <AppHeader/>
            <Routes>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/panel' element={<PanelPage/>} />
              <Route path='/' element={<StartingPage/>} />
            </Routes>
          <Footer>Test footera</Footer>
        </Layout>
      </AppContextProvider>
    </BrowserRouter> 
  )
}

export default App
