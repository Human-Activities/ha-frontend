import { Layout } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './components';
import { AppContextProvider } from './context';
import { LoginPage, PanelPage, StartingPage, TodoListForm, TodoListPage } from './modules';
import { ActivitiesPage } from './modules/ActivitiesPage/ActivitiesPage';
import { FinancesPage } from './modules/FinancesPage/FinancesPage';

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
              <Route path='/groups/:groupGuid/activities' element={<ActivitiesPage />} />
              <Route path='/groups/:groupGuid/finances' element={<FinancesPage />} />
              <Route path='/activities' element={<ActivitiesPage />} />
              <Route path='/finances' element={<FinancesPage />} />
              <Route path='/todo-lists' element={<TodoListPage/>} />
              <Route path='/groups/:groupGuid/todo-lists' element={<TodoListPage/>} />
              <Route path='/todo-lists/add' element={<TodoListForm/>}/>
              <Route path='/groups/:groupGuid/todo-lists/add' element={<TodoListForm/>}/>
              <Route path='/' element={<StartingPage/>} />
            </Routes>
          <Footer className='main-footer'>&copy; Human Activities</Footer>
        </Layout>
      </AppContextProvider>
    </BrowserRouter> 
  )
}

export default App
