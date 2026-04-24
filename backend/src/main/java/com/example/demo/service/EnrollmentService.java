package com.example.demo.service;

import com.example.demo.dto.CourseResponse;
import com.example.demo.dto.EnrollmentResponse;
import com.example.demo.dto.UserResponse;
import com.example.demo.model.Course;
import com.example.demo.model.Enrollment;
import com.example.demo.model.User;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.EnrollmentRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    private EnrollmentResponse toResponse(Enrollment enrollment) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(enrollment.getUser().getId());
        userResponse.setName(enrollment.getUser().getName());
        userResponse.setEmail(enrollment.getUser().getEmail());
        userResponse.setRole(enrollment.getUser().getRole());

        CourseResponse courseResponse = new CourseResponse();
        courseResponse.setId(enrollment.getCourse().getId());
        courseResponse.setTitle(enrollment.getCourse().getTitle());
        courseResponse.setDescription(enrollment.getCourse().getDescription());
        courseResponse.setPrice(enrollment.getCourse().getPrice());
        courseResponse.setCapacity(enrollment.getCourse().getCapacity());

        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(enrollment.getId());
        response.setUser(userResponse);
        response.setCourse(courseResponse);
        return response;
    }

    public EnrollmentResponse enroll(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        boolean alreadyEnrolled = enrollmentRepository.findByUserId(userId)
                .stream()
                .anyMatch(e -> e.getCourse().getId().equals(courseId));

        if (alreadyEnrolled) {
            throw new RuntimeException("Already enrolled");
        }

        if (course.getCapacity() <= 0) {
            throw new RuntimeException("Course is full");
        }

        course.setCapacity(course.getCapacity() - 1);
        courseRepository.save(course);

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        return toResponse(enrollmentRepository.save(enrollment));
    }

    public void unenroll(Long enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Course course = enrollment.getCourse();
        course.setCapacity(course.getCapacity() + 1);
        courseRepository.save(course);

        enrollmentRepository.deleteById(enrollmentId);
    }

    public List<EnrollmentResponse> getEnrollmentsByUser(Long userId) {
        return enrollmentRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }


}