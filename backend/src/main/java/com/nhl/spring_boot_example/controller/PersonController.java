package com.nhl.spring_boot_example.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import com.nhl.spring_boot_example.model.Person;

@RestController
public class PersonController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/person/broadcast")
    @SendTo("/topic/person") //test
    public Person broadcastPerson(@RequestBody Person person) {
        return person;
    }

    @PostMapping("/api/person")
    public void sendPerson(@RequestBody Person person) {
        // Verzend het bericht naar /topic/person
        template.convertAndSend("/topic/person", person);
    }
}
