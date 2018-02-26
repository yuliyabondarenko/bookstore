package com.nixsolutions.bondarenko.bookstore.errorhandling;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.stream.Collectors;

@ControllerAdvice
public class RestResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ConstraintViolationException.class, TransactionSystemException.class})
    protected ResponseEntity<ValidationErrors> handleValidationExceptions(
            RuntimeException ex,
            WebRequest request) {
        ValidationErrors validationErrors = handleValidationExceptionsInternal(ex);
        return new ResponseEntity<>(validationErrors, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    private ValidationErrors handleValidationExceptionsInternal(
            RuntimeException ex) {
        if (ex instanceof ConstraintViolationException) {
            return toValidationErrors((ConstraintViolationException) ex);
        } else if (ex instanceof TransactionSystemException) {
            Throwable rootCause = ((TransactionSystemException) ex).getRootCause();
            if (rootCause instanceof ConstraintViolationException) {
                return toValidationErrors((ConstraintViolationException) rootCause);
            }
        }

        return null;
    }

    private ValidationErrors toValidationErrors(ConstraintViolationException ex) {
        return new ValidationErrors(ex.getConstraintViolations().stream()
                .collect(
                        Collectors.toMap(
                                violation -> violation.getPropertyPath().toString(),
                                ConstraintViolation::getMessage, (a, b) -> a + ". " + b)));
    }

}
