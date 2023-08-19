package com.logistica.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.logistica.api.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
