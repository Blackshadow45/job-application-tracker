
package com.jobtracker.controller;

import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.dto.DashboardStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {
    
    @Autowired
    private JobApplicationRepository repository;
    
    @PostMapping
    public ResponseEntity<JobApplication> createApplication(@RequestBody JobApplication application) {
        try {
            JobApplication savedApp = repository.save(application);
            return new ResponseEntity<>(savedApp, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        try {
            List<JobApplication> applications = repository.findAll();
            if (applications.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable("id") String id) {
        Optional<JobApplication> applicationData = repository.findById(id);
        if (applicationData.isPresent()) {
            return new ResponseEntity<>(applicationData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateApplication(
            @PathVariable("id") String id,
            @RequestBody JobApplication application) {
        
        Optional<JobApplication> applicationData = repository.findById(id);
        if (applicationData.isPresent()) {
            JobApplication existingApp = applicationData.get();
            existingApp.setCompanyName(application.getCompanyName());
            existingApp.setPosition(application.getPosition());
            existingApp.setJobType(application.getJobType());
            existingApp.setStatus(application.getStatus());
            existingApp.setApplicationUrl(application.getApplicationUrl());
            existingApp.setAppliedDate(application.getAppliedDate());
            existingApp.setFollowUpDate(application.getFollowUpDate());
            existingApp.setNotes(application.getNotes());
            existingApp.setSalary(application.getSalary());
            return new ResponseEntity<>(repository.save(existingApp), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteApplication(@PathVariable("id") String id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<JobApplication>> getApplicationsByStatus(
            @PathVariable("status") String status) {
        try {
            List<JobApplication> applications = repository.findByStatus(status);
            if (applications.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<JobApplication>> searchByCompany(
            @RequestParam("company") String company) {
        try {
            List<JobApplication> applications = 
                repository.findByCompanyNameContainingIgnoreCase(company);
            if (applications.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        try {
            long totalApplications = repository.count();
            long appliedCount = repository.countByStatus("Applied");
            long interviewCount = repository.countByStatus("Interview");
            long offerCount = repository.countByStatus("Offer");
            long rejectedCount = repository.countByStatus("Rejected");
            
            DashboardStats stats = new DashboardStats(
                totalApplications, appliedCount, interviewCount, 
                offerCount, rejectedCount
            );
            return new ResponseEntity<>(stats, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return new ResponseEntity<>("Job Tracker API is running! ✅", HttpStatus.OK);
    }
}