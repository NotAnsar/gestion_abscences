package com.fssm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fssm.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
}
