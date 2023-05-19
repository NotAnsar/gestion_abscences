package com.fssm.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fssm.model.Cours;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {

    Cours findById(long id);

    void deleteById(Long id);

	@SuppressWarnings("unchecked")
	Cours save(Cours coursToUpdate);
	
	@Query("SELECT new map(c.id as IdCours, c.nom as NomCours, p.id as IdProf, p.nom as NomProf, p.prenom as PrenomProf) FROM Cours c JOIN c.prof p")
	List<Map<String, Object>> findAllCoursesWithDetails();

    

    

    
    
    
    
}