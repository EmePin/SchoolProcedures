package com.school.idsystem.repository;

import com.school.idsystem.model.IdRequest;
import com.school.idsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IdRequestRepository extends JpaRepository<IdRequest, Long> {
    List<IdRequest> findByUserOrderByRequestDateDesc(User user);
    List<IdRequest> findAllByOrderByRequestDateDesc();
}