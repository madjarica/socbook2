package rs.levi9.socbook2.web.validation;

import java.util.List;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataRetrievalFailureException;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import rs.levi9.socbook2.exception.BadCredentialsException;
import rs.levi9.socbook2.exception.EmailTakenException;
import rs.levi9.socbook2.exception.UsernameTakenException;

@RestControllerAdvice
public class ValidationErrorHandler {
    
    private static final String INTEGRITY_VIOLATION = "is already taken";

    @ExceptionHandler(EmailTakenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationResponse processValidationErrors(EmailTakenException ex) {
        ValidationResponse response = new ValidationResponse();
        response.addItem("email", INTEGRITY_VIOLATION);
        return response;
    }
    
    @ExceptionHandler(UsernameTakenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationResponse processValidationErrors(UsernameTakenException ex) {
        ValidationResponse response = new ValidationResponse();
        response.addItem("username", INTEGRITY_VIOLATION);
        return response;
    }
    
    @ExceptionHandler(UsernameTakenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationResponse processValidationErrors(BadCredentialsException ex) {
    	ValidationResponse response = new ValidationResponse();
    	response.addItem("username", ex.getMessage());
    	return response;
    } 
    
    @ExceptionHandler(DataRetrievalFailureException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void processValidationErrors() {
        
    }

    private ValidationResponse processValidationErrors(List<FieldError> errors) {
        ValidationResponse response = new ValidationResponse();
        for (FieldError error : errors) {
            response.addItem(error.getField(), error.getDefaultMessage());
        }
        return response;
    }

}