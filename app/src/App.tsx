import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './components';
import { AppContextProvider } from './context';
import { LoginPage, PanelPage, StartingPage, TodoListPage } from './modules';
import { ActivitiesPage } from './modules/ActivitiesPage/ActivitiesPage';

const { Footer } = Layout;

function App() {
  // just for local testing
  localStorage.setItem('userGuid', "63ef1ebe-2e40-4818-ad4c-69e5d2885da9");

  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout className='ha-layout ha-v-flexbox'>
          <AppHeader/>
            <Routes>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/panel' element={<PanelPage/>} />
              <Route path='/groups/:groupGuid/activities' element={<ActivitiesPage />} />
              <Route path='/activities' element={<ActivitiesPage />} />
              <Route path='/todo-lists' element={<TodoListPage/>} />
              <Route path='/' element={<StartingPage/>} />
            </Routes>
          <Footer className='main-footer'>&copy; Human Activities</Footer>
        </Layout>
      </AppContextProvider>
    </BrowserRouter> 
  )
}

export default App
