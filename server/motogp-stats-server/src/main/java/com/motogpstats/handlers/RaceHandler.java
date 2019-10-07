package com.motogpstats.handlers;

import com.motogpstats.services.RaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@Component
public class RaceHandler {

	@Autowired
	private RaceService raceService;

	public Mono<ServerResponse> getRaceCircuits(ServerRequest serverRequest) {
		log.info("Received request for race circuits");

		return Mono
				.justOrEmpty(serverRequest.queryParam("year"))
				.map(Integer::valueOf)
				.flatMap(year -> raceService.getCircuits(year))
				.flatMap(circuits -> ok().syncBody(circuits))
				.subscribeOn(Schedulers.elastic())
				.doOnError(throwable -> log.error("{}", throwable.getMessage()));
	}

	public Mono<ServerResponse> getRaceResults(ServerRequest serverRequest) {
		log.info("Received request for race results");

		Mono<Integer> circuitMono = Mono
				.justOrEmpty(serverRequest.queryParam("circuitKey"))
				.map(Integer::valueOf);

		Mono<Integer> yearMono = Mono
				.justOrEmpty(serverRequest.queryParam("year"))
				.map(Integer::valueOf);

		return Mono
				.zip(circuitMono, yearMono)
				.flatMap(
						tuple -> raceService.getRaceResults(tuple.getT1(), tuple.getT2()))
				.flatMap(results -> ok().syncBody(results))
				.doOnError(throwable -> log.error("{}", throwable.getMessage()))
				.subscribeOn(Schedulers.elastic());
	}
}
