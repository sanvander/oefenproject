package com.nhl.spring_boot_example.controller;

import com.nhl.spring_boot_example.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateController {

    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping("/api/updateTraffic")
    public ResponseEntity<String> updateTraffic(@RequestBody Person person) {
        // Verstuur het bericht naar het topic "/topic/traffic"
        template.convertAndSend("/topic/traffic", person);
        return ResponseEntity.ok("Update Sent");
    }
}