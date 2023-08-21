package com.logistica.api.core.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseAbstractController {

    protected ResponseEntity<?> jsonResponse(Object object, HttpStatus status) {
        return new ResponseEntity<>(object, status);
    }

    protected ResponseEntity<?> jsonResponse(Object object) {
        return jsonResponse(object, HttpStatus.OK);
    }

    protected ResponseEntity<?> jsonResponse() {
        return jsonResponse(null);
    }
}
