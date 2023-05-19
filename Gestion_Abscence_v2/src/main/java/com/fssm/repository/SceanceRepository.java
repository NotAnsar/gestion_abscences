package com.fssm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fssm.model.Sceance;

@Repository
public interface SceanceRepository extends JpaRepository<Sceance, Long> {
}