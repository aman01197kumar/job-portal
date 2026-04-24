import { useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo.png'

const LandingPageHeader = () => {
  const navigate = useNavigate();
  return (
    <header className='flex justify-between px-5 py-2 items-center bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50'>
      <img src={logo} alt='Logo' className="w-13 object-contain cursor-pointer" onClick={() => navigate('/feature-selection')} />
      <div className='flex items-center space-x-3'>
        <p>Already have an account?</p>
        <button className="bg-slate-900 hover:bg-slate-700 text-white font-semi py-2 px-4 rounded transition duration-300 cursor-pointer"
          onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </header>
  )
}

export default LandingPageHeader