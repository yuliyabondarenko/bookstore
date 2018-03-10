package com.nixsolutions.bondarenko.bookstore.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.nixsolutions.bondarenko.bookstore.entity.User;
import com.nixsolutions.bondarenko.bookstore.repository.UserRepository;
import com.nixsolutions.bondarenko.bookstore.validators.annotation.UniqueEmail;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, User>
{
  @Autowired
  private UserRepository userRepository;

  private UniqueEmail constraint;

  @Override
  public void initialize(UniqueEmail constraint)
  {
    this.constraint = constraint;
  }

  @Override
  public boolean isValid(User currentUser, ConstraintValidatorContext validatorContext)
  {
    boolean isValid = !userRepository.existsByEmail(currentUser.getEmail());

    if (!isValid)
    {
      String defaultMessage = validatorContext.getDefaultConstraintMessageTemplate();

      validatorContext
          .disableDefaultConstraintViolation();
      validatorContext.buildConstraintViolationWithTemplate(defaultMessage)
          .addPropertyNode("email")
          .addConstraintViolation();
    }

    return isValid;
  }
}
