package com.logistica.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.dao.EmptyResultDataAccessException;

import com.logistica.api.entity.Client;
import com.logistica.api.repository.ClientRepository;

import jakarta.persistence.EntityNotFoundException;


@SpringBootTest
public class ClientServiceTest {

    @InjectMocks
    private ClientService clientService;

    @Mock
    private ClientRepository clientRepository;

    private Client client1;
    private Client client2;
    private List<Client> clients;

    @BeforeEach
    public void setUp() {
        client1 = new Client();
        client1.setId(1L);
        client1.setName("Cliente 1");
        client1.setCnpj("00.000.000/0000-00");
        client1.setLat(-16.328546);
        client1.setLng(-48.953403);

        client2 = new Client();
        client2.setId(2L);
        client2.setName("Cliente 2");
        client2.setCnpj("11.111.111/1111-11");
        client2.setLat(-16.328546);
        client2.setLng(-48.953403);

        clients = List.of(client1, client2);
    }

    @Test
    public void testFindAll() {
        when(clientRepository.findAll()).thenReturn(clients);

        List<Client> result = clientService.findAll();

        assertEquals(clients, result);

        verify(clientRepository, times(1)).findAll();
    }

    @Test
    public void testFindByIdExisting() {
        when(clientRepository.findById(1L)).thenReturn(Optional.of(client1));

        Optional<Client> result = clientService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(client1, result.get());

        verify(clientRepository, times(1)).findById(1L);
    }

    @Test
    public void testFindByIdNonExisting() {
        when(clientRepository.findById(3L)).thenReturn(Optional.empty());

        Optional<Client> result = clientService.findById(3L);

        assertFalse(result.isPresent());

        verify(clientRepository, times(1)).findById(3L);
    }

    @Test
    public void testCreateValid() {
        when(clientRepository.save(client1)).thenReturn(client1);

            Client result = clientService.create(client1);

    assertEquals(client1, result);

    verify(clientRepository, times(1)).save(client1);
}

    @Test
    public void testCreateInvalid() {
        Client invalidClient = new Client();
        invalidClient.setName("Cliente Inválido");
        invalidClient.setLat(-16.328546);
        invalidClient.setLng(-48.953403);

        when(clientRepository.save(invalidClient)).thenThrow(new IllegalArgumentException("CNPJ is required"));

        assertThrows(IllegalArgumentException.class, () -> {
            clientService.create(invalidClient);
        });

        verify(clientRepository, times(1)).save(invalidClient);
    }

    @Test
    public void testUpdateExistingValid() {
        client1.setName("Cliente 1 Alterado");

        when(clientRepository.save(client1)).thenReturn(client1);

        Client result = clientService.update(client1);

        assertEquals(client1, result);

        verify(clientRepository, times(1)).save(client1);
    }

    @Test
    public void testUpdateNonExistingValid() {
        Client nonExistingClient = new Client();
        nonExistingClient.setId(3L);
        nonExistingClient.setName("Cliente 3");
        nonExistingClient.setCnpj("22.222.222/2222-22");
        nonExistingClient.setLat(-16.328546);
        nonExistingClient.setLng(-48.953403);

        when(clientRepository.save(nonExistingClient)).thenThrow(new EntityNotFoundException("Client not found"));

        assertThrows(EntityNotFoundException.class, () -> {
            clientService.update(nonExistingClient);
        });

        verify(clientRepository, times(1)).save(nonExistingClient);
    }

    @Test
    public void testDeleteExisting() {
        doNothing().when(clientRepository).deleteById(1L);

        clientService.delete(1L);

        verify(clientRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteNonExisting() {
        doThrow(new EmptyResultDataAccessException(1)).when(clientRepository).deleteById(3L);

        assertThrows(EmptyResultDataAccessException.class, () -> {
            clientService.delete(3L);
        });

        verify(clientRepository, times(1)).deleteById(3L);
    }
}