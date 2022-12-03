import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
    const navigate = useNavigate();
    const [dt, setDT] = useState({});
    const {id} = useParams();

    const loadDetails = async () => {
        try {
            const user = await axios.get(`http://localhost:5000/student/edit/${id}`);
            setDT(user.data);
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        loadDetails();
    },[])

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setDT({
            ...dt,
            [name]: value,
        })
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/student/edit/${id}`, dt)
            alert(res.data.status)
        } catch (error) {
            console.log('error while editing student', error);
        }
        navigate('/students');
    }

  return (
    <section className="bg-black">
        <div className="px-6 mx-auto h-screen pt-6">
            <nav className='flex justify-between'>
                <a href='/login' className=' text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md py-3 px-6 text-center'>Logout</a>
            </nav>
            <div className="flex flex-col items-center justify-center mx-auto pt-6">
                <h1 className="text-3xl font-bold pb-6 text-white">
                    Edit Student
                </h1>
                <div className="w-full rounded-lg shadow border max-w-md bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-6">
                        <form className="space-y-6" action="post">
                            <div className='flex justify-between'>
                                <div className='w-full mr-4'>
                                    <label for="name" className="block mb-2 text-sm font-medium text-white">Student's Name</label>
                                    <input type="text" name="name" value={dt.name} onChange={changeHandler} id="name" className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                                </div>
                                <div className='w-full ml-4'>
                                    <label for="fname" className="block mb-2 text-sm font-medium text-white">Father's Name</label>
                                    <input type="text" name="fname" value={dt.fname} onChange={changeHandler} id="fname" className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='w-full mr-4'>
                                    <label for="roll" className="block mb-2 text-sm font-medium text-white">Roll Number</label>
                                    <input type="number" name="roll" value={dt.roll} onChange={changeHandler} id="roll" className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                                </div>
                                <div className='w-full ml-4'>
                                    <label for="classs" className="block mb-2 text-sm font-medium text-white">Class</label>
                                    <input type="number" name="classs" value={dt.classs} onChange={changeHandler} id="classs" className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                                </div>
                            </div>
                            <div>
                                <label for="phnum" className="block mb-2 text-sm font-medium text-white">Phone Number</label>
                                <input type="number" name="phnum" id="phnum" value={dt.phnum} onChange={changeHandler} className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label for="addresss" className="block mb-2 text-sm font-medium text-white">Address</label>
                                <input type="text" name="addresss" id="addresss" value={dt.addresss} onChange={changeHandler} className="border text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <div className='flex justify-between'>
                                <button onClick={handleSave} type="submit" className="mr-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Save</button>
                                <a href='/students' className="ml-4 w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Go back</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EditStudent