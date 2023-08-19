package com.logistica.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logistica.api.core.controller.ResponseAbstractController;
import com.logistica.api.entity.Client;
import com.logistica.api.service.ClientService;

@RestController
@RequestMapping("/client")
public class ClientContoller extends ResponseAbstractController {

    private ClientService clientService;

    public ClientContoller(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        return jsonResponse(clientService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return jsonResponse(clientService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> save(@Validated @RequestBody Client client) {
        return jsonResponse(clientService.create(client));
    }

    @PutMapping
    public ResponseEntity<?> update(@Validated @RequestBody Client client) {
        return jsonResponse(clientService.update(client));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        return jsonResponse(clientService.findById(id));
    }

}
