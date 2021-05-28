import React from 'react';
import StudentView from './StudentView';

const List = (props) => {
    return (
        <div id="list">
            <h1>Students</h1>
            {
                props.students.map((row,index)=>{
                    return <StudentView key={index} student={row} students={props.students} setStudents={props.setStudents} index={index} url={props.url}/>
                })
            }
        </div>
    );
}

export default List;