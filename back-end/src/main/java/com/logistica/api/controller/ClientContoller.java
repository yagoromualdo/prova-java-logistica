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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/client")
@Tag(name = "Cliente/Client", description = "Cadastro manual externo")
public class ClientContoller extends ResponseAbstractController {

    private ClientService clientService;

    public ClientContoller(ClientService clientService) {
        this.clientService = clientService;
    }

    @Operation(description = "Retorna uma lista de clientes")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return jsonResponse(clientService.findAll());
    }

    @Operation(description = "Busca um cliente pelo id")
    @GetMapping("{id}")
    public ResponseEntity<?> findById(@PathVariable long id) {
        return jsonResponse(clientService.findById(id));
    }

    @Operation(description = "Salva um novo cliente")
    @PostMapping
    public ResponseEntity<?> save(@Validated @RequestBody Client client) {
        return jsonResponse(clientService.create(client));
    }

    @Operation(description = "Altera um cliente já existente")
    @PutMapping
    public ResponseEntity<?> update(@Validated @RequestBody Client client) {
        return jsonResponse(clientService.update(client));
    }

    @Operation(description = "Exclui um cliente de acordo com o id")
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        return jsonResponse(clientService.findById(id));
    }

}
