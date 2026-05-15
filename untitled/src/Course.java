import java.util.ArrayList;

public class Course {
    private String courseName;
    private Lecturer lecturer;
    private ArrayList<Student> students;

    public Course(String courseName, Lecturer lecturer) {
        this.courseName = courseName;
        this.lecturer = lecturer;
        this.students = new ArrayList<>();
        lecturer.addCourse(courseName);
    }

    public void addStudent(Student student) {
        if (!students.contains(student)) {
            students.add(student);
            student.addCourse(courseName);
        } else {
            System.out.println(student + " is already in this course.");
        }
    }

    public void removeStudent(Student student) {
        if (students.remove(student)) {
            student.removeCourse(courseName);
        } else {
            System.out.println("Student not found in this course.");
        }
    }

    public String getCourseName() {
        return courseName;
    }

    public void displayInfo() {
        System.out.println("\n--- Course: " + courseName + " ---");
        System.out.println("Lecturer: " + lecturer.name);
        System.out.println("Enrolled Students:");
        if (students.isEmpty()) {
            System.out.println("  No students enrolled.");
        } else {
            for (Student s : students) {
                System.out.println("  - " + s.name + " (ID: " + s.id + ")");
            }
        }
    }
}