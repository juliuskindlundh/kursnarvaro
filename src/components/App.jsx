import React, { useEffect, useState } from 'react';
import '../App.css';
import Form from './Form';
import List from './List';

const url = "http://localhost:8080/students/";
function App(props) {

    const [students,setStudents] = useState([]);

    useEffect(()=>{  
        fetch(url).then(data=>{
            data.body.getReader().read().then(result=>{
                const arr = result.value;
                const chars = String.fromCharCode(...arr)
                setStudents(JSON.parse(chars));
            })
        });
    },[])

    return (
        <div className="container">
            <List students={students} setStudents={setStudents} url={url}/>
            <Form setStudents={setStudents} students={students} url={url}/>
        </div>
    );
}

export default App;