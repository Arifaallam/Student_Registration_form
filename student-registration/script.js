
// Get reference to the form and the student table body
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');
// Variable to track editing row
let editIndex = null;  


// Load students from localStorage when windows load 
window.onload = () => {
    displayStudents(); //Function to populate table from localstorage
};

//Add event listener for form submission
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();  //Prevent default form submission behaviour


    //Get values from input fields and trim whitespace
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const contact = document.getElementById('studentContact').value.trim();


    //Check if any field is empty
    if (!name || !id || !email || !contact) {
        alert('Please fill all fields.');
        return;
    }
    
    //Validate name (only letters and spaces allowed)
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert('Name must contain only letters.');
        return;
    }
    
    //Validate ID and contact (only numbers allowed)
    if (!/^[0-9]+$/.test(id) || !/^[0-9]+$/.test(contact)) {
        alert('ID and Contact must contain only numbers.');
        return;
    }
    
    //Validate email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert('Invalid email format.');
        return;
    }

    const student = { name, id, email, contact };

    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (editIndex !== null) { //if editing replace the existing student at editindex
        students[editIndex] = student;
        editIndex = null;
    } else {
        students.push(student);
    }

    localStorage.setItem('students', JSON.stringify(students));
    studentForm.reset();
    displayStudents(); //re-render the table with the updated data
});

function displayStudents() {
    //Retrieve students from localstorage or set to empty array
    let students = JSON.parse(localStorage.getItem('students')) || [];
    
    //Clear the current table body
    studentTableBody.innerHTML = '';
    
    //loop through each students and create a table row
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        //Set the inner HTML of the row with student data and Edit/delete buttons
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentContact').value = student.contact;

    editIndex = index;
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}
