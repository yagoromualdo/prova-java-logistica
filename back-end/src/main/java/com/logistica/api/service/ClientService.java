package com.logistica.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.logistica.api.entity.Client;
import com.logistica.api.repository.ClientRepository;

@Service
public class ClientService {

    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Optional<Client> findById(long id) {
        return clientRepository.findById(id);
    }

    public Client create(Client client) {
        return clientRepository.save(client);
    }

    public Client update(Client client) {
        return clientRepository.save(client);
    }

    public void delete(long id) {
        clientRepository.deleteById(id);
    }
}
