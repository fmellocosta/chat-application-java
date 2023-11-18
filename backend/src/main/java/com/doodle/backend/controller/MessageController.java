package com.doodle.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doodle.backend.model.Message;
import com.doodle.backend.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PostMapping
    public Message addMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable String id) {
        Message messageToDelete = messageService.getMessageById(id);

        if (messageToDelete != null) {
            messageService.deleteMessage(id);
        }
    }
}
