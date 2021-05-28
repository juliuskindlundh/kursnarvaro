import React, {useState } from 'react';

const StudentView = (props) => {

    const [checked,setChecked] = useState(props.student.present); 

    const handleUpdate =(e)=>{
        const c = e.target.checked
        setChecked(c);
        const dto = {
            firstName:props.student.firstName,
            lastName:props.student.lastName,
            age:props.student.age,
            present:c
        };

        const options = {
            method: 'PUT',
            body: JSON.stringify(dto),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        fetch(props.url+props.student.studentId, options).then(response=>{
            if(response.ok){
                response.body.getReader().read().then(result=>{
                    
                    const data = result.value;
                    const chars = String.fromCharCode(...data)
                    const student = JSON.parse(chars);
                    let arr = [...props.students];
                    arr[props.index] = student;
                    props.setStudents(arr);
                })        
            }
            else{
                //SHOW FAIL
            }
        });
    }

    const remove =(e)=>{
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            }
        };
        fetch(props.url+props.student.studentId, options).then(response=>{
            if(response.ok){
                let arr = [...props.students];
                arr.splice(props.index,1);
                props.setStudents(arr); 
            }
            else{
                //SHOW FAIL
            }
        });
    }

    return (
        <div className="studentView">
            <p>{props.student.firstName + " " +props.student.lastName}</p>
            <input className="checkBox" type="checkbox" onChange={handleUpdate} checked={checked} />
            <p>Present</p>
            <input className="remove" type="button" value="remove" onClick={remove}/>
        </div>
    );
}

export default StudentView;