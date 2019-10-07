package com.motogpstats.services.crawler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.motogpstats.models.CircuitCrawl;
import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.SeasonCrawl;
import com.motogpstats.models.domain.Circuit;
import com.motogpstats.services.CircuitService;
import com.motogpstats.services.RaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuples;

import java.io.IOException;
import java.util.Map;
import java.util.stream.IntStream;

@Slf4j
@Service
public class SeasonCrawlerService {

	@Value("${motogp.api.season-url}")
	private String seasonURL;

	@Autowired
	private CircuitService circuitService;

	@Autowired
	private RaceCrawlerService raceCrawlerService;

	@Autowired
	private RaceService raceService;
//
//	public Mono<Void> crawl(Integer startYear, Integer endYear) {
//		log.info("Crawl MotoGP Season");
//
//		return Mono
//				.just(Tuples.of(startYear, endYear))
//				.filter(tuple -> tuple.getT1() <= tuple.getT2())
//				.switchIfEmpty(Mono.error(new IllegalArgumentException(
//						"startYear must be less than or equal to endYear")))
//				.flatMap(tuple -> Flux
//						.fromStream(IntStream.rangeClosed(startYear, endYear).boxed())
//						.doOnNext(year -> log.debug("Requesting season year: {}", year))
//						.flatMap(this::requestSeason)
//						.then());
//	}

	public Mono<SeasonCrawl> crawlSeason(Integer year) {
		return WebClient
				.create(seasonURL)
				.get()
				.uri(String.valueOf(year))
				.retrieve()
				.bodyToMono(String.class)
				.map(this::convertResponse)
				.doOnNext(seasonCrawl -> seasonCrawl.setYear(year));
	}

//	public Mono<Void> requestSeason(int year) {
//		return WebClient
//				.create(seasonURL)
//				.get()
//				.uri(String.valueOf(year))
//				.retrieve()
//				.bodyToMono(String.class)
//				.map(this::convertResponse)
//				.flatMap(seasonCrawl -> requestRaceResults(seasonCrawl, year))
//				.doOnError(e -> log.error(e.getMessage()));
//	}

	private SeasonCrawl convertResponse(String response) {
		log.debug("Convert response");

		try {
			ObjectMapper mapper = new ObjectMapper();
			SeasonCrawl season = mapper.readValue(response, SeasonCrawl.class);

			for (Map<String, String> item : season.getUnconvertedSchedule()) {
				season.addRace(mapper.convertValue(item, CircuitCrawl.class));
			}

			log.debug("Converted response: {}", season.getRaces());
			return season;
		} catch (IOException e) {
			throw new RuntimeException("Unable to convert response: {}", e);
		}
	}

//	private Mono<Void> requestRaceResults(SeasonCrawl seasonCrawl, int year) {
//		return Flux
//				.fromIterable(seasonCrawl.getRaces())
//				.map(race -> Circuit
//						.builder()
//						.code(race.getShortname())
//						.title(race.getTitle())
//						.name(race.getCircuit())
//						.build())
//				.flatMap(circuit -> circuitService.save(circuit))
//				.flatMap(circuit -> {
//					RaceResultCrawl raceResultCrawl =
//							raceCrawlerService.crawlRace(year, circuit.getCode());
//					if (raceResultCrawl.getDate() == null) {
//						log.debug("No race to save");
//						return Mono.empty();
//					} else {
//						return Mono.just(Tuples.of(raceResultCrawl, circuit));
//					}
//				})
//				.flatMap(tuple -> raceService
//						.saveRace(tuple.getT1(), tuple.getT2())
//						.map(race -> Tuples.of(tuple.getT1(), race)))
//				.flatMap(tuple -> raceService.saveRacer(tuple.getT1(), tuple.getT2()))
//				.then();
//	}
}
