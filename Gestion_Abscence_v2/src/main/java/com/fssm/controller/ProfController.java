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
import com.fssm.model.Prof;
import com.fssm.repository.ProfRepository;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class ProfController {
    
    @Autowired
    private ProfRepository profRepository;

	@GetMapping("/profs")
	public List<Prof> getAllProfs(){
		return profRepository.findAll();
	}

	@PostMapping("/profs/")
	public Prof createProf(@RequestBody Prof prof) {
		return profRepository.save(prof);
	}
	
	@GetMapping("/profs/{id}")
	public Optional<Prof> getProfById(@PathVariable(value = "id") long profId) throws ResourceNotFoundException{
		//Prof prof =  profRepository.findById(profId)
			//	.orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet id :: "+profId));
		//return ResponseEntity.ok().body(prof);
		return profRepository.findById(profId);
	}
	@PutMapping("/profs/{id}/")
	public ResponseEntity<Prof> updateProf(@PathVariable(value = "id") long profId
			, @RequestBody Prof profDetails) throws ResourceNotFoundException {
		Prof prof =  profRepository.findById(profId)
				.orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet id :: "+profId));
		prof.setId(profDetails.getId());
		prof.setNom(profDetails.getNom());
		prof.setPrenom(profDetails.getPrenom());
		prof.setEmail(profDetails.getEmail());
		prof.setAdresse(profDetails.getAdresse());
		prof.setAge(profDetails.getAge());
		prof.setTel(profDetails.getTel());
		prof.setDescription(profDetails.getDescription());
		prof.setPassword(profDetails.getPassword());
		prof.setRole(profDetails.getRole());
		prof.setDepartement(profDetails.getDepartement());		profRepository.save(prof);
		return ResponseEntity.ok().body(prof);
	}

	@DeleteMapping("/profs/{id}")
	public ResponseEntity<?> deleteProf(@PathVariable(value = "id") long profId) throws ResourceNotFoundException {
		Prof prof =  profRepository.findById(profId)
				.orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet id :: "+profId));
		profRepository.deleteById(profId);
		return ResponseEntity.ok().body(prof);		
	}
}
