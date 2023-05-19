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
import com.fssm.model.Sceance;
import com.fssm.repository.SceanceRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class SceanceController {
    
    @Autowired
    private SceanceRepository sceanceRepository;

	@GetMapping("/sceances")
	public List<Sceance> getAllSceances(){
		return sceanceRepository.findAll();
	}

	@PostMapping("/sceances")
	public Sceance createSceance(@Valid @RequestBody Sceance sceance) {
		return sceanceRepository.save(sceance);
	}

	@GetMapping("/sceances/{id}")
	public Optional<Sceance> getSceanceById(@PathVariable(value = "id") Long sceanceId){
		//Sceance sceance =  sceanceRepository.findById(sceanceId)
			//	.orElseThrow(() -> new ResourceNotFoundException("Sceance introuvable pour cet id :: "+sceanceId));
		//return ResponseEntity.ok().body(sceance);
		return sceanceRepository.findById(sceanceId);
	}

	@PutMapping("/sceances/{id}/")
	public ResponseEntity<Sceance> updateSceance(@PathVariable(value = "id") long sceanceId
			, @RequestBody Sceance sceanceDetails) throws ResourceNotFoundException {
		Sceance sceance =  sceanceRepository.findById(sceanceId)
				.orElseThrow(() -> new ResourceNotFoundException("Sceance introuvable pour cet id :: "+sceanceId));
		sceance.setId(sceanceDetails.getId());
		sceance.setCours(sceanceDetails.getCours());
		sceance.setDateSceance(sceanceDetails.getDateSceance());
		sceance.setDateDebut(sceanceDetails.getDateDebut());
		sceance.setDateFin(sceanceDetails.getDateFin());
		sceanceRepository.save(sceance);
		return ResponseEntity.ok().body(sceance);
	}
	@DeleteMapping("/sceances/{id}")
	public ResponseEntity<?> deleteSceance(@PathVariable(value = "id") long sceanceId) throws ResourceNotFoundException {
		Sceance sceance =  sceanceRepository.findById(sceanceId)
				.orElseThrow(() -> new ResourceNotFoundException("Sceance introuvable pour cet id :: "+sceanceId));
		sceanceRepository.deleteById(sceanceId);
		return ResponseEntity.ok().body(sceance);
    }
}
