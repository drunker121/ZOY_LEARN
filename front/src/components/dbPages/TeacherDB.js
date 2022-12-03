import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDB = () => {
  const [datafound, setDatafound] = useState(false);
  const [data, setData] = useState([]);
  const getting = async () => {
    try {
      let res = await axios.get("http://localhost:5000/teachers");
      console.log(res.data);
      setData(res.data);
      setDatafound(true);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getting();
  }, []);

  const deleteTeacher = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/teacher/${_id}`);
      alert(res.data.status);
    } catch (error) {
      alert("Error while deleting");
    }
    getting();
  };

  return (
    <section className="bg-black">
      <div className="px-6 mx-auto h-screen pt-6">
        <nav className="flex justify-between">
          <a
            href="/login"
            className=" text-white bg-red-600 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-md py-3 px-6 text-center"
          >
            Log Out
          </a>
        </nav>
        <div className="flex justify-between mt-10">
          <div>
            <a
              href="/teachers"
              className=" text-white bg-green-600 hover:bg-greeb-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-5 py-3 text-center text-lg mr-4"
            >
              TEACHERS
            </a>
            <a
              href="/students"
              className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-5 py-3 text-center text-lg ml-4"
            >
              STUDENTS
            </a>
          </div>
          <a
            href="/add_teacher"
            className=" text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-1 text-center text-lg"
          >
            Add
          </a>
        </div>
        {datafound ? (
          data.length !== 0 ? (
            <table class="mt-5 text-white w-full text-center table-fixed">
              <thead className="border-b-2 text-lg">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, ind) => {
                  const { _id, type, name, subject, ph, addresss, classs } = el;
                  if (type === "teacher") {
                    return (
                      <tr key={ind} className="my-2">
                        <td>{name}</td>
                        <td>{subject}</td>
                        <td>{classs}</td>
                        <td>{ph}</td>
                        <td>{addresss}</td>
                        <td>
                          <a
                            href={`/teacher/edit/${_id}`}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-1 text-center text-md mr-2"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => deleteTeacher(_id)}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-1 text-center text-md ml-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-2xl font-bold text-white text-center mt-20">
              No Teacher Added
            </h1>
          )
        ) : (
          <h1 className="text-2xl font-bold text-white text-center mt-20">
            Loading...
          </h1>
        )}
      </div>
    </section>
  );
};

export default TeacherDB;
