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
            Message message1 = new Message();
            message1.setSender("John");
            message1.setContent("Hello, how are you?");
            messageRepository.save(message1);

            Message message2 = new Message();
            message2.setSender("Alice");
            message2.setContent("Hi John, I'm doing well. How about you?");
            messageRepository.save(message2);
        }
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
