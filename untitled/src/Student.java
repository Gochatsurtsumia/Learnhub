import java.util.ArrayList;

public class Student extends Person {
    private ArrayList<String> enrolledCourses;

    public Student(String name, int id) {
        super(name, id);
        this.enrolledCourses = new ArrayList<>();
    }

    public void addCourse(String courseName) {
        if (!enrolledCourses.contains(courseName)) {
            enrolledCourses.add(courseName);
            System.out.println(name + " enrolled in " + courseName);
        } else {
            System.out.println(name + " is already enrolled in " + courseName);
        }
    }

    public void removeCourse(String courseName) {
        if (enrolledCourses.remove(courseName)) {
            System.out.println(name + " removed from " + courseName);
        } else {
            System.out.println(name + " is not enrolled in " + courseName);
        }
    }

    public int getCourseCount() {
        return enrolledCourses.size();
    }

    public ArrayList<String> getEnrolledCourses() {
        return enrolledCourses;
    }

    @Override
    public void displayInfo() {
        System.out.println("Student: " + name + " | ID: " + id + " | Courses: " + enrolledCourses);
    }
}