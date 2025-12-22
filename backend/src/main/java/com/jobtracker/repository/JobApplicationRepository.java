
package com.jobtracker.repository;

import com.jobtracker.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {
    List<JobApplication> findByStatus(String status);
    List<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName);
    long countByStatus(String status);
}