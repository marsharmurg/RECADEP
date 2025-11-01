package com.RECADEP.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RECADEP.backend.Entitys.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long>{

}
