package com.fssm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fssm.model.Prof;

@Repository
public interface ProfRepository extends JpaRepository<Prof, Long> {
}
