package com.RECADEP.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RECADEP.backend.Entitys.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{

}
