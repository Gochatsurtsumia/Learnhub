import java.util.ArrayList;

public class Lecturer extends Person {
    private ArrayList<String> teachingCourses;

    public Lecturer(String name, int id) {
        super(name, id);
        this.teachingCourses = new ArrayList<>();
    }

    public void addCourse(String courseName) {
        if (!teachingCourses.contains(courseName)) {
            teachingCourses.add(courseName);
            System.out.println(name + " assigned to teach " + courseName);
        } else {
            System.out.println(name + " already teaches " + courseName);
        }
    }

    public ArrayList<String> getTeachingCourses() {
        return teachingCourses;
    }

    @Override
    public void displayInfo() {
        System.out.println("Lecturer: " + name + " | ID: " + id + " | Teaching: " + teachingCourses);
    }
}