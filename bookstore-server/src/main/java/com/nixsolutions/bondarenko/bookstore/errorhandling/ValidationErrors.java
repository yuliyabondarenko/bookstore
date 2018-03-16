package com.nixsolutions.bondarenko.bookstore.errorhandling;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class ValidationErrors implements Serializable
{
  private static final long serialVersionUID = -4902389794332906691L;

  private Map<String, String> fieldErrors;

  public ValidationErrors()
  {
    fieldErrors = new HashMap<>();
  }

  public ValidationErrors(Map<String, String> fieldErrors)
  {
    this.fieldErrors = fieldErrors;
  }

  public Map<String, String> getFieldErrors()
  {
    return fieldErrors;
  }

  public void setFieldErrors(Map<String, String> fieldErrors)
  {
    this.fieldErrors = fieldErrors;
  }
}
