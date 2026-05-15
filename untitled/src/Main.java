import java.util.HashMap;

public class Main {
    public static void main(String[] args) {

        HashMap<Integer, Student> studentsMap = new HashMap<>();
        HashMap<String, Course> coursesMap = new HashMap<>();

        Lecturer lecturer1 = new Lecturer("Dr. Giorgi Beridze", 101);
        Lecturer lecturer2 = new Lecturer("Prof. Nino Lomidze", 102);

        Student student1 = new Student("Luka Kvaratskhelia", 1);
        Student student2 = new Student("Mariam Jghenti", 2);
        Student student3 = new Student("Giorgi Tsiklauri", 3);

        studentsMap.put(student1.id, student1);
        studentsMap.put(student2.id, student2);
        studentsMap.put(student3.id, student3);

        Course javaCourse = new Course("Programming in Java", lecturer1);
        Course mathCourse = new Course("Discrete Mathematics", lecturer2);

        coursesMap.put(javaCourse.getCourseName(), javaCourse);
        coursesMap.put(mathCourse.getCourseName(), mathCourse);

        javaCourse.addStudent(student1);
        javaCourse.addStudent(student2);
        mathCourse.addStudent(student2);
        mathCourse.addStudent(student3);

        System.out.println("\n========== COURSE INFO ==========");
        for (Course course : coursesMap.values()) {
            course.displayInfo();
        }

        System.out.println("\n========== STUDENT INFO ==========");
        for (Student student : studentsMap.values()) {
            student.displayInfo();
            System.out.println("  Total courses enrolled: " + student.getCourseCount());
        }

        System.out.println("\n========== SEARCH BY ID ==========");
        int searchId = 2;
        Student found = studentsMap.get(searchId);
        if (found != null) {
            System.out.println("Found: ");
            found.displayInfo();
        } else {
            System.out.println("Student with ID " + searchId + " not found.");
        }

        System.out.println("\n========== REMOVE FROM COURSE ==========");
        javaCourse.removeStudent(student1);
        javaCourse.displayInfo();
    }
}