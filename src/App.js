import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MyRoutes from './components/MyConfig/MyRoutes';
import './components/assets/Main.scss'

function App() {
  return (
   <BrowserRouter>
    <Layout>
       <div className="App">
         <MyRoutes/>
       </div>
    </Layout>
   
    </BrowserRouter>
    
  );
}

export default App;
