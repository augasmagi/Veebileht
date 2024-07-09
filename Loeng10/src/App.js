import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import PostPage from './components/PostPage';
import Posts from './components/Posts';
import Users from './components/Users';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import AddPost from './components/AddPost';
import RegisterUser from './components/RegisterUser';
import User from './components/User';
import AuthProvider from './components/AuthContext';

function App() {
  return (
    <Container>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/add' element={<AddPost />} />
            <Route path='/posts/:id' element={<PostPage />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Container>
  );
};

export default App;
