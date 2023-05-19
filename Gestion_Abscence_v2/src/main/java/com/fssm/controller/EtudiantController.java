package com.fssm.controller;

import java.util.List;
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
import com.fssm.model.Etudiant;
import com.fssm.repository.EtudiantRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class EtudiantController {
    
    @Autowired
    private EtudiantRepository etudiantRepository;

    @GetMapping("/etudiants")
	public List<Etudiant> getAllEtudiants(){
		return etudiantRepository.findAll();
	}

    @PostMapping("/etudiants")
	public Etudiant createEtudiant(@Valid @RequestBody Etudiant etudiant) {
		return etudiantRepository.save(etudiant);
	}
    
	@GetMapping("/etudiants/{id}")
	public Optional<Etudiant> getEtudiantById(@PathVariable(value = "id") Long etudiantId) throws ResourceNotFoundException{
		//Etudiant etudiant =  etudiantRepository.findById(etudiantId)
			//	.orElseThrow(() -> new ResourceNotFoundException("Etudiant introuvable pour cet id :: "+etudiantId));
		//return ResponseEntity.ok().body(etudiant);
		return etudiantRepository.findById(etudiantId);
	}
	@PutMapping("/etudiants/{id}/")
	public ResponseEntity<Etudiant> updateEtudiant(@PathVariable(value = "id") Long etudiantId
			, @RequestBody Etudiant etudiantDetails) throws ResourceNotFoundException {
		Etudiant etudiant =  etudiantRepository.findById(etudiantId)
				.orElseThrow(() -> new ResourceNotFoundException("Etudiant introuvable pour cet id :: "+etudiantId));
		etudiant.setId(etudiantDetails.getId());
		etudiant.setNom(etudiantDetails.getNom());
		etudiant.setPrenom(etudiantDetails.getPrenom());
		etudiant.setEmail(etudiantDetails.getEmail());
		etudiant.setAdresse(etudiantDetails.getAdresse());
		etudiant.setAge(etudiantDetails.getAge());
		etudiant.setTel(etudiantDetails.getTel());
		etudiant.setDescription(etudiantDetails.getDescription());
		etudiant.setPassword(etudiantDetails.getPassword());
		etudiant.setFiliere(etudiantDetails.getFiliere());
		etudiant.setRole(etudiantDetails.getRole());
		etudiantRepository.save(etudiant);
		return ResponseEntity.ok().body(etudiant);
	}

    @DeleteMapping("/{id}")
	public ResponseEntity<?> deleteEtudiant(@PathVariable(value = "id") long etudiantId) throws ResourceNotFoundException {
		Etudiant etudiant =  etudiantRepository.findById(etudiantId)
				.orElseThrow(() -> new ResourceNotFoundException("Etudiant introuvable pour cet id :: "+etudiantId));
		etudiantRepository.deleteById(etudiantId);
		return ResponseEntity.ok().body(etudiant);		
	}
}
