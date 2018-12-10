package com.motogpstats.services.crawler;

import com.motogpstats.models.RaceResultCrawl;
import com.motogpstats.models.RaceStanding;
import com.motogpstats.services.RaceService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.Locale;
import java.util.regex.Pattern;

@Slf4j
@Service
public class RaceCrawlerService {

	@Autowired
	private RaceService raceService;

	public void crawlRace() {
		try {
			Document doc = Jsoup
					.connect(
							"http://www.motogp.com/en/ajax/results/parse/2018/AME/MotoGP/RAC")
					.get();

//			parseTableHeaders(doc);
			parseStandings(doc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void parseTableHeaders(Document document) {
		Element resultTable = document.selectFirst("table");
		Elements resultHeaders =
				resultTable.select("thead").first().select("tr").first().select("th");

		for (Element title : resultHeaders) {
			log.debug("{}", title.text());
		}
	}

	private void parseStandings(Document document) {
		final RaceResultCrawl.RaceResultCrawlBuilder raceResultBuilder = RaceResultCrawl.builder();
		raceResultBuilder.date(parseDate(document));
		raceResultBuilder.name("test");

		final Elements standings =
				document.select("table > tbody").first().select("tr");

		for (Element standing : standings) {
			Elements cols = standing.select("td");
			if (cols.size() <= 1) {
				continue;
			}

			Iterator<Element> col = cols.iterator();
			RaceStanding.RaceStandingBuilder raceStanding = RaceStanding
					.builder()
					.position(NumberUtils.toInt(col.next().text()))
					.points(NumberUtils.toInt(col.next().text()))
					.riderNumber(NumberUtils.toInt(col.next().text()))
					.riderName(col.next().text())
					.nationality(col.next().text())
					.team(col.next().text())
					.bike(col.next().text());

			col.next(); // skip speed columun
			raceStanding.time(col.next().text());

			raceResultBuilder.result(raceStanding.build());
		}

		log.debug("{}", raceResultBuilder);
		raceService.saveRaceResults(raceResultBuilder.build());
	}

	private LocalDate parseDate(Document document) {
		String parsedDate = document.select("body > p").text();
		log.debug("Date parsed: {}", parsedDate);

		String[] splits = parsedDate.split(Pattern.quote(","));
		String adjustedDate = (splits[2] + splits[3]).trim();
		log.debug("Adjusted date: {}", adjustedDate);

		DateTimeFormatter formatter =
				DateTimeFormatter.ofPattern("MMMM dd yyyy", Locale.US);
		return LocalDate.parse(adjustedDate.trim(), formatter);
	}
}
