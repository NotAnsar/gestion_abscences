package com.fssm.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fssm.exception.ResourceNotFoundException;
import com.fssm.model.AbscenceJson;
import com.fssm.model.Absence;
import com.fssm.repository.AbscenceRepository;
import com.fssm.repository.SceanceRepository;
import com.fssm.repository.UserRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class AbscenceController {
    
    @Autowired
    private AbscenceRepository abscenceRepository;
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SceanceRepository sceanceRepository;
    @GetMapping("/absencesEtudiants")
    public List<Absence> findAllAbsencesWithJoin() {
        return abscenceRepository.findAll();
    }
    
    @GetMapping("/absences")
    public List<Map<String, Object>> getAllAbscences() {
        return abscenceRepository.findAllAbsencesWithDetails();
    }
    
    /*@PostMapping("/absences")
    public Absence createAbsence(@Valid @RequestBody Absence absence) {
    	
    	absence.getDateAbsence();
    	absence.getEtudiant();
    	absence.getId();
    	absence.getJustification();
    	absence.getSceance();
    	absence.getStatus();
    	
    	return abscenceRepository.save(absence);
    }*/
    
    @PostMapping("/absences")
    public Absence createAbsence(@Valid @RequestBody Absence absence) {
    	absence.setDateAbsence(absence.getDateAbsence());
    	absence.setSceance(sceanceRepository.findById(absence.getSceance().getId()).get());
    	absence.setEtudiant(userRepository.findById(absence.getEtudiant().getId()).get());
    	absence.setJustification(absence.getJustification());
    	absence.setStatus(absence.getStatus());
    	
    	
    	return abscenceRepository.save(absence);
    }
    
    @GetMapping("/absences/{id}")
    public Optional<Absence> getAbscenceById(@PathVariable(value = "id") Long abscenceId)
            throws ResourceNotFoundException {
        //Absence abscence = abscenceRepository.findById(abscenceId)
          //      .orElseThrow(() -> new ResourceNotFoundException("Abscence not found for this id :: " + abscenceId));
        //return ResponseEntity.ok().body(abscence);
    	return abscenceRepository.findById(abscenceId);
    }
    
    @PutMapping("/absencesEtudiants/{id}")
	public ResponseEntity<Absence> updateAbsence(@PathVariable(value = "id") long absenceId
			, @RequestBody Absence absenceDetails) throws ResourceNotFoundException {
		Absence absence =  abscenceRepository.findById(absenceId)
				.orElseThrow(() -> new ResourceNotFoundException("Absence introuvable pour cet id :: "+absenceId));
		
		absence.setJustification(absenceDetails.getJustification());
		absence.setStatus(absenceDetails.getStatus());
		abscenceRepository.save(absence);
	
		return ResponseEntity.ok().body(absence);
    }
    
    @DeleteMapping("/absences/{id}")
	public ResponseEntity<?> deleteAbsence(@PathVariable(value = "id") long abscenceId) throws ResourceNotFoundException {
		Absence absence =  abscenceRepository.findById(abscenceId)
				.orElseThrow(() -> new ResourceNotFoundException("Abscence not found for this id :: " + abscenceId));
		abscenceRepository.deleteById(abscenceId);
		return ResponseEntity.ok().body(absence);		
	}
}