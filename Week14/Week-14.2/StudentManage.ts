// Yeh ek interface hai jo Student ka structure define karta hai
// Interface ka use hum type safety ke liye karte hain
interface Student {
  id: number;          // id ek number hoga
  name: string;        // name ek string hoga
  age: number;         // age ek number hoga
  isEnrolled: boolean; // isEnrolled true/false hoga
}

// Yeh ek class hai jo Student ko represent karti hai
class StudentManager {
  // Yeh ek private array hai jisme hum students store karenge
  private students: Student[] = [];

  // Yeh method new student add karne ke liye hai
  addStudent(student: Student): void {
    // push method se student array me add ho jayega
    this.students.push(student);
    console.log(`Student ${student.name} successfully added!`);
  }

  // Yeh method saare students ko display karega
  getAllStudents(): Student[] {
    return this.students;
  }

  // Yeh method id ke basis par student find karega
  getStudentById(id: number): Student | undefined {
    // find method first matching student return karta hai
    return this.students.find(student => student.id === id);
  }
}

// Ab hum StudentManager ka object bana rahe hain
const manager = new StudentManager();

// Ab hum kuch students add karte hain
manager.addStudent({ id: 1, name: "Rahul", age: 20, isEnrolled: true });
manager.addStudent({ id: 2, name: "Priya", age: 22, isEnrolled: false });

// Saare students print karne ke liye
console.log("All Students:", manager.getAllStudents());

// Specific student id se fetch karne ke liye
console.log("Student with ID 1:", manager.getStudentById(1));