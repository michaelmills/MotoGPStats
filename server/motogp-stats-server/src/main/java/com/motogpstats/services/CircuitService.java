package com.motogpstats.services;

import com.motogpstats.models.domain.Circuit;
import com.motogpstats.repositories.CircuitRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Service
public class CircuitService {

	@Autowired
	private CircuitRepository circuitRepository;

	public Mono<Circuit> save(Circuit circuit) {
		return Mono
				.justOrEmpty(
						circuitRepository.findByCodeAndNameAndTitle(circuit.getCode(),
								circuit.getName(), circuit.getTitle()))
				.doOnNext(saved -> log.debug("Found circuit: {}", saved))
				.switchIfEmpty(Mono.defer(() -> Mono
						.justOrEmpty(circuitRepository.save(circuit))
						.doOnNext(saved -> log.debug("Saved circuit: {}", saved))));
	}

	public void save(List<Circuit> circuits) {
		log.info("Save circuits: {}", circuits);
		circuitRepository.saveAll(circuits);
	}
}
