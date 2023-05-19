package com.fssm.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fssm.model.Absence;


@Repository
public interface AbscenceRepository extends JpaRepository<Absence, Long> {

	@Query("SELECT new map(a.id as absenceId, a.justification as justificationa, a.status as status, s.id as sceanceId, s.dateDebut as dateDebut, s.dateFin as dateFin,s.cours.id as IdCours, s.cours.nom as NomCours, e.id as etudiantId, e.nom as etudiantNom, e.prenom as etudiantPrenom) FROM Absence a JOIN a.sceance s JOIN a.cours c JOIN a.etudiant e group by absenceId, justification, sceanceId, dateDebut, dateFin, IdCours, NomCours, etudiantId, etudiantNom, etudiantPrenom")
	List<Map<String, Object>> findAllAbsencesWithDetails();

}
