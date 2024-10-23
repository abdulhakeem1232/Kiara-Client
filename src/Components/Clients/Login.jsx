import React,{useState} from 'react'
import { adminendpoints } from '../../Service/endpoints/adminAxios';
import { adminAxios } from '../../Utils/Config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
alert('kk')
    try {
      const response = await adminAxios.post(adminendpoints.login, {
        email,
        password,
      });
      
      console.log('Login successful:', response.data);
    } catch (err) {
      
      console.error('Login failed:', err.response.data);
      setError('Invalid username or password.'); 
      alert(error)
  };
}

  return (
    <div className='min-h-screen flex justify-center items-center  bg-gray-100'>
      
      <div className='bg-white shadow-lg rounded-xl flex lg:px-32 -mt-16'>

      <div className="hidden lg:flex items-center justify-center p-10">
          <img src="/login.png" alt="Login " className="w-96 h-auto" />
        </div>

        <div className='p-20 flex flex-col justify-center'>
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">CLIENT LOGIN</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
      
            <div>
              
              <div className="flex items-center border rounded-md mt-1 ">
                <input 
                  type="text" 
                  id="email" 
                  className="w-full outline-none p-2"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>
            
            <div>
             
              <div className="flex items-center border rounded-md mt-1">
                <input 
                  type="password" 
                  id="password" 
                  className="w-full outline-none p-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" className="mr-2"/>
                <label htmlFor="remember" className="text-gray-600">Remember</label>
              </div>
              
            </div>
            
            <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-pink-600">
              LOGIN
            </button>
          </form>

        </div>
      
     </div>
      
    </div>
  )
}

export default Login

