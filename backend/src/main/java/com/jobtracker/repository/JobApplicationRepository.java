package com.jobtracker.repository;

import com.jobtracker.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

    List<JobApplication> findByUserId(String userId);

    List<JobApplication> findByUserIdAndStatus(String userId, String status);

    long countByUserId(String userId);

    long countByUserIdAndStatus(String userId, String status);

    List<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName);

}