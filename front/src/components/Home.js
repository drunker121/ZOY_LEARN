import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section className="bg-black">
      <div className="px-6 mx-auto h-screen pt-6">
        <nav className="flex justify-end">
          <Link
            to="/login"
            className=" text-white bg-red-600 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-md py-3 px-6"
          >
            LOG OUT
          </Link>
        </nav>
        <div className="h-max flex justify-center mt-40">
          <div>
            <h1 className="text-6xl font-bold text-white">CRUD Operation on:</h1>
            <div className="flex justify-center mt-20">
              <Link
                to="/teachers"
                className=" text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-primary-500 font-bold px-5 py-3 text-center text-lg mr-3"
              >
                TEACHERS
              </Link>
              <Link
                to="/students"
                className=" text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-primary-500 font-bold px-5 py-3 text-center text-lg ml-3"
              >
                STUDENTS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
