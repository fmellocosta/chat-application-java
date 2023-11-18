package com.doodle.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doodle.backend.model.Message;
import com.doodle.backend.repository.MessageRepository;

@Service
public class MessageService {

	@Autowired
	private MessageRepository messageRepository;

	@PostConstruct
	public void initializeMessages() {
		if (messageRepository.count() == 0) {
			Message message = new Message();
			message.setSender("Felipe");
			message.setContent("First message, it was pre-populated");
			message.setTimestamp(LocalDateTime.now());
			messageRepository.save(message);
		}
	}

	public List<Message> getAllMessages() {
		return messageRepository.findAll();
	}

	public Message saveMessage(Message message) {
		message.setTimestamp(LocalDateTime.now());
		return messageRepository.save(message);
	}

	public Message getMessageById(String id) {
		return messageRepository.findById(id).orElse(null);
	}

	public void deleteMessage(String id) {
		messageRepository.deleteById(id);
	}
}
