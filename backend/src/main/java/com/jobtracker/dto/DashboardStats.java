
package com.jobtracker.dto;

public class DashboardStats {
    
    private long totalApplications;
    private long appliedCount;
    private long interviewCount;
    private long offerCount;
    private long rejectedCount;
    
    public DashboardStats() {}
    
    public DashboardStats(long totalApplications, long appliedCount, 
                         long interviewCount, long offerCount, long rejectedCount) {
        this.totalApplications = totalApplications;
        this.appliedCount = appliedCount;
        this.interviewCount = interviewCount;
        this.offerCount = offerCount;
        this.rejectedCount = rejectedCount;
    }
    
    // Getters and Setters
    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }
    
    public long getAppliedCount() { return appliedCount; }
    public void setAppliedCount(long appliedCount) { this.appliedCount = appliedCount; }
    
    public long getInterviewCount() { return interviewCount; }
    public void setInterviewCount(long interviewCount) { this.interviewCount = interviewCount; }
    
    public long getOfferCount() { return offerCount; }
    public void setOfferCount(long offerCount) { this.offerCount = offerCount; }
    
    public long getRejectedCount() { return rejectedCount; }
    public void setRejectedCount(long rejectedCount) { this.rejectedCount = rejectedCount; }
}
