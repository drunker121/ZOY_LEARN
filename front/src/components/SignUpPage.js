import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userdetails, setUserdetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setUserdetails({
            ...userdetails,
            [name]: value,
        })
    }

    const registerHandle = async (e)=> {
        e.preventDefault();
        const {name, email, password, confirmPassword} = userdetails;
        if(password !== confirmPassword) {
            alert('passwords do not match');
            setUserdetails({...userdetails, password: "", confirmPassword: ""});
        }
        else {
            if(name && email && password && (password === confirmPassword)) {
                axios.post('http://localhost:5000/register', userdetails)
                .then(res => {
                    alert(res.data.status);  
                    navigate('/login');
                })
            }
        }
    }
  return (
    <section className="bg-green-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 h-screen">
            <div className="w-full shadow border max-w-md bg-black border-gray-700">
                <div className="p-6 space-y-6">
                    <h1 className="font-bold text-5xl text-white text-center">
                        SIGN UP
                    </h1>
                    <form className="space-y-6" action="post">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-white text-center">Username :</label>
                            <input type="text" name="name" id="name" value={userdetails.name} onChange={changeHandler} className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-white-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-white text-center">Your email :</label>
                            <input type="email" name="email" id="email" value={userdetails.email} onChange={changeHandler} className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-white text-center">Password :</label>
                            <input type="password" name="password" id="password" value={userdetails.password} onChange={changeHandler} className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label for="confirm-password" className="block mb-2 text-sm font-medium text-white text-center">Confirm password :</label>
                            <input type="password" name="confirmPassword" id="confirm-password" value={userdetails.confirmPassword} onChange={changeHandler} className="border text-sm focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <button type="submit" onClick={registerHandle} className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Register</button>
                        <p className="text-sm font-light dark:text-gray-400">
                            Already User? <a href="/login" className="font-medium hover:underline dark:text-primary-500">Log In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUpPage