// https://api.themoviedb.org/3/movie/popular?api_key={process.env.API_KEY}&append_to_response=videos
import { useState, useEffect } from 'react';
import '../src/assets/css/style.css'
import '../src/assets/css/responsive.css'
import axios from 'axios';
import { Routes, Route, useNavigate, redirect } from "react-router-dom";
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext'
import Layout from './pages/Layout';
import MyList from './pages/MyList';
import Movie from './pages/Movie';
import Trending from './pages/Trending';
import Profile from './pages/Profile';
import NotFoundPage from './pages/404';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';

function App() {

  const navigate = useNavigate()
  const [authState, setAuthState] = useState({ user: {}, loggedIn: false })

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      axios.get('http://localhost:4000/users/', {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        }
      })
        .then(res => {
          if (!res.data.error) {
            setAuthState({
              user: { ...res.data },
              loggedIn: true
            })
          }
          else {
            localStorage.removeItem('accessToken')
          }
        })
    }
  }, [])

  const handleRegister = (username, password, email, confirmPassword) => {
    axios.post('http://localhost:4000/users/signup', { username, password, email, confirmPassword }).then(res => {
      if (res.data.error) {
        toast.error(res.data.error)
      }
      else {
        localStorage.setItem('accessToken', res.data.accessToken)
        setAuthState({ user: { uid: res.data.user.id }, loggedIn: true })
      }
    })
  }

  const handleLogin = (e, username, password) => {
    e.preventDefault()
    axios.post('http://localhost:4000/users/signin', { username, password }).then(res => {
      console.log(res.data)
      if (res.data.error) {
        toast.error(res.data.error);
      }
      else {
        localStorage.setItem('accessToken', res.data)
        setAuthState({ ...authState, loggedIn: true })
        navigate(0);
      }
    })
  }

  const addToList = (movie) => {
    const movieParam = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    }
    console.log(authState.user.uid)
    axios.put('http://localhost:4000/users/movie', { movie: movieParam, userId: authState.user.uid }).then(res => {
      console.log(res.data)
      navigate(0);
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ user: {}, loggedIn: false });
    redirect('/')
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>

      {
        authState.loggedIn ?
          <>
            <Layout handleLogout={handleLogout}>
              <Routes>
                <Route path='/' element={<Home addToList={(movie) => addToList(movie)} logout={handleLogout} />} />
                <Route path='/trending' element={<Trending addToList={(movie) => addToList(movie)} />} />
                <Route path='/list' element={<MyList />} />
                <Route path='/movie/:id' element={<Movie add={(movie) => addToList(movie)} uid={authState.user.uid} />} />
                <Route path='/profile' element={<Profile uid={authState?.user.uid} />} />
                <Route path='/search/:searchTerm' element={<Search />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </>
          :
          <>
            <ToastContainer theme="dark" />
            <Routes>
              <Route path='/' element={<LoginPage handle={handleLogin} />} />
              <Route path='signup' element={<RegisterPage handle={handleRegister} />} />
              <Route path='*' element={<LoginPage handle={handleLogin} />} />
            </Routes>
          </>
      }
    </AuthContext.Provider>
  );
}

export default App;
