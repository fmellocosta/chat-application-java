package com.doodle.backend.service;

import com.doodle.backend.model.Message;
import com.doodle.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @PostConstruct
    public void initializeMessages() {
        // Check if there are no messages in the database
        if (messageRepository.count() == 0) {
            // If no messages, add some initial messages
            Message message = new Message();
            message.setSender("Felipe");
            message.setContent("First message, it was pre-populated");
            messageRepository.save(message);
        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
