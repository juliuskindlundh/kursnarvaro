import React, { useState } from 'react';
const Form = (props) =>{

    const[fname,setFname] = useState("");
    const[lname,setLname] = useState("");
    const[age,setAge] = useState(0);
    const[present,setPresent] = useState(false);
    const[minReq,setMinReq] = useState("")

    const fnameChange = (e) =>{
        setFname(e.target.value);
    }
    const lnameChange = (e) =>{
        setLname(e.target.value);
    }
    const ageChange = (e) =>{
        setAge(e.target.value);
    }
    const presentChange = (e) =>{
        setPresent(!present);
    }

    const handleSubmit = (e) =>{
        const dto = {
            firstName:fname,
            lastName:lname,
            age:age,
            present:present
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(dto),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        fetch(props.url, options).then(response=>{
            if(response.ok){
                let arr = [...props.students];
                response.body.getReader().read().then(result=>{
                    const data = result.value;
                    const chars = String.fromCharCode(...data)
                    arr.push(JSON.parse(chars));
                    props.setStudents(arr);
                })        
            }
        });
    }

    return (
        <div className="form">
            <h1>Form</h1>
            <div className="inputContainer">
            <p>First name</p>
            <input className="textInput" type="text" value={fname} onChange={fnameChange}/>
            </div>
            <div className="inputContainer">
            <p>Last name</p>
            <input className="textInput" type="text" value={lname} onChange={lnameChange}/>
            </div>
            <div className="inputContainer">
            <p>Age</p>
            <input className="numberInput" type="Number" value={age} onChange={ageChange}/>
            </div>
            <div className="inputContainer">
            <p>Present</p>
            <input className="checkBox" type="checkBox" checked={present} onChange={presentChange}/>
            </div>
            <div className="inputContainer">
            <input className="button" type="Button" value="Submit" onClick={handleSubmit}/>
            </div>           
        </div>
    );
}

export default Form;