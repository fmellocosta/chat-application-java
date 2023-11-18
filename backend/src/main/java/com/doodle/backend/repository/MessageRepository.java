package com.doodle.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doodle.backend.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findAll();
}
