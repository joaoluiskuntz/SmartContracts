// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract Students{

    struct Student{
        string studentName;
        uint8 studentAge;
    }

    mapping(address=>Student) private enrolledStudents;

    function enrollStudent(
        string memory studentName,
        uint8 studentAge
    )
        public {
        
        require(
            isStudentNameValid(studentName), 
            "Name must be informed"
        );
        
        require(
            isStudentAgeValid(studentAge),
            "Age must be informed"
        );
        
        require(
            !isStudentValid(
                getEnrolledStudentByAddress(msg.sender)
            ),
            "Student already enrolled"
        );
        
        Student memory student;
        student.studentName = studentName;
        student.studentAge = studentAge;

        assert(
            isStudentValid(student)
        );
        
        enrolledStudents[msg.sender] = student;
    }

    function getEnrolledStudentByAddress(address studentAddress) 
        public
        view 
        returns (Student memory){
        return enrolledStudents[studentAddress];
    }

    function isStudentValid(Student memory student)
        private
        pure
        returns(bool){
        return isStudentNameValid(student.studentName) &&
            isStudentAgeValid(student.studentAge);
    }

    function isStudentAgeValid(uint8 studentAge)
        private
        pure
        returns(bool){
        return studentAge > 0;
    }

    function isStudentNameValid(string memory studentName)
        private
        pure
        returns(bool){
        bytes memory tempString = bytes(studentName);
        return tempString.length>0;
    }
}