package com.nixsolutions.bondarenko.bookstore.validators.annotation;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import com.nixsolutions.bondarenko.bookstore.validators.UniqueEmailValidator;

@Target({ElementType.PARAMETER})
@Retention(RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
@Documented
public @interface UniqueEmail
{
  String message() default "This email is already taken. Please enter another value";

  Class<?>[] groups() default { };

  Class<? extends Payload>[] payload() default { };
}
