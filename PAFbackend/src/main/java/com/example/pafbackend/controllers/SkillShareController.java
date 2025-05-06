package com.example.pafbackend.controllers;

import com.example.pafbackend.models.SkillShare;
import com.example.pafbackend.repositories.SkillShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/SkillShares")
public class SkillShareController {

    private final SkillShareRepository SkillShareRepository;
    private static final Logger logger = Logger.getLogger(SkillShareController.class.getName());

    @Autowired
    public SkillShareController(SkillShareRepository SkillShareRepository) {
        this.SkillShareRepository = SkillShareRepository;
    }

    @GetMapping
    public ResponseEntity<List<SkillShare>> getSkillShares() {
        List<SkillShare> SkillShares = SkillShareRepository.findAll();
        return new ResponseEntity<>(SkillShares, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<SkillShare>> getSkillSharesByUserId(@PathVariable String userId) {
        List<SkillShare> SkillShares = SkillShareRepository.findByUserId(userId);
        return new ResponseEntity<>(SkillShares, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SkillShare> createSkillShare(@RequestBody SkillShare SkillShare) {
        // Log the incoming request
        logger.info("Received SkillShare data: " + SkillShare);

        // Validate required fields
        if (Objects.isNull(SkillShare.getUserId()) || SkillShare.getUserId().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (Objects.isNull(SkillShare.getMealDetails()) || SkillShare.getMealDetails().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (Objects.isNull(SkillShare.getMediaUrls()) || SkillShare.getMediaUrls().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (Objects.isNull(SkillShare.getMediaTypes()) || SkillShare.getMediaTypes().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Save the SkillShare object
        SkillShare savedSkillShare = SkillShareRepository.save(SkillShare);
        return new ResponseEntity<>(savedSkillShare, HttpStatus.CREATED);
    }

    @DeleteMapping("/{SkillShareId}")
    public ResponseEntity<Void> deleteSkillShare(@PathVariable String SkillShareId) {
        SkillShareRepository.deleteById(SkillShareId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{SkillShareId}")
    public ResponseEntity<SkillShare> updateSkillShare(@PathVariable String SkillShareId, @RequestBody SkillShare updatedSkillShare) {
        // Check if the Skill Share with the given ID exists
        if (!SkillShareRepository.existsById(SkillShareId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Set the ID of the updated Skill Share
        updatedSkillShare.setId(SkillShareId);

        // Update the Skill Share
        SkillShare savedSkillShare = SkillShareRepository.save(updatedSkillShare);

        return new ResponseEntity<>(savedSkillShare, HttpStatus.OK);
    }
}