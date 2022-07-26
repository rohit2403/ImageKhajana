
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import FileUpload from './components/FileUpload';
import Home from './components/Home';
import ImageViewer from './components/ImageViewer';
import Login from './components/Login';
import Register from './components/Register';
import UploadProfile from './components/UploadProfile';

import './App.css'
import Premium from './components/Premium';
import About from './components/About';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/uploadprofile' element={<UploadProfile />} />
        <Route path='/imageviewer' element={<ImageViewer />} />
        <Route path='/upgradetopremium' element={<Premium />} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;