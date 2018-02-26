package com.nixsolutions.bondarenko.bookstore.errorhandling;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class ValidationErrors implements Serializable
{
  private static final long serialVersionUID = -4902389794332906691L;

  //TODO rename this field
  private Map<String, String> validationErrors; //TODO change to Map<String, List<String>>

  public ValidationErrors()
  {
    validationErrors = new HashMap<>();
  }

  public ValidationErrors(Map<String, String> validationErrors)
  {
    this.validationErrors = validationErrors;
  }

  public Map<String, String> getValidationErrors()
  {
    return validationErrors;
  }
}
