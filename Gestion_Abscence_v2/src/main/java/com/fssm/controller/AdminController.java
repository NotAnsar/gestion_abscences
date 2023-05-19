package com.fssm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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
import com.fssm.model.Admin;
import com.fssm.repository.AdminRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class AdminController {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @GetMapping("/admins")
    public List<Admin> getALLAdmins(){
    	return adminRepository.findAll();
    }
    
    @PostMapping("/admins")
    public Admin createAdmin(@Valid @RequestBody Admin admin) {
    	return adminRepository.save(admin);
    }
    
    @GetMapping("/admins/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable(value = "id") long adminId) throws ResourceNotFoundException{
    	Admin admin = adminRepository.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet id :: "+adminId));
		return ResponseEntity.ok().body(admin);
    }
    public Admin getAdmin(@PathVariable Long id) throws NotFoundException {
    	return adminRepository.findById(id)
    	        .orElseThrow(() -> new NotFoundException());

    }

    @PutMapping("/admins/{id}")
	public ResponseEntity<Admin> updateAdmin(@PathVariable(value = "id") long adminId
			, @RequestBody Admin adminDetails) throws ResourceNotFoundException {
		Admin admin =  adminRepository.findById(adminId)
				.orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet id :: "+adminId));
		admin.setId(adminDetails.getId());
		admin.setPrenom(adminDetails.getPrenom());
		admin.setNom(adminDetails.getPrenom());
		admin.setPassword(adminDetails.getPassword());
		admin.setEmail(adminDetails.getEmail());
		admin.setAge(adminDetails.getAge());
		admin.setAdresse(adminDetails.getAdresse());
		admin.setDescription(adminDetails.getDescription());
		admin.setRole(adminDetails.getRole());
		adminRepository.save(admin);
		return ResponseEntity.ok().body(admin);
    }

    @DeleteMapping("/admins/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable(value = "id") long adminId) throws ResourceNotFoundException {
		Admin admin =  adminRepository.findById(adminId)
				.orElseThrow(() -> new ResourceNotFoundException("Admin introuvable pour cet id :: "+adminId));
		adminRepository.deleteById(adminId);
		return ResponseEntity.ok().body(admin);		
	}
}
